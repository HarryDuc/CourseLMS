import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/course-progress/${courseId}?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      }
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create checkout session"
    });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  try {
    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed event received");

      const session = event.data.object;
      console.log("Session data:", session);

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      });

      if (!purchase) {
        console.error("Purchase not found for session:", session.id);
        return res.status(404).json({ message: "Purchase not found" });
      }

      console.log("Found purchase:", purchase);

      // Update purchase status
      purchase.status = "completed";
      if (session.amount_total) {
        purchase.amount = session.amount_total;
      }
      await purchase.save();
      console.log("Purchase updated:", purchase);

      // Update user's enrolledCourses
      const updatedUser = await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId } },
        { new: true }
      ).populate('enrolledCourses');

      console.log("Updated user enrolled courses:", updatedUser.enrolledCourses);

      // Update course's enrolledStudents
      const updatedCourse = await Course.findByIdAndUpdate(
        purchase.courseId,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      console.log("Updated course enrolled students:", updatedCourse.enrolledStudents);

      // Create initial course progress
      await CourseProgress.create({
        userId: purchase.userId,
        courseId: purchase.courseId,
        completed: false,
        lectureProgress: []
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose"

const lectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: String,
        required: true
    },
    viewed: {
        type: Boolean,
        default: false
    }
});

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    lectureProgress: [lectureProgressSchema]
}, { timestamps: true });

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
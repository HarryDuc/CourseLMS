import Comment from '../models/Comment.js';
import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { content, courseId, parentId } = req.body;
        const userId = req.id;

        const comment = new Comment({
            content,
            courseId,
            userId,
            parentId
        });

        await comment.save();

        if (parentId) {
            const parentComment = await Comment.findById(parentId);
            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy bình luận gốc'
                });
            }
            parentComment.replies.push(comment._id);
            await parentComment.save();
        }

        const populatedComment = await Comment.findById(comment._id)
            .populate('userId', 'name avatar')
            .populate({
                path: 'replies',
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                }
            });

        res.status(201).json({
            success: true,
            data: populatedComment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all comments for a course
export const getCourseComments = async (req, res) => {
    try {
        const { courseId } = req.params;
        const comments = await Comment.find({
            courseId,
            parentId: null
        })
        .populate('userId', 'name avatar')
        .populate({
            path: 'replies',
            populate: {
                path: 'userId',
                select: 'name avatar'
            }
        })
        .sort('-createdAt');

        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.id;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bình luận'
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền chỉnh sửa bình luận này'
            });
        }

        comment.content = content;
        comment.updatedAt = Date.now();
        await comment.save();

        const updatedComment = await Comment.findById(id)
            .populate('userId', 'name avatar')
            .populate({
                path: 'replies',
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                }
            });

        res.status(200).json({
            success: true,
            data: updatedComment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bình luận'
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xóa bình luận này'
            });
        }

        // Remove comment from parent's replies if it's a reply
        if (comment.parentId) {
            await Comment.findByIdAndUpdate(comment.parentId, {
                $pull: { replies: comment._id }
            });
        }

        // Delete all replies
        if (comment.replies && comment.replies.length > 0) {
            await Comment.deleteMany({ _id: { $in: comment.replies } });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Đã xóa bình luận thành công'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {
    createComment,
    getCourseComments,
    updateComment,
    deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

// Routes
router.post('/', isAuthenticated, createComment);
router.get('/course/:courseId', getCourseComments);
router.put('/:id', isAuthenticated, updateComment);
router.delete('/:id', isAuthenticated, deleteComment);

export default router;
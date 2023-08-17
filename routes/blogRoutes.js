import express from 'express';
const router = express.Router();
import { protect, admin } from '../middlewear/authMiddlewear.js';
import { createBlog, getBlog } from '../controllers/blogController.js';

router.route('/create').post(protect, admin, createBlog);
router.route('/get').post(protect, admin, getBlog);
export default router;

import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Register a new Blog
// @route   POST /api/blogs/create
// @access  Public
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const blog = await Blog.create({
    title,
    description,
    image,
  });

  if (blog) {
    res.status(201).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      image: blog.image
    });
  } else {
    res.status(400);
    throw new Error('Invalid Blog data');
  }
});

// @desc    Get Blog
// @route   GET /api/blogs
// @access  Private
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find({});

  if (blog) {
    res.json({
      blog
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { createBlog, getBlog };

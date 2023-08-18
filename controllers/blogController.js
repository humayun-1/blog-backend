import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Register a new Blog
// @route   POST /api/blogs/create
// @access  Public
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, image, category } = req.body;
  try {
    const blog = await Blog.create({
      title,
      description,
      image,
      category
    });

    if (blog) {
      res.status(201).json({
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        category: blog.category,
        image: blog.image
      });
    } else {
      res.status(400);
      throw new Error('Invalid Blog data');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// @desc    Get Blog
// @route   GET /api/blogs/get
// @access  Public

const getBlog = asyncHandler(async (req, res) => {

  try {
    const blog = await Blog.find();

    if (blog) {
      res.json({
        blog
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export { createBlog, getBlog };

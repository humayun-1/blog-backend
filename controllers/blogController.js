import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Register a new Blog
// @route   POST /api/blogs/create
// @access  Public
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    if (!title || !description || !image || !category) {
      res.status(401).json({ message: "Field Missing", status: 401 });
      return
    } else {
      const blog = await Blog.create({
        title,
        description,
        image,
        category
      });

      if (blog) {
        res.status(201).json(
          {
            data: {
              _id: blog._id,
              title: blog.title,
              description: blog.description,
              category: blog.category,
              image: blog.image
            },
            status: 201
          });
      } else {
        res.status(401).json({ message: "Something Went Wrong!", status: 401 });
      }
    }
  } catch (error) {
    res.status(401).json({ message: error.message, status: 401 });
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
        data: blog,
        status: 201
      });
    } else {
      res.status(404).json({ message: "Not Found!", status: 404 });
    }
  } catch (error) {
    res.status(401).json({ message: error.message, status: 401 });
  }
});

export { createBlog, getBlog };

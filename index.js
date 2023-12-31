import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewear/errorMiddlewear.js';
import connectDB from './config/db.js';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import BlogRoutes from './routes/blogRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors())

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', BlogRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

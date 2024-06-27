<<<<<<< HEAD
=======
//api/indexed.js
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
<<<<<<< HEAD
=======
import adminRoutes from './routes/admin.route.js';
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
<<<<<<< HEAD
=======
app.use('/api/admin', adminRoutes);
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

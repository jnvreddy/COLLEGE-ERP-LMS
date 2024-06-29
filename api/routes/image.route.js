// routes/image.routes.js
import express from 'express';
import multer from 'multer';
import { uploadImage, getAllImages, deleteImage } from '../controllers/image.controller.js';

const router = express.Router();
const upload = multer(); // Use multer for parsing multipart/form-data

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.delete('/delete/:id', deleteImage);

export default router;

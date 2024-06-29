// controllers/image.controller.js
import ImageModel from '../models/image.model.js';

export const uploadImage = async (req, res, next) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const imageBase64 = buffer.toString('base64');

    const newImage = new ImageModel({
      filename: originalname,
      contentType: mimetype,
      imageBase64,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    next(error);
  }
};

export const getAllImages = async (req, res, next) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await ImageModel.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

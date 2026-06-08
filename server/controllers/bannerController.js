import Banner from '../models/Banner.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all banners
export const getBanners = async (req, res) => {
  try {
    const { type = '' } = req.query;
    const query = {};
    if (type) query.type = type;

    const banners = await Banner.find(query).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Upload banner (base64 image)
export const createBanner = async (req, res) => {
  try {
    const { title, type, image } = req.body;

    if (!title || !type || !image) {
      return res.status(400).json({ message: 'Title, type, and image are required.' });
    }

    let imageUrl = image;
    let publicId = '';

    // Try Cloudinary upload if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
      try {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: 'career-compass/banners',
          resource_type: 'image',
        });
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (cloudErr) {
        console.warn('Cloudinary upload failed, storing base64:', cloudErr.message);
      }
    }

    const banner = new Banner({ title, type, imageUrl, publicId });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: 'Upload error.', error: error.message });
  }
};

// Delete banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }

    // Delete from Cloudinary if publicId exists
    if (banner.publicId) {
      try {
        await cloudinary.uploader.destroy(banner.publicId);
      } catch (cloudErr) {
        console.warn('Cloudinary delete failed:', cloudErr.message);
      }
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Toggle banner active status
export const toggleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }
    banner.isActive = !banner.isActive;
    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

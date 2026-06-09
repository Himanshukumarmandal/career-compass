import express from 'express';
import { getBanners, createBanner, toggleBanner, deleteBanner } from '../controllers/bannerController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to show on website
router.get('/', getBanners);

// Private routes for admin uploads, toggles, and deletions
router.post('/', protect, createBanner);
router.patch('/:id/toggle', protect, toggleBanner);
router.delete('/:id', protect, deleteBanner);

export default router;

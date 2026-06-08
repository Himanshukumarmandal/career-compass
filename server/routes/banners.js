import express from 'express';
import { getBanners, createBanner, deleteBanner, toggleBanner } from '../controllers/bannerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getBanners);
router.post('/', auth, createBanner);
router.patch('/:id/toggle', auth, toggleBanner);
router.delete('/:id', auth, deleteBanner);

export default router;

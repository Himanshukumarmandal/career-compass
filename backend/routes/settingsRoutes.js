import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Publicly readable for website header/footer info
router.get('/', getSettings);

// Private updates for admins
router.put('/', protect, updateSettings);

export default router;

import express from 'express';
import { getContacts, getContact, createContact, deleteContact } from '../controllers/contactController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for website submission
router.post('/', createContact);

// Private routes for admin management
router.get('/', protect, getContacts);
router.get('/:id', protect, getContact);
router.delete('/:id', protect, deleteContact);

export default router;

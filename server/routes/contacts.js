import express from 'express';
import { getContacts, getContact, createContact, deleteContact } from '../controllers/contactController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getContacts);
router.get('/:id', auth, getContact);
router.post('/', createContact); // Public — called from website contact form
router.delete('/:id', auth, deleteContact);

export default router;

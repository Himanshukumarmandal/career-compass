import express from 'express';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  exportLeads,
} from '../controllers/leadController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection middleware to all lead endpoints
router.use(protect);

router.get('/', getLeads);
router.get('/export', exportLeads);
router.get('/:id', getLead);
router.post('/', createLead);
router.put('/:id', updateLead);
router.patch('/:id/status', updateLeadStatus);
router.delete('/:id', deleteLead);

export default router;

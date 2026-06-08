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
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/export', auth, exportLeads);
router.get('/', auth, getLeads);
router.get('/:id', auth, getLead);
router.post('/', auth, createLead);
router.put('/:id', auth, updateLead);
router.patch('/:id/status', auth, updateLeadStatus);
router.delete('/:id', auth, deleteLead);

export default router;

import Lead from '../models/Lead.js';

// @desc    Get all leads with pagination, filters, and search
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      course = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    // Search by name, phone, or city
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    if (course) query.course = course;
    if (status) query.status = status;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      leads,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Fetch leads error:', error.message);
    res.status(500).json({ success: false, message: 'Server error fetching leads' });
  }
};

// @desc    Get single lead details
// @route   GET /api/leads/:id
// @access  Private
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error.message);
    res.status(500).json({ success: false, message: 'Server error fetching lead details' });
  }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req, res) => {
  try {
    const { name, phone, course, city, message, status, notes } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({ success: false, message: 'Name, phone, and course are required fields' });
    }

    const lead = new Lead({
      name,
      phone,
      course,
      city,
      message,
      status,
      notes,
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error('Create lead error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update lead details
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Update lead error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error.message);
    res.status(500).json({ success: false, message: 'Server error deleting lead' });
  }
};

// @desc    Update lead status (for Kanban pipeline drag-and-drop)
// @route   PATCH /api/leads/:id/status
// @access  Private
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Export all leads (for csv download and full Kanban loading)
// @route   GET /api/leads/export
// @access  Private
export const exportLeads = async (req, res) => {
  try {
    const { course = '', status = '' } = req.query;
    const query = {};

    if (course) query.course = course;
    if (status) query.status = status;

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Export leads error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during data export' });
  }
};

import Contact from '../models/Contact.js';

// Get all contacts with pagination
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      contacts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Fetch contacts error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Get single contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Create contact (from website form)
export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error.message);
    res.status(400).json({ success: false, message: 'Validation error.', error: error.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }
    res.json({ success: true, message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Delete contact error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

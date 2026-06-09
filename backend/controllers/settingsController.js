import Settings from '../models/Settings.js';

// Get settings (creates default if none exist)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error.message);
    res.status(400).json({ success: false, message: 'Update error.', error: error.message });
  }
};

import Lead from '../models/Lead.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      todayLeads,
      bedLeads,
      deledLeads,
      bpedLeads,
      bpesLeads,
      statusDistribution,
      courseDistribution,
      monthlyLeads,
      admissionConfirmed,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: today } }),
      Lead.countDocuments({ course: 'B.Ed' }),
      Lead.countDocuments({ course: 'D.El.Ed' }),
      Lead.countDocuments({ course: 'B.P.Ed' }),
      Lead.countDocuments({ course: 'B.P.E.S' }),
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $group: { _id: '$course', count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 12 },
      ]),
      Lead.countDocuments({ status: 'Admission Confirmed' }),
    ]);

    // Format monthly leads for chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((month, index) => {
      const found = monthlyLeads.find((m) => m._id.month === index + 1);
      return { month, count: found ? found.count : 0 };
    });

    // Conversion rate
    const conversionRate = totalLeads > 0
      ? ((admissionConfirmed / totalLeads) * 100).toFixed(1)
      : 0;

    res.json({
      stats: {
        totalLeads,
        todayLeads,
        bedLeads,
        deledLeads,
        bpedLeads,
        bpesLeads,
      },
      statusDistribution: statusDistribution.map((s) => ({
        name: s._id,
        value: s.count,
      })),
      courseDistribution: courseDistribution.map((c) => ({
        name: c._id,
        value: c.count,
      })),
      monthlyLeads: monthlyData,
      conversion: {
        totalLeads,
        admissionConfirmed,
        rate: parseFloat(conversionRate),
      },
    });
  } catch (error) {
    console.error('Analytics stats error:', error.message);
    res.status(500).json({ success: false, message: 'Server error fetching analytics', error: error.message });
  }
};

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Download, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import LeadTable from '../components/LeadTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSkeleton from '../components/LoadingSkeleton';

const LeadsPage = () => {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('');

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Modal & Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'B.Ed',
    status: 'New',
    city: '',
    source: 'Website',
  });

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        search,
        course,
        status,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      };
      const res = await api.get('/leads', { params });
      setLeads(res.data.leads);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, course, status, sortConfig]);

  // Handle redirect trigger (e.g. Add New Lead from Dashboard)
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      handleOpenAddModal();
    }
  }, [searchParams]);

  // Sorting Handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setPage(1);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearch('');
    setCourse('');
    setStatus('');
    setPage(1);
  };

  // Add / Edit actions
  const handleOpenAddModal = () => {
    setEditingLead(null);
    setFormValues({
      name: '',
      email: '',
      phone: '',
      course: 'B.Ed',
      status: 'New',
      city: '',
      source: 'Website',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setEditingLead(lead);
    setFormValues({
      name: lead.name,
      email: lead.email || '',
      phone: lead.phone,
      course: lead.course,
      status: lead.status,
      city: lead.city || '',
      source: lead.source || 'Website',
    });
    setIsModalOpen(true);
  };

  // Submit Handler (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.name || !formValues.phone) {
      toast.error('Name and Phone number are required.');
      return;
    }

    try {
      if (editingLead) {
        await api.put(`/leads/${editingLead._id}`, formValues);
        toast.success('Lead updated successfully!');
      } else {
        await api.post('/leads', formValues);
        toast.success('Lead created successfully!');
      }
      setIsModalOpen(false);
      fetchLeads();
    } catch (error) {
      const msg = error.response?.data?.message || 'Error processing request.';
      toast.error(msg);
    }
  };

  // Delete Action
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/leads/${deleteId}`);
      toast.success('Lead deleted successfully.');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to delete lead.');
    }
  };

  // CSV Export Utility
  const handleExport = async () => {
    try {
      toast.loading('Preparing export...', { id: 'csv-export' });
      // Fetch all matching records without pagination
      const params = {
        course,
        status,
      };
      const res = await api.get('/leads/export', { params });
      const records = res.data;

      if (records.length === 0) {
        toast.error('No leads available to export.', { id: 'csv-export' });
        return;
      }

      const headers = ['Name', 'Email', 'Phone', 'Course', 'Status', 'City', 'Source', 'Registered Date'];
      const rows = records.map((r) => [
        `"${r.name.replace(/"/g, '""')}"`,
        `"${(r.email || '').replace(/"/g, '""')}"`,
        `"${r.phone}"`,
        `"${r.course}"`,
        `"${r.status}"`,
        `"${(r.city || '').replace(/"/g, '""')}"`,
        `"${r.source || ''}"`,
        `"${new Date(r.createdAt).toISOString()}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Export downloaded successfully!', { id: 'csv-export' });
    } catch (error) {
      toast.error('Failed to export CSV.', { id: 'csv-export' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold admin-text">Leads Management</h1>
          <p className="text-xs admin-text-muted">Manage, track, filter and export registered prospective admissions.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border admin-border admin-text px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Export to CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="p-4 rounded-2xl border admin-card shadow-sm admin-glass">
        <SearchFilter
          searchValue={search}
          onSearchChange={(val) => { setSearch(val); setPage(1); }}
          courseFilter={course}
          onCourseChange={(val) => { setCourse(val); setPage(1); }}
          statusFilter={status}
          onStatusChange={(val) => { setStatus(val); setPage(1); }}
          onClear={handleClearFilters}
        />
      </div>

      {/* Main Table view */}
      <div className="rounded-2xl border admin-card shadow-sm admin-glass p-4 overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" count={5} />
        ) : (
          <>
            <LeadTable
              leads={leads}
              onView={(id) => window.location.href = `/admin/leads/${id}`}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteClick}
              sortConfig={sortConfig}
              onSort={handleSort}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
              totalItems={total}
              itemsPerPage={10}
            />
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead"
        message="Are you sure you want to permanently delete this lead? This action cannot be undone."
      />

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg admin-card rounded-2xl p-6 shadow-2xl z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X size={18} className="admin-text-muted" />
            </button>

            <h2 className="text-lg font-bold admin-text mb-4">
              {editingLead ? 'Edit Prospective Lead' : 'Add New Admission Lead'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Name field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                />
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Course select */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    Academic Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formValues.course}
                    onChange={(e) => setFormValues({ ...formValues, course: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  >
                    <option value="B.Ed">B.Ed (Bachelor of Education)</option>
                    <option value="D.El.Ed">D.El.Ed (Diploma in Elementary Ed)</option>
                    <option value="B.P.Ed">B.P.Ed (Bachelor of Physical Ed)</option>
                    <option value="B.P.E.S">B.P.E.S (Bachelor of Phys Ed & Sports)</option>
                  </select>
                </div>

                {/* Status select */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    Counseling Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formValues.status}
                    onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Documents Received">Documents Received</option>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="Admission Confirmed">Admission Confirmed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formValues.city}
                    onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1">
                    Lead Source
                  </label>
                  <select
                    value={formValues.source}
                    onChange={(e) => setFormValues({ ...formValues, source: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  >
                    <option value="Website">Website Submission</option>
                    <option value="Walk-in">Walk-in Visit</option>
                    <option value="Reference">Student Reference</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Campaign">Marketing Campaign</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t admin-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold admin-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy px-5 py-2 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <Save size={16} />
                  <span>{editingLead ? 'Save Changes' : 'Create Lead'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;

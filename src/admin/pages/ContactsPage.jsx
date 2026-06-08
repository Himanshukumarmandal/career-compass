import React, { useState, useEffect } from 'react';
import { Trash2, Phone, MessageSquare, Search, Calendar, User, BookOpen, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Expanded message state (to view full text)
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        search,
      };
      const res = await api.get('/contacts', { params });
      setContacts(res.data.contacts);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, search]);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone, name) => {
    const message = encodeURIComponent(`Hello ${name}, thank you for contacting Career Compass Consultancy. We received your query. How can we assist you?`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/contacts/${deleteId}`);
      toast.success('Contact request deleted successfully.');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact request.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold admin-text">Contact Messages</h1>
        <p className="text-xs admin-text-muted">
          Manage inquiries and messages submitted via the website contact forms.
        </p>
      </div>

      {/* Search Input bar */}
      <div className="p-4 rounded-2xl border admin-card shadow-sm admin-glass">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
          <input
            type="text"
            placeholder="Search by student name or phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm admin-input border focus:outline-none focus:ring-2 focus:ring-brandNavy/20 transition-all"
          />
        </div>
      </div>

      {/* Contact Table / List */}
      <div className="rounded-2xl border admin-card shadow-sm admin-glass p-4 overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" count={5} />
        ) : (
          <>
            <div className="overflow-x-auto admin-scroll">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b admin-border text-[11px] font-bold tracking-wider uppercase admin-text-muted">
                    <th className="py-4 px-4">Student</th>
                    <th className="py-4 px-4">Contact</th>
                    <th className="py-4 px-4">Course of Interest</th>
                    <th className="py-4 px-4">Query Message</th>
                    <th className="py-4 px-4">Submitted At</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y admin-border text-sm admin-text">
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center admin-text-muted text-sm">
                        No contact submissions found.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((contact) => (
                      <tr 
                        key={contact._id}
                        className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {/* Student Name */}
                        <td className="py-4 px-4">
                          <span className="font-semibold flex items-center gap-1.5">
                            <User size={14} className="text-brandNavy/70 dark:text-yellow-400/70" />
                            {contact.name}
                          </span>
                        </td>

                        {/* Phone */}
                        <td className="py-4 px-4 font-mono text-xs">
                          {contact.phone}
                        </td>

                        {/* Course */}
                        <td className="py-4 px-4">
                          {contact.course ? (
                            <span className="font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
                              {contact.course}
                            </span>
                          ) : (
                            <span className="text-xs admin-text-muted italic">Not specified</span>
                          )}
                        </td>

                        {/* Message Preview */}
                        <td className="py-4 px-4 max-w-xs">
                          <p 
                            onClick={() => setSelectedContact(contact)}
                            className="truncate text-xs cursor-pointer hover:text-brandNavy dark:hover:text-yellow-400 transition-colors"
                            title="Click to view full message"
                          >
                            {contact.message || <span className="italic admin-text-muted">No message body</span>}
                          </p>
                        </td>

                        {/* Submitted Date */}
                        <td className="py-4 px-4 text-xs admin-text-muted">
                          {formatDate(contact.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleCall(contact.phone)}
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 transition-colors"
                              title="Call Submitter"
                            >
                              <Phone size={16} />
                            </button>
                            <button
                              onClick={() => handleWhatsApp(contact.phone, contact.name)}
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
                              title="WhatsApp Submitter"
                            >
                              <MessageSquare size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(contact._id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 transition-colors"
                              title="Delete Message"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact Request"
        message="Are you sure you want to permanently delete this submission message? This action is irreversible."
      />

      {/* View Full Message modal overlay */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedContact(null)} />
          <div className="relative w-full max-w-md admin-card rounded-2xl p-6 shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold admin-text mb-4 border-b admin-border pb-3 flex items-center gap-2">
              <MessageCircle size={18} className="text-brandNavy dark:text-yellow-400" />
              <span>Message Details</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider admin-text-muted mb-0.5">Submitted By</span>
                <p className="font-semibold admin-text">{selectedContact.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider admin-text-muted mb-0.5">Phone Contact</span>
                  <p className="font-mono admin-text">{selectedContact.phone}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider admin-text-muted mb-0.5">Course Choice</span>
                  <p className="admin-text">{selectedContact.course || 'N/A'}</p>
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider admin-text-muted mb-0.5">Submission Date</span>
                <p className="admin-text flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" />
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider admin-text-muted mb-1">Message Content</span>
                <p className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl leading-relaxed whitespace-pre-wrap italic admin-text border admin-border">
                  "{selectedContact.message}"
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy font-bold px-5 py-2 rounded-xl transition-all"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, Save, Calendar, MapPin, MessageCircle, FileText, User } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import StatusBadge from '../components/StatusBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('New');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/leads/${id}`);
        setLead(res.data);
        setStatus(res.data.status);
        setNotes(res.data.notes || '');
      } catch (error) {
        console.error('Error fetching lead:', error);
        toast.error('Failed to load lead details.');
        navigate('/admin/leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await api.put(`/leads/${id}`, { status, notes });
      setLead(res.data);
      toast.success('Lead details updated successfully!');
    } catch (error) {
      toast.error('Failed to update lead details.');
    } finally {
      setUpdating(false);
    }
  };

  const handleCall = () => {
    window.open(`tel:${lead.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello ${lead.name}, this is Career Compass Consultancy. We are following up on your admission query.`);
    window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <LoadingSkeleton type="card" count={2} />;
  }

  if (!lead) return null;

  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/leads')}
          className="p-2.5 rounded-xl border admin-border admin-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          title="Back to Leads"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold admin-text">{lead.name}</h1>
          <p className="text-xs admin-text-muted">Registered on {formatDate(lead.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="rounded-2xl border admin-card p-6 admin-glass shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b admin-border pb-4">
              <h3 className="font-bold admin-text flex items-center gap-2">
                <User size={18} className="text-brandNavy dark:text-yellow-400" />
                <span>Lead Information</span>
              </h3>
              <StatusBadge status={lead.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs admin-text-muted font-bold uppercase tracking-wider mb-1">Academic Course</p>
                <p className="font-semibold admin-text text-base bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-xl inline-block">
                  {lead.course}
                </p>
              </div>

              <div>
                <p className="text-xs admin-text-muted font-bold uppercase tracking-wider mb-1">Phone Number</p>
                <p className="font-mono font-semibold admin-text text-base">{lead.phone}</p>
              </div>

              {lead.city && (
                <div>
                  <p className="text-xs admin-text-muted font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin size={12} />
                    <span>Location / City</span>
                  </p>
                  <p className="font-medium admin-text">{lead.city}</p>
                </div>
              )}

              {lead.source && (
                <div>
                  <p className="text-xs admin-text-muted font-bold uppercase tracking-wider mb-1">Source</p>
                  <p className="font-medium admin-text capitalize">{lead.source}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t admin-border">
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
              >
                <Phone size={16} />
                <span>Call Lead</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Message</span>
              </button>
            </div>
          </div>

          {/* Original Student Query Message */}
          {lead.message && (
            <div className="rounded-2xl border admin-card p-6 admin-glass shadow-sm space-y-4">
              <h3 className="font-bold admin-text flex items-center gap-2 border-b admin-border pb-4">
                <MessageCircle size={18} className="text-brandNavy dark:text-yellow-400" />
                <span>Student Message / Request Details</span>
              </h3>
              <p className="text-sm admin-text italic bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                "{lead.message}"
              </p>
            </div>
          )}
        </div>

        {/* Update Panel (Status & Admin Notes) */}
        <div className="rounded-2xl border admin-card p-6 admin-glass shadow-sm h-fit">
          <h3 className="font-bold admin-text flex items-center gap-2 border-b admin-border pb-4 mb-4">
            <FileText size={18} className="text-brandNavy dark:text-yellow-400" />
            <span>Counseling Action</span>
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4 text-sm">
            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Current Pipeline Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-medium"
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

            {/* Admin Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Counselor / Admin Notes
              </label>
              <textarea
                rows="6"
                placeholder="Write notes about call conversations, documents verified, admission status, or follow-up details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20 leading-relaxed font-sans"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={updating}
              className="w-full flex items-center justify-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy font-bold py-2.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{updating ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;

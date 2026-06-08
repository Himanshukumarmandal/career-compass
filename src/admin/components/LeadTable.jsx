import React from 'react';
import { Eye, Edit2, Trash2, Phone, MessageSquare, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import StatusBadge from './StatusBadge';

const LeadTable = ({
  leads,
  onView,
  onEdit,
  onDelete,
  sortConfig,
  onSort,
}) => {
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-gray-400 opacity-60 hover:opacity-100 transition-opacity ml-1" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={14} className="text-brandNavy dark:text-yellow-400 ml-1" />
    ) : (
      <ChevronDown size={14} className="text-brandNavy dark:text-yellow-400 ml-1" />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone, name) => {
    const message = encodeURIComponent(`Hello ${name}, this is Career Compass Consultancy. We received your query regarding admission counseling. How can we assist you today?`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="overflow-x-auto admin-scroll">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b admin-border text-[11px] font-bold tracking-wider uppercase admin-text-muted">
            <th className="py-4 px-4 cursor-pointer select-none" onClick={() => onSort('name')}>
              <div className="flex items-center">
                Name {getSortIcon('name')}
              </div>
            </th>
            <th className="py-4 px-4 cursor-pointer select-none" onClick={() => onSort('course')}>
              <div className="flex items-center">
                Course {getSortIcon('course')}
              </div>
            </th>
            <th className="py-4 px-4 cursor-pointer select-none" onClick={() => onSort('phone')}>
              <div className="flex items-center">
                Contact {getSortIcon('phone')}
              </div>
            </th>
            <th className="py-4 px-4 cursor-pointer select-none" onClick={() => onSort('status')}>
              <div className="flex items-center">
                Status {getSortIcon('status')}
              </div>
            </th>
            <th className="py-4 px-4 cursor-pointer select-none" onClick={() => onSort('createdAt')}>
              <div className="flex items-center">
                Registered {getSortIcon('createdAt')}
              </div>
            </th>
            <th className="py-4 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y admin-border">
          {leads.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-8 text-center admin-text-muted text-sm">
                No leads found matching current criteria.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr 
                key={lead._id}
                className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm admin-text"
              >
                {/* Name & Email */}
                <td className="py-4 px-4">
                  <div className="font-semibold">{lead.name}</div>
                  <div className="text-xs admin-text-muted">{lead.email || 'No email provided'}</div>
                </td>

                {/* Course */}
                <td className="py-4 px-4">
                  <span className="font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-xs">
                    {lead.course}
                  </span>
                </td>

                {/* Contact (Phone) */}
                <td className="py-4 px-4 font-mono text-xs">
                  {lead.phone}
                </td>

                {/* Status Badging */}
                <td className="py-4 px-4">
                  <StatusBadge status={lead.status} />
                </td>

                {/* Registered Date */}
                <td className="py-4 px-4 text-xs admin-text-muted">
                  {formatDate(lead.createdAt)}
                </td>

                {/* Action Row */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* Call Button */}
                    <button
                      onClick={() => handleCall(lead.phone)}
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30 transition-colors"
                      title="Call Lead"
                    >
                      <Phone size={16} />
                    </button>

                    {/* WhatsApp Button */}
                    <button
                      onClick={() => handleWhatsApp(lead.phone, lead.name)}
                      className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/30 transition-colors"
                      title="WhatsApp Lead"
                    >
                      <MessageSquare size={16} />
                    </button>

                    {/* View Details */}
                    <button
                      onClick={() => onView(lead._id)}
                      className="p-1.5 rounded-lg text-brandNavy hover:bg-brandNavy/5 dark:text-yellow-400 dark:hover:bg-yellow-400/10 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30 transition-colors"
                      title="Edit Lead"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete Lead"
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
  );
};

export default LeadTable;

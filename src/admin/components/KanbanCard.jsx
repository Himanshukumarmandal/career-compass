import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Phone, MessageSquare, Eye, Calendar, User } from 'lucide-react';

const KanbanCard = ({ lead, index, onViewDetail }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  const handleCall = (e, phone) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (e, phone, name) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello ${name}, this is Career Compass Consultancy. We are following up regarding your admission request. How can we help you?`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <Draggable draggableId={lead._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-xl border admin-card hover:border-brandNavy/30 dark:hover:border-yellow-400/30 transition-all select-none ${
            snapshot.isDragging 
              ? 'shadow-xl border-brandNavy/40 bg-brandNavy/5 scale-[1.02] dark:bg-yellow-400/5 dark:border-yellow-400/40' 
              : 'shadow-sm'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h4 className="font-semibold text-sm admin-text line-clamp-1 flex items-center gap-1.5">
              <User size={13} className="text-brandNavy/70 dark:text-yellow-400/70 shrink-0" />
              {lead.name}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brandNavy/10 text-brandNavy dark:bg-yellow-400/10 dark:text-yellow-400 uppercase tracking-wide shrink-0">
              {lead.course}
            </span>
          </div>

          {/* Details */}
          <p className="text-xs admin-text-muted mb-3 font-mono">{lead.phone}</p>

          {/* Footer actions & Date */}
          <div className="flex items-center justify-between border-t admin-border pt-2.5">
            <span className="text-[10px] admin-text-muted flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(lead.createdAt)}
            </span>

            <div className="flex gap-1">
              <button
                onClick={(e) => handleCall(e, lead.phone)}
                className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 transition-colors"
                title="Call Lead"
              >
                <Phone size={13} />
              </button>
              <button
                onClick={(e) => handleWhatsApp(e, lead.phone, lead.name)}
                className="p-1 rounded-md text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
                title="WhatsApp Lead"
              >
                <MessageSquare size={13} />
              </button>
              <button
                onClick={() => onViewDetail(lead._id)}
                className="p-1 rounded-md text-brandNavy hover:bg-brandNavy/5 dark:text-yellow-400 dark:hover:bg-yellow-400/10 transition-colors"
                title="View Details"
              >
                <Eye size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;

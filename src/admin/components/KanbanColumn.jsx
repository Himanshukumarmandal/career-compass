import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';

const columnColors = {
  'New': 'border-t-blue-500 bg-blue-500/5',
  'Contacted': 'border-t-yellow-500 bg-yellow-500/5',
  'Interested': 'border-t-emerald-500 bg-emerald-500/5',
  'Documents Received': 'border-t-purple-500 bg-purple-500/5',
  'Application Submitted': 'border-t-indigo-500 bg-indigo-500/5',
  'Admission Confirmed': 'border-t-green-500 bg-green-500/5',
  'Rejected': 'border-t-red-500 bg-red-500/5',
};

const KanbanColumn = ({ title, columnId, leads = [], onViewDetail }) => {
  const colorClass = columnColors[columnId] || 'border-t-gray-500 bg-gray-500/5';

  return (
    <div className={`flex flex-col w-72 md:w-80 shrink-0 border-t-4 rounded-xl admin-card overflow-hidden shadow-sm max-h-[70vh] md:max-h-[75vh] ${colorClass}`}>
      {/* Column Title and Counter */}
      <div className="flex justify-between items-center p-3 border-b admin-border bg-black/[0.02] dark:bg-white/[0.02]">
        <h3 className="font-semibold text-xs md:text-sm admin-text tracking-wide truncate">
          {title}
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 admin-text-muted">
          {leads.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto admin-scroll min-h-[150px] transition-colors ${
              snapshot.isDraggingOver 
                ? 'bg-black/10 dark:bg-white/5' 
                : ''
            }`}
          >
            {leads.map((lead, index) => (
              <KanbanCard
                key={lead._id}
                lead={lead}
                index={index}
                onViewDetail={onViewDetail}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;

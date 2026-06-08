import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';

const COLUMNS = [
  { id: 'New', title: 'New Leads' },
  { id: 'Contacted', title: 'Contacted' },
  { id: 'Interested', title: 'Interested' },
  { id: 'Documents Received', title: 'Documents Received' },
  { id: 'Application Submitted', title: 'Application Submitted' },
  { id: 'Admission Confirmed', title: 'Admission Confirmed' },
  { id: 'Rejected', title: 'Rejected / Closed' },
];

const KanbanBoard = ({ leads = [], onDragEnd, onViewDetail }) => {
  // Group leads by status
  const groupedLeads = COLUMNS.reduce((acc, col) => {
    acc[col.id] = leads.filter((lead) => lead.status === col.id);
    return acc;
  }, {});

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid column
    if (!destination) return;

    // Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Call external handler to update database
    onDragEnd(draggableId, destination.droppableId, source.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 pt-1 admin-scroll items-start select-none">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            title={col.title}
            columnId={col.id}
            leads={groupedLeads[col.id] || []}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

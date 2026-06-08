import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import KanbanBoard from '../components/KanbanBoard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AdmissionsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leads (no pagination, since Kanban displays the whole pipeline)
  const fetchAllLeads = async () => {
    try {
      setLoading(true);
      const res = await api.get('/leads/export'); // Use the export route to fetch all records
      setLeads(res.data);
    } catch (error) {
      console.error('Error fetching leads for pipeline:', error);
      toast.error('Failed to load admission pipeline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);

  const handleDragEnd = async (leadId, destStatus, srcStatus) => {
    // Optimistic UI update
    const previousLeads = [...leads];
    const updatedLeads = leads.map((lead) => {
      if (lead._id === leadId) {
        return { ...lead, status: destStatus };
      }
      return lead;
    });
    setLeads(updatedLeads);

    try {
      // API call to update status
      await api.patch(`/leads/${leadId}/status`, { status: destStatus });
      toast.success(`Lead moved to ${destStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to save status change.');
      // Revert state
      setLeads(previousLeads);
    }
  };

  const handleViewDetail = (id) => {
    window.location.href = `/admin/leads/${id}`;
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold admin-text">Admission Pipeline</h1>
        <p className="text-xs admin-text-muted">
          Manage college admissions interactively. Drag and drop cards to update student counseling status.
        </p>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-grow min-h-0 bg-transparent rounded-2xl">
        {loading ? (
          <LoadingSkeleton type="card" count={3} />
        ) : (
          <KanbanBoard
            leads={leads}
            onDragEnd={handleDragEnd}
            onViewDetail={handleViewDetail}
          />
        )}
      </div>
    </div>
  );
};

export default AdmissionsPage;

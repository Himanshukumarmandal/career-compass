import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({
  searchValue,
  onSearchChange,
  courseFilter,
  onCourseChange,
  statusFilter,
  onStatusChange,
  onClear,
}) => {
  const courses = ['B.Ed', 'D.El.Ed', 'B.P.Ed', 'B.P.E.S'];
  const statuses = [
    'New', 'Contacted', 'Interested', 'Documents Received',
    'Application Submitted', 'Admission Confirmed', 'Rejected',
  ];

  const hasFilters = searchValue || courseFilter || statusFilter;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
        <input
          type="text"
          placeholder="Search by name, phone, city..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm admin-input border focus:outline-none focus:ring-2 focus:ring-brandNavy/20 transition-all"
        />
      </div>

      {/* Course filter */}
      <select
        value={courseFilter}
        onChange={(e) => onCourseChange(e.target.value)}
        className="px-3 py-2.5 rounded-xl text-sm admin-input border focus:outline-none focus:ring-2 focus:ring-brandNavy/20 transition-all min-w-[130px]"
      >
        <option value="">All Courses</option>
        {courses.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2.5 rounded-xl text-sm admin-input border focus:outline-none focus:ring-2 focus:ring-brandNavy/20 transition-all min-w-[160px]"
      >
        <option value="">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchFilter;

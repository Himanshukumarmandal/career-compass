import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {skeletons.map((_, i) => (
          <div key={i} className="admin-card rounded-2xl p-5 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3" />
            <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="w-16 h-7 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="admin-card rounded-2xl overflow-hidden animate-pulse">
        <div className="p-4 border-b admin-border">
          <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        {skeletons.map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b admin-border last:border-b-0">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-40 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="admin-card rounded-2xl p-6 animate-pulse">
        <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="flex items-end gap-2 h-48">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t"
              style={{ height: `${30 + Math.random() * 70}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;

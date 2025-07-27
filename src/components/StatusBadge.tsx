import React from 'react';
import { StageStatus, FileStatus } from '../types';

type StatusVariant = 'stage' | 'file';

interface StatusBadgeProps {
  status: StageStatus | FileStatus;
  variant?: StatusVariant;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'stage'
}) => {
  const getStatusColor = () => {
    if (variant === 'stage') {
      switch (status) {
        case 'Completado':
          return 'bg-green-100 text-green-800 border-green-300';
        case 'En proceso':
          return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'Pendiente':
          return 'bg-amber-100 text-amber-800 border-amber-300';
        case 'Rechazado':
          return 'bg-red-100 text-red-800 border-red-300';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    } else {
      switch (status) {
        case 'revisado':
          return 'bg-green-100 text-green-800 border-green-300';
        case 'pendiente':
          return 'bg-amber-100 text-amber-800 border-amber-300';
        case 'rechazado':
          return 'bg-red-100 text-red-800 border-red-300';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()} transition-colors duration-200`}>
      {status}
    </span>
  );
};

export default StatusBadge;
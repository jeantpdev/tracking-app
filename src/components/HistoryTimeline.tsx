import React from 'react';
import { HistoryItem } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Clock } from 'lucide-react';

interface HistoryTimelineProps {
  history: HistoryItem[];
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 text-gray-500">
        <Clock size={20} className="mr-2" />
        <p>No hay entradas de historial disponibles</p>
      </div>
    );
  }

  // Sort history by date, most recent first
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminada':
        return 'bg-green-500';
      case 'En revisión':
        return 'bg-blue-500';
      case 'Pendiente':
        return 'bg-amber-500';
      case 'No terminada':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flow-root py-2">
      <ul className="-mb-8">
        {sortedHistory.map((item, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index < sortedHistory.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${getStatusColor(item.estado)}`}
                  >
                    <span className="text-white text-xs font-medium">
                      {index + 1}
                    </span>
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {item.estado}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.comentario}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                    <time dateTime={item.fecha}>{formatDate(item.fecha)}</time>
                    <p>Usuario ID: {item.usuario_id}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryTimeline;
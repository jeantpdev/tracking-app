import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, FilePlus, File, Edit2 } from 'lucide-react';
import { ProcessStage, FileItem as FileItemType } from '../types';
import StatusBadge from './StatusBadge';
import FileItem from './FileItem';
import HistoryTimeline from './HistoryTimeline';
import FileUpload from './FileUpload';
import { formatDate } from '../utils/dateUtils';

interface StageCardProps {
  stage: ProcessStage;
  index: number;
  totalStages: number;
  idRadicado: string;
  onStageUpdate: (stageId: string, newState: string, comment: string) => void;
  onFileEdit: (stageId: string, fileId: string) => void;
  onFileDelete: (stageId: string, fileId: string) => void;
  onFileView: (url: string) => void;
  onRefresh?: () => void;
}

const StageCard: React.FC<StageCardProps> = ({
  stage,
  index,
  totalStages,
  idRadicado,
  onStageUpdate,
  onFileEdit,
  onFileDelete,
  onFileView,
  onRefresh
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newState, setNewState] = useState(stage.estado);
  const [comment, setComment] = useState('');

  const getStageNumber = () => {
    return (index + 1).toString().padStart(2, '0');
  };

  const getProgressBarWidth = () => {
    return `${((index + 1) / totalStages) * 100}%`;
  };

  const handleFileUpload = (file: File) => {
    // This function is no longer needed as FileUpload handles its own upload
    // onFileUpload(stage.etapa, file);
  };

  const handleFileEdit = (fileId: string) => {
    onFileEdit(stage.etapa, fileId);
  };

  const handleFileDelete = (fileId: string) => {
    onFileDelete(stage.etapa, fileId);
  };

  const handleStageUpdate = () => {
    onStageUpdate(stage.etapa, newState, comment);
    setIsEditing(false);
    setComment('');
  };

  const toggleUploader = () => {
    setIsUploading(!isUploading);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-200' : 'hover:border-gray-300'}`}>
      {/* Header */}
      <div 
        className="px-4 py-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
            {getStageNumber()}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 capitalize">{stage.etapa}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <StatusBadge status={stage.estado} />
              <span className="text-sm text-gray-500">
                <Clock size={14} className="inline mr-1" />
                {formatDate(stage.fecha_actualizacion)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {stage.archivos && stage.archivos.length > 0 && (
            <span className="mr-3 text-sm text-gray-500 flex items-center">
              <File size={16} className="mr-1" />
              {stage.archivos.length}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="mr-3 text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={16} />
          </button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200">
        <div 
          className={`h-full ${stage.estado === 'Completado' ? 'bg-green-500' : stage.estado === 'En proceso' ? 'bg-blue-500' : stage.estado === 'Rechazado' ? 'bg-red-500' : 'bg-amber-500'}`}
          style={{ width: getProgressBarWidth() }}
        ></div>
      </div>

      {/* Edit form */}
      {isEditing && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Completado">Completado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleStageUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Comentarios */}
          {stage.comentarios && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Comentarios</h4>
              <p className="text-sm text-gray-600">{stage.comentarios}</p>
            </div>
          )}

          {/* Requisitos pendientes */}
          {stage.requisitos_pendientes && stage.requisitos_pendientes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Requisitos pendientes</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {stage.requisitos_pendientes.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Viabilidad */}
          {stage.viabilidad && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Viabilidad</h4>
              <p className="text-sm text-gray-600">{stage.viabilidad}</p>
            </div>
          )}

          {/* Desembolsado y fecha estimada */}
          {(typeof stage.desembolsado !== 'undefined' || stage.fecha_estimada) && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Estado de desembolso</h4>
              <p className="text-sm text-gray-600">
                {typeof stage.desembolsado !== 'undefined' && (stage.desembolsado ? 'Desembolsado' : 'No desembolsado')}
                {stage.fecha_estimada && ` - Fecha estimada: ${formatDate(stage.fecha_estimada)}`}
              </p>
            </div>
          )}

          {/* Archivos */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Archivos</h4>
            {stage.archivos && stage.archivos.length > 0 ? (
              <div className="space-y-2">
                {stage.archivos.map((file) => (
                  <FileItem
                    key={file.archivo_id}
                    file={file}
                    onEdit={() => handleFileEdit(file.archivo_id)}
                    onDelete={() => handleFileDelete(file.archivo_id)}
                    onView={() => onFileView(file.url)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-2">No hay archivos en esta etapa</p>
            )}
            <button
              onClick={() => {
                toggleUploader();
              }}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FilePlus size={16} className="mr-1" />
              Subir archivo
            </button>
            {isUploading && (
              <div className="mt-2">
                <FileUpload 
                  idRadicado={idRadicado} 
                  etapa={stage.etapa} 
                  onSuccess={onRefresh} 
                />
              </div>
            )}
          </div>

          {/* Historial */}
          {stage.historial && stage.historial.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Historial</h4>
              <HistoryTimeline history={stage.historial} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StageCard;
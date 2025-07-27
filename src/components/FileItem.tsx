import React from 'react';
import { FileIcon, Eye, Download, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { FileItem as FileItemType } from '../types';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/dateUtils';

interface FileItemProps {
  file: FileItemType;
  onEdit: (fileId: string) => void;
  onDelete: (fileId: string) => void;
  onView: (url: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onEdit, onDelete, onView }) => {
  const isImage = file.nombre.toLowerCase().match(/\.(jpeg|jpg|gif|png|svg)$/);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 gap-3 mb-2">
      <div className="flex items-center flex-1 min-w-0">
        <div className="p-2 rounded-md bg-gray-100 mr-3">
          <FileIcon size={20} className="text-gray-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm font-medium text-gray-900 truncate">{file.nombre}</h4>
            <StatusBadge status={file.estado} variant="file" />
          </div>
          <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 mt-1 text-xs text-gray-500">
            <span>Última modificación: {formatDate(file.ultima_fecha_modificacion)}</span>
            {file.modificado && (
              <span className="flex items-center text-amber-600">
                <AlertCircle size={12} className="mr-1" />
                Modificado
              </span>
            )}
          </div>
          {file.comentario && (
            <p className="mt-1 text-xs text-gray-500 italic">{file.comentario}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
        {/* <button
          onClick={() => onView(file.url)}
          className="flex-1 sm:flex-initial flex items-center justify-center px-3 py-1.5 text-xs text-gray-700 bg-white hover:bg-gray-100 border rounded transition-colors duration-200"
          title="Ver"
        >
          <Eye size={16} className="sm:mr-1" />
          <span className="hidden sm:inline">Ver</span>
        </button> */}
        <button
          onClick={handleDownload}
          className="flex-1 sm:flex-initial flex items-center justify-center px-3 py-1.5 text-xs text-gray-700 bg-white hover:bg-gray-100 border rounded transition-colors duration-200"
          title="Descargar"
        >
          <Download size={16} className="sm:mr-1" />
          <span className="hidden sm:inline">Descargar</span>
        </button>
        <button
          onClick={() => onEdit(file.archivo_id)}
          className="flex-1 sm:flex-initial flex items-center justify-center px-3 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors duration-200"
          title="Editar"
        >
          <Edit2 size={16} className="sm:mr-1" />
          <span className="hidden sm:inline">Editar</span>
        </button>
        <button
          onClick={() => onDelete(file.archivo_id)}
          className="flex-1 sm:flex-initial flex items-center justify-center px-3 py-1.5 text-xs text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors duration-200"
          title="Eliminar"
        >
          <Trash2 size={16} className="sm:mr-1" />
          <span className="hidden sm:inline">Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default FileItem;
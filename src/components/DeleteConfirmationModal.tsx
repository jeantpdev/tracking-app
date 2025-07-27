import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  stageId: string;
  fileId: string;
  fileName: string;
  onClose: () => void;
  onConfirm: (stageId: string, fileId: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  stageId,
  fileId,
  fileName,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm(stageId, fileId);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Confirmar eliminación</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium text-gray-900 mb-1">¿Eliminar archivo?</h4>
            <p className="text-sm text-gray-600">
              Estás a punto de eliminar el archivo <span className="font-medium">{fileName}</span>. Esta acción no se puede deshacer.
            </p>
          </div>
          
          <div className="flex justify-center space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
            >
              <Trash2 size={16} />
              <span>Eliminar archivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
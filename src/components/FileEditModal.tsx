import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import FileUpload from './FileUpload';

interface FileEditModalProps {
  stageId: string;
  fileId: string;
  fileName: string;
  idRadicado: string;
  fileToReplace: {
    url: string;
    archivo_id: string;
  };
  onClose: () => void;
  onSave: (stageId: string, fileId: string, file: File, comment: string) => void;
}

const FileEditModal: React.FC<FileEditModalProps> = ({
  stageId,
  fileId,
  fileName,
  idRadicado,
  fileToReplace,
  onClose,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(stageId, fileId, selectedFile, comment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Editar archivo</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Archivo actual: <span className="font-medium">{fileName}</span>
            </p>
            <FileUpload 
              idRadicado={idRadicado}
              etapa={stageId}
              isReplacement={true}
              fileToReplace={fileToReplace}
              onSuccess={() => {
                onClose();
                // Recargar los datos después de la subida
                window.location.reload();
              }}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comentario (opcional)
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none p-2 border"
              placeholder="Añade un comentario sobre los cambios realizados..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEditModal;
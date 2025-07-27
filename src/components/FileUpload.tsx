import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '../utils/api';

interface FileUploadProps {
  idRadicado: string;
  etapa: string;
  onSuccess?: () => void;
  isReplacement?: boolean;
  fileToReplace?: {
    url: string;
    archivo_id: string;
  };
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  idRadicado, 
  etapa, 
  onSuccess, 
  isReplacement = false,
  fileToReplace 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      await uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      if (isReplacement && fileToReplace) {
        // Reemplazar archivo existente
        await api.subirDocumentos({
          id_radicado: idRadicado,
          usuario_id: 182,
          etapa: etapa,
          archivo_reemplazar: file,
          ruta_archivo_reemplazar: fileToReplace.url,
          hay_archivos_nuevos: false,
          hay_archivos_para_reemplazar: true,
          comentario_historial: `Se actualizó el archivo ${file.name}`,
          estado_historial: 'pendiente'
        });
      } else {
        // Subir archivo nuevo
        await api.subirDocumentos({
          id_radicado: idRadicado,
          usuario_id: 182,
          etapa: etapa,
          archivos: [file],
          hay_archivos_nuevos: true,
          hay_archivos_para_reemplazar: false,
          comentario_historial: `Se subió el archivo ${file.name}`,
          estado_historial: 'pendiente'
        });
      }
      
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error al subir el archivo:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange} 
          ref={fileInputRef}
        />
        
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-600 mb-1">
            <span className="font-medium text-blue-600">Haz clic para {isReplacement ? 'reemplazar' : 'subir'}</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500">
            PDF, PNG, JPG (máx. 10MB)
          </p>
          {isUploading && (
            <p className="text-sm text-blue-600 mt-2">
              {isReplacement ? 'Reemplazando archivo...' : 'Subiendo archivo...'}
            </p>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearSelection();
            }}
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 
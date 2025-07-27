import React from 'react';
import { X } from 'lucide-react';

interface FileViewerProps {
  url: string;
  onClose: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ url, onClose }) => {
  const isImage = url.match(/\.(jpeg|jpg|gif|png|svg)$/i);
  const isPdf = url.match(/\.pdf$/i);
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Vista previa</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center min-h-[300px]">
          {isImage ? (
            <img 
              src={url} 
              alt="Preview" 
              className="max-w-full max-h-[calc(90vh-120px)] object-contain"
            />
          ) : isPdf ? (
            <iframe 
              src={`${url}#view=FitH`}
              className="w-full h-[calc(90vh-120px)]"
              title="PDF Viewer"
            />
          ) : (
            <div className="text-center">
              <p className="mb-4 text-gray-600">
                Este tipo de archivo no se puede previsualizar directamente.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Abrir enlace
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer;
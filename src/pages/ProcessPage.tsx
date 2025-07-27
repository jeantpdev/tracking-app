import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProcessTimeline from '../components/ProcessTimeline';
import FileViewer from '../components/FileViewer';
import FileEditModal from '../components/FileEditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { api, SeguimientoResponse } from '../utils/api';
import { Process, ProcessStage, FileItem } from '../types';

const ProcessPage: React.FC = () => {
  const { idRadicado } = useParams<{ idRadicado: string }>();
  const [processData, setProcessData] = useState<Process | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<{stageId: string; fileId: string; fileName: string; fileToReplace?: { url: string; archivo_id: string }} | null>(null);
  const [deletingFile, setDeletingFile] = useState<{stageId: string; fileId: string; fileName: string} | null>(null);

  useEffect(() => {
    const fetchProcessData = async () => {
      if (!idRadicado) {
        setError('No se proporcionó un ID de radicado');
        setLoading(false);
        return;
      }

      try {
        const data = await api.consultarSeguimiento(idRadicado);
        setProcessData(data);
      } catch (err) {
        setError('Error al cargar los datos del proceso');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, [idRadicado]);

  const handleFileUpload = async (stageId: string, file: File) => {
    console.log('ProcessPage handleFileUpload called with stageId:', stageId, 'file:', file);
    if (!idRadicado || !processData) return;

    try {
      const response = await api.subirDocumentos({
        id_radicado: idRadicado,
        usuario_id: 182, // Hacerlo con el usuario asesor acual
        etapa: stageId,
        archivos: [file],
        hay_archivos_nuevos: true,
        hay_archivos_para_reemplazar: false,
        comentario_historial: `Se subió el archivo ${file.name}`,
        estado_historial: 'pendiente'
      });

      // Recargar los datos del seguimiento para obtener la información actualizada
      const updatedData = await api.consultarSeguimiento(idRadicado);
      setProcessData(updatedData);
    } catch (err) {
      console.error('Error al subir el archivo:', err);
      // Mostrar mensaje de error al usuario
    }
  };

  const handleSaveEdit = async (stageId: string, fileId: string, file: File, comment: string) => {
    if (!idRadicado || !processData) return;

    try {
      // Encontrar el archivo a reemplazar
      const stage = processData.etapas.find(s => s.etapa === stageId);
      const fileToReplace = stage?.archivos?.find(f => f.archivo_id === fileId);
      
      if (!fileToReplace) {
        console.error('Archivo no encontrado');
        return;
      }

      const response = await api.subirDocumentos({
        id_radicado: idRadicado,
        usuario_id: 182, // Hacerlo con el usuario asesor acual
        etapa: stageId,
        archivo_reemplazar: file,
        ruta_archivo_reemplazar: fileToReplace.url,
        hay_archivos_nuevos: false,
        hay_archivos_para_reemplazar: true,
        comentario_historial: comment || `Se actualizó el archivo ${file.name}`,
        estado_historial: 'pendiente'
      });

      // Recargar los datos del seguimiento para obtener la información actualizada
      const updatedData = await api.consultarSeguimiento(idRadicado);
      setProcessData(updatedData);

      setEditingFile(null);
    } catch (err) {
      console.error('Error al actualizar el archivo:', err);
      // Mostrar mensaje de error al usuario
    }
  };

  const handleStageUpdate = async (stageId: string, newState: string, comment: string) => {
    if (!idRadicado || !processData) return;

    try {
      const response = await api.actualizarEtapa({
        id_radicado: idRadicado,
        etapa: stageId,
        estado: newState,
        comentarios: comment,
        usuario_id: 182
      });

      // Actualizar el estado con la nueva información
      setProcessData(prev => {
        if (!prev) return null;
        return prev.map(stage => {
          if (stage.etapa === stageId) {
            return {
              ...stage,
              estado: newState,
              comentarios: comment,
              fecha_actualizacion: new Date().toISOString()
            };
          }
          return stage;
        });
      });
    } catch (err) {
      console.error('Error al actualizar la etapa:', err);
      // Mostrar mensaje de error al usuario
    }
  };

  const handleFileEdit = (stageId: string, fileId: string) => {
    // Find the file to edit
    const stage = processData?.etapas.find(s => s.etapa === stageId);
    if (stage && stage.archivos) {
      const file = stage.archivos.find(f => f.archivo_id === fileId);
      if (file) {
        setEditingFile({
          stageId,
          fileId,
          fileName: file.nombre,
          fileToReplace: {
            url: file.url,
            archivo_id: file.archivo_id
          }
        });
      }
    }
  };
  
  const handleFileDelete = (stageId: string, fileId: string) => {
    // Find the file to delete
    const stage = processData?.etapas.find(s => s.etapa === stageId);
    if (stage && stage.archivos) {
      const file = stage.archivos.find(f => f.archivo_id === fileId);
      if (file) {
        setDeletingFile({
          stageId,
          fileId,
          fileName: file.nombre
        });
      }
    }
  };
  
  const handleConfirmDelete = (stageId: string, fileId: string) => {
    // In a real application, this would delete the file from the server
    // and then update the state with the updated file information
    
    console.log(`Deleting file ID ${fileId} from stage ${stageId}`);
    
    setProcessData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        etapas: prev.etapas.map(stage => {
          if (stage.etapa === stageId && stage.archivos) {
            return {
              ...stage,
              archivos: stage.archivos.filter(f => f.archivo_id !== fileId)
            };
          }
          return stage;
        })
      };
    });
    
    // Close the delete modal
    setDeletingFile(null);
  };
  
  const handleFileView = (url: string) => {
    setViewingFile(url);
  };

  const handleRefresh = async () => {
    if (!idRadicado) return;
    
    try {
      const updatedData = await api.consultarSeguimiento(idRadicado);
      setProcessData(updatedData);
    } catch (err) {
      console.error('Error al recargar datos:', err);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!processData) {
    return <div>No se encontraron datos del proceso</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seguimiento del Proceso</h1>
      <ProcessTimeline
        stages={processData.etapas}
        idRadicado={idRadicado!}
        onStageUpdate={handleStageUpdate}
        onFileEdit={handleFileEdit}
        onFileDelete={handleFileDelete}
        onFileView={handleFileView}
        onRefresh={handleRefresh}
      />
      {viewingFile && (
        <FileViewer
          fileUrl={viewingFile}
          onClose={() => setViewingFile(null)}
        />
      )}
      {editingFile && editingFile.fileToReplace && (
        <FileEditModal
          stageId={editingFile.stageId}
          fileId={editingFile.fileId}
          fileName={editingFile.fileName}
          fileToReplace={editingFile.fileToReplace}
          idRadicado={idRadicado!}
          onSave={handleSaveEdit}
          onClose={() => setEditingFile(null)}
        />
      )}
      {deletingFile && (
        <DeleteConfirmationModal
          stageId={deletingFile.stageId}
          fileId={deletingFile.fileId}
          fileName={deletingFile.fileName}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingFile(null)}
        />
      )}
    </div>
  );
};

export default ProcessPage;
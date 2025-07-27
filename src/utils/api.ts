import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Ajusta esta URL según tu configuración

export interface EtapaUpdateData {
  id_seguimiento?: string;
  id_radicado?: string;
  etapa: string;
  estado: string;
  comentarios?: string;
  usuario_id: number;
  requisitos_pendientes?: string[];
}

export interface DocumentoData {
  id_radicado?: string;
  id_seguimiento?: string;
  usuario_id: number;
  etapa: string;
  archivos?: File[];
  hay_archivos_nuevos?: boolean;
  hay_archivos_para_reemplazar?: boolean;
  ruta_archivo_reemplazar?: string;
  archivo_reemplazar?: File;
  comentario_historial?: string;
  estado_historial?: string;
}

export interface SeguimientoResponse {
  id_radicado: string;
  producto_solicitado: string;
  estado_global: string;
  banco: string;
  fecha_creacion: string;
  fecha_ultima_actualizacion: string;
  solicitante: {
    nombre: string;
    documento: string;
  };
  etapas: Array<{
    etapa: string;
    estado: string;
    comentarios?: string;
    fecha_actualizacion?: string;
    archivos?: Array<{
      archivo_id: string;
      nombre: string;
      url: string;
      estado: string;
      comentario: string;
      modificado: boolean;
      fecha_modificacion: string;
      ultima_fecha_modificacion: string;
    }>;
    historial: Array<{
      fecha: string;
      estado: string;
      comentario: string;
      usuario_id: number;
    }>;
    requisitos_pendientes?: string[];
    viabilidad?: string;
    desembolsado?: boolean;
    fecha_estimada?: string | null;
  }>;
}

export const api = {
  // Actualizar etapa
  actualizarEtapa: async (data: EtapaUpdateData) => {
    const response = await axios.post(`${API_BASE_URL}/seguimiento/actualizar-etapa`, data);
    return response.data;
  },

  // Subir documentos (nuevos o reemplazar)
  subirDocumentos: async (data: DocumentoData) => {
    const formData = new FormData();
    
    // Datos básicos
    if (data.id_radicado) formData.append('id_radicado', data.id_radicado);
    if (data.id_seguimiento) formData.append('id_seguimiento', data.id_seguimiento);
    formData.append('usuario_id', data.usuario_id);
    formData.append('etapa', data.etapa);
    
    // Booleanos para controlar el tipo de operación
    formData.append('hay_archivos_nuevos', data.hay_archivos_nuevos ? 'True' : 'False');
    formData.append('hay_archivos_para_reemplazar', data.hay_archivos_para_reemplazar ? 'True' : 'False');
    
    // Archivos nuevos
    if (data.hay_archivos_nuevos && data.archivos) {
      data.archivos.forEach((file) => {
        formData.append('archivos', file);
      });
    }
    
    // Reemplazar archivo existente
    if (data.hay_archivos_para_reemplazar) {
      if (data.ruta_archivo_reemplazar) {
        formData.append('ruta_archivo_reemplazar', data.ruta_archivo_reemplazar);
      }
      if (data.archivo_reemplazar) {
        formData.append('archivo_reemplazar', data.archivo_reemplazar);
      }
    }
    
    // Comentarios y estado del historial
    if (data.comentario_historial) {
      formData.append('comentario_historial', data.comentario_historial);
    }
    if (data.estado_historial) {
      formData.append('estado_historial', data.estado_historial);
    }

    const response = await axios.post(`${API_BASE_URL}/seguimiento/subir-documentos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Consultar seguimiento por radicado
  consultarSeguimiento: async (idRadicado: string): Promise<SeguimientoResponse> => {
    const response = await axios.get(`${API_BASE_URL}/seguimiento/consulta/${idRadicado}`);
    return response.data;
  },
}; 
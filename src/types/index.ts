export type FileStatus = 'pendiente' | 'revisado' | 'rechazado';
export type StageStatus = 'Pendiente' | 'En revisión' | 'Terminada' | 'No terminada' | 'Completado' | 'Rechazado' | 'En proceso';

export interface HistoryItem {
  fecha: string;
  estado: string;
  comentario: string;
  usuario_id: string;
}

export interface FileItem {
  url: string;
  estado: FileStatus;
  nombre: string;
  archivo_id: string;
  comentario: string;
  modificado: boolean;
  fecha_modificacion: string;
  ultima_fecha_modificacion: string;
}

export interface ProcessStage {
  etapa: string;
  estado: StageStatus;
  archivos?: FileItem[];
  historial: HistoryItem[];
  comentarios?: string;
  fecha_actualizacion?: string;
  requisitos_pendientes?: string[];
  viabilidad?: string;
  desembolsado?: boolean;
  fecha_estimada?: string | null;
}

export interface Process {
  id_radicado: string;
  producto_solicitado: string;
  estado_global: string; // Cambiado de StageStatus a string para ser compatible con la API
  banco: string;
  fecha_creacion: string;
  fecha_ultima_actualizacion: string;
  solicitante: {
    nombre: string;
    documento: string;
  };
  etapas: ProcessStage[];
}
import React from 'react';
import { Process, ProcessStage } from '../types';
import StageCard from './StageCard';

interface ProcessTimelineProps {
  stages: Process['etapas'];
  idRadicado: string;
  onStageUpdate: (stageId: string, newState: string, comment: string) => void;
  onFileEdit: (stageId: string, fileId: string) => void;
  onFileDelete: (stageId: string, fileId: string) => void;
  onFileView: (url: string) => void;
  onRefresh?: () => void;
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  stages,
  idRadicado,
  onStageUpdate,
  onFileEdit,
  onFileDelete,
  onFileView,
  onRefresh
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      {stages.map((stage, index) => (
        <StageCard
          key={stage.etapa}
          stage={stage}
          index={index}
          totalStages={stages.length}
          idRadicado={idRadicado}
          onStageUpdate={onStageUpdate}
          onFileEdit={onFileEdit}
          onFileDelete={onFileDelete}
          onFileView={onFileView}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default ProcessTimeline;
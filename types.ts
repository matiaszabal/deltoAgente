
export enum ArchitectureLayer {
  VIRTUALIZATION = 'Virtualización y Datos (Denodo)',
  ORCHESTRATION = 'Orquestación Agéntica (Harness)',
  KNOWLEDGE = 'Conocimiento y RAG',
  EXECUTION = 'Capa Transaccional (Sandbox)',
  GOVERNANCE = 'Gobernanza y OTLP'
}

export interface ComponentInfo {
  id: string;
  layer: ArchitectureLayer;
  title: string;
  icon: string;
  description: string;
  details: string[];
  color: string;
  owaspRisk?: string;
  roleInvolved?: string;
}

export interface SimulationState {
  currentStep: number;
  isActive: boolean;
  message: string;
  logs: string[];
  metrics: {
    faithfulness: number;
    otlpTracing: boolean;
    hipaaCompliant: boolean;
    jsonValidated: boolean;
  };
}

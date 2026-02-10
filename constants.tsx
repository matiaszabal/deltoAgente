
import { ArchitectureLayer, ComponentInfo } from './types';

export const ARCHITECTURE_COMPONENTS: ComponentInfo[] = [
  {
    id: 'denodo',
    layer: ArchitectureLayer.VIRTUALIZATION,
    title: 'Denodo SDK (Capa Determinista)',
    icon: '🧬',
    description: 'Abstracción y virtualización de silos de datos de afiliados sin replicación física.',
    details: ['Acceso controlado en tiempo real', 'Seguridad perimetral de datos', 'Integración de fuentes heterogéneas', 'Capa de abstracción para el App Server'],
    color: 'blue',
    roleInvolved: 'Data Architect / Denodo Expert'
  },
  {
    id: 'harness',
    layer: ArchitectureLayer.ORCHESTRATION,
    title: 'App Server / Harness',
    icon: '⚙️',
    description: 'Motor de orquestación dinámica que coordina agentes especializados (Auditoría, Atención, Cartilla).',
    details: ['Lógica de negocio centralizada', 'Prevención de autonomía no programada', 'Gestión de flujos de trabajo críticos', 'Interface entre LLM y Backend'],
    owaspRisk: 'Excessive Agency (LLM08)',
    color: 'indigo',
    roleInvolved: 'Solution Architect / Delto Ops'
  },
  {
    id: 'rag_vector',
    layer: ArchitectureLayer.KNOWLEDGE,
    title: 'RAG de Alta Precisión',
    icon: '📖',
    description: 'Generación aumentada anclada en VectorDB con manuales normativos y políticas SanCor.',
    details: ['Anclaje en evidencia documental', 'Eliminación de alucinaciones médicas', 'Vectorización de manuales 2025', 'Grounding determinista'],
    owaspRisk: 'Insecure Output Handling (LLM02)',
    color: 'emerald',
    roleInvolved: 'Knowledge Curator'
  },
  {
    id: 'json_validator',
    layer: ArchitectureLayer.EXECUTION,
    title: 'Validador JSON Estricto',
    icon: '📜',
    description: 'Validación de interacciones mediante esquemas rígidos antes de impactar ERP/CRM.',
    details: ['Validación contra Swagger/OpenAPI', 'Cifrado de canales transaccionales', 'Prevención de inyección de comandos', 'Esquemas JSON deterministas'],
    color: 'amber',
    roleInvolved: 'Backend Dev / Security Eng'
  },
  {
    id: 'sandbox_tools',
    layer: ArchitectureLayer.EXECUTION,
    title: 'Tool Calls (Sandboxing)',
    icon: '🧪',
    description: 'Entornos aislados para ejecución de APIs, impidiendo acceso a infraestructura central.',
    details: ['Aislamiento de red total', 'Credenciales efímeras', 'Prevención de elevación de privilegios', 'Cumplimiento SOC 2'],
    owaspRisk: 'Broken Access Control (LLM07)',
    color: 'orange',
    roleInvolved: 'DevSecOps'
  },
  {
    id: 'otlp_monitor',
    layer: ArchitectureLayer.GOVERNANCE,
    title: 'Observabilidad OpenTelemetry',
    icon: '📡',
    description: 'Monitoreo en tiempo real de trazas y métricas de ejecución en Google Cloud.',
    details: ['Protocolo OTLP activo', 'Detección de Denial of Wallet', 'Auditoría forense inmediata', 'KPIs de latencia y costos'],
    color: 'rose',
    roleInvolved: 'Compliance / SRE'
  },
  {
    id: 'compliance_auditor',
    layer: ArchitectureLayer.GOVERNANCE,
    title: 'Auditor de Fidelidad (HIPAA)',
    icon: '🛡️',
    description: 'Capa de defensa final que garantiza cumplimiento de Ley 25.326 y estándares HIPAA/SOC2.',
    details: ['Cálculo de Faithfulness Score', 'Detección de inyección indirecta', 'Sanitización PHI/PII final', 'Validación de tono corporativo'],
    owaspRisk: 'Model Overreliance (LLM09)',
    color: 'slate',
    roleInvolved: 'CISO / DPO SanCor'
  }
];

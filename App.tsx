
import React, { useState, useCallback } from 'react';
import { ARCHITECTURE_COMPONENTS } from './constants';
import { ComponentInfo, SimulationState } from './types';
import Sidebar from './components/Sidebar';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import SimulationControls from './components/SimulationControls';
import HelpModal from './components/HelpModal';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [simulation, setSimulation] = useState<SimulationState>({
    currentStep: -1,
    isActive: false,
    message: 'Sistema Custom AI listo para operación transaccional',
    logs: [],
    metrics: {
      faithfulness: 0,
      otlpTracing: false,
      hipaaCompliant: false,
      jsonValidated: false
    }
  });

  const addManualLog = (log: string) => {
    setSimulation(prev => ({
      ...prev,
      logs: [...prev.logs, `[SANCOR-LOG] ${log}`]
    }));
  };

  const runSimulation = useCallback(() => {
    if (simulation.isActive) return;

    setSimulation(prev => ({ 
      ...prev, 
      isActive: true, 
      currentStep: 0, 
      logs: ['[OTLP] Iniciando traza de ejecución: TX-SANCOR-2025-001'],
      message: 'Ingesta de documentos: Escaneando archivos en busca de esteganografía textual...' 
    }));
    
    const steps = [
      { 
        msg: 'Input: Inyección indirecta descartada. Documento adjunto saneado.', 
        log: '[SEC] Filtro de archivos finalizado. Sin instrucciones maliciosas ocultas.',
        metrics: { faithfulness: 0, otlpTracing: true, hipaaCompliant: true, jsonValidated: false },
        delay: 1500 
      },
      { 
        msg: 'Virtualización: Denodo SDK conectando con silos de datos de afiliados...', 
        log: '[DATA] Acceso virtualizado mediante Denodo. Cero replicación física detectada.',
        metrics: { faithfulness: 0, otlpTracing: true, hipaaCompliant: true, jsonValidated: false },
        delay: 2000 
      },
      { 
        msg: 'Harness: Orquestador dinámico asignando la tarea al Agente de Auditoría.', 
        log: '[ORCH] App Server delegando ejecución. Límites de agencia verificados.',
        metrics: { faithfulness: 0, otlpTracing: true, hipaaCompliant: true, jsonValidated: false },
        delay: 1500 
      },
      { 
        msg: 'RAG: Recuperando evidencia del Vademécum y Políticas SanCor 2025...', 
        log: '[KNOW] Búsqueda vectorial exitosa. Grounding en manual normativo confirmado.',
        metrics: { faithfulness: 0.85, otlpTracing: true, hipaaCompliant: true, jsonValidated: false },
        delay: 2000 
      },
      { 
        msg: 'Capa Transaccional: Generando esquema JSON estricto para transacción SAP.', 
        log: '[EXEC] Esquema JSON validado contra Swagger. Cumplimiento de integridad OK.',
        metrics: { faithfulness: 0.92, otlpTracing: true, hipaaCompliant: true, jsonValidated: true },
        delay: 1800 
      },
      { 
        msg: 'Sandbox: Ejecutando Tool Call en entorno aislado (SOC 2).', 
        log: '[SEC] Sandbox efímero creado. Ejecución de API segura sin efectos colaterales.',
        metrics: { faithfulness: 0.95, otlpTracing: true, hipaaCompliant: true, jsonValidated: true },
        delay: 2000 
      },
      { 
        msg: 'OTLP: Registrando métricas de latencia y observabilidad en GCP.', 
        log: '[OTLP] Trazas enviadas a Google Cloud. No se detectan anomalías de tráfico.',
        metrics: { faithfulness: 0.98, otlpTracing: true, hipaaCompliant: true, jsonValidated: true },
        delay: 1500 
      },
      { 
        msg: 'Auditoría Final: Calculando Faithfulness Score y sanitizando PHI.', 
        log: '[GOV] Faithfulness: 0.99. Output validado bajo estándares Ley 25.326.',
        metrics: { faithfulness: 0.99, otlpTracing: true, hipaaCompliant: true, jsonValidated: true },
        delay: 1500 
      },
      { 
        msg: 'Transacción Exitosa: "Gestión aprobada bajo normativa SanCor Salud".', 
        log: '[FINAL] TX-SANCOR-2025-001 Cerrada con éxito. Programa Sinergia Digital OK.',
        metrics: { faithfulness: 0.99, otlpTracing: true, hipaaCompliant: true, jsonValidated: true },
        delay: 1000 
      }
    ];

    let current = 0;
    const executeStep = () => {
      if (current >= steps.length) {
        setSimulation(prev => ({ ...prev, isActive: false, message: 'Operación Segura Finalizada (Ecosistema Delto)' }));
        return;
      }
      
      setSimulation(prev => ({
        ...prev,
        currentStep: current,
        message: steps[current].msg,
        logs: [...prev.logs, steps[current].log],
        metrics: steps[current].metrics
      }));

      setTimeout(() => {
        current++;
        executeStep();
      }, steps[current].delay);
    };

    executeStep();
  }, [simulation.isActive]);

  const resetSimulation = () => {
    setSimulation({
      currentStep: -1,
      isActive: false,
      message: 'Sistema Custom AI listo para operación transaccional',
      logs: [],
      metrics: {
        faithfulness: 0,
        otlpTracing: false,
        hipaaCompliant: false,
        jsonValidated: false
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100 font-['Inter']">
      <Sidebar 
        component={selectedComponent} 
        onClose={() => setSelectedComponent(null)}
        onManualLog={addManualLog}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <main className="flex-1 p-4 lg:p-10 flex flex-col items-center justify-start overflow-auto">
        <header className="w-full max-w-6xl mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-[#00519E] text-white uppercase tracking-widest shadow-lg shadow-blue-900/10">Sancor Salud Custom AI</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-widest">Powered by Delto</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Arquitectura de Agentes</h1>
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="group flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-[#00519E] text-white rounded-full transition-all active:scale-95 shadow-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest">Sinergia Digital Guide</span>
              </button>
            </div>
            <p className="text-slate-500 font-medium mt-2">Protocolo de Virtualización, Seguridad y Gobernanza de Datos</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status de Observabilidad</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-xs font-bold text-slate-700">OTLP ACTIVE (GCP)</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gobernanza de Datos</p>
              <p className="text-xs font-bold text-blue-600">LEY 25.326 / HIPAA OK</p>
            </div>
          </div>
        </header>

        <ArchitectureDiagram 
          components={ARCHITECTURE_COMPONENTS}
          selectedId={selectedComponent?.id || null}
          onSelect={setSelectedComponent}
          simulationStep={simulation.currentStep}
        />

        <SimulationControls 
          simulation={simulation}
          onStart={runSimulation}
          onReset={resetSimulation}
        />
        
        <footer className="w-full max-w-6xl mt-16 pt-8 border-t border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2025 SanCor Salud - Programa de Transformación Digital y Reskilling Agéntico</p>
          <div className="flex gap-6">
            <span className="hover:text-blue-600 transition-colors cursor-help">Denodo SDK Certified</span>
            <span className="hover:text-blue-600 transition-colors cursor-help">SOC 2 Compliant</span>
            <span className="hover:text-blue-600 transition-colors cursor-help">OpenTelemetry Protocol</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;

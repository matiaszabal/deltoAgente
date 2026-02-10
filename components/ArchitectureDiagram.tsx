
import React from 'react';
import { ComponentInfo, ArchitectureLayer } from '../types';

interface Props {
  components: ComponentInfo[];
  selectedId: string | null;
  onSelect: (comp: ComponentInfo) => void;
  simulationStep: number;
}

const ArchitectureDiagram: React.FC<Props> = ({ components, selectedId, onSelect, simulationStep }) => {
  // Mapping layers to rows or groupings
  const layersOrder = [
    // Fix: Using ArchitectureLayer.VIRTUALIZATION instead of PERCEPTION
    ArchitectureLayer.VIRTUALIZATION,
    ArchitectureLayer.ORCHESTRATION,
    ArchitectureLayer.KNOWLEDGE,
    ArchitectureLayer.EXECUTION,
    // Fix: Using ArchitectureLayer.GOVERNANCE instead of SUPERVISION
    ArchitectureLayer.GOVERNANCE
  ];

  const getStepForComponent = (id: string): number => {
    // Fix: Update step mapping to match the IDs defined in constants.tsx and the steps in App.tsx
    const stepMap: Record<string, number> = {
      'denodo': 1,
      'harness': 2,
      'rag_vector': 3,
      'json_validator': 4,
      'sandbox_tools': 5,
      'otlp_monitor': 6,
      'compliance_auditor': 7
    };
    return stepMap[id] ?? -1;
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8 overflow-hidden">
      <div className="grid grid-cols-1 gap-12 relative">
        {layersOrder.map((layerName, layerIdx) => (
          <div key={layerName} className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs">
                {layerIdx + 1}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{layerName}</h3>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {components
                .filter(c => c.layer === layerName)
                .map(comp => {
                  const isActiveInSim = getStepForComponent(comp.id) === simulationStep;
                  const isDoneInSim = getStepForComponent(comp.id) < simulationStep && simulationStep !== -1;
                  const isSelected = selectedId === comp.id;

                  return (
                    <button
                      key={comp.id}
                      onClick={() => onSelect(comp)}
                      className={`
                        relative group flex flex-col items-center p-6 w-full sm:w-64 rounded-2xl border-2 transition-all duration-300
                        ${isSelected ? 'border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-50' : 'border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-white'}
                        ${isActiveInSim ? 'scale-105 border-blue-400 bg-white shadow-xl ring-4 ring-blue-100' : ''}
                        ${isDoneInSim ? 'opacity-80 grayscale-[0.2]' : ''}
                      `}
                    >
                      {/* Pulse Effect for simulation */}
                      {isActiveInSim && (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-blue-400 opacity-20 pulse-animation"></div>
                        </div>
                      )}

                      <div className={`
                        text-3xl mb-3 p-3 rounded-xl transition-transform duration-300 group-hover:scale-110
                        ${isActiveInSim ? 'bg-blue-100' : 'bg-slate-100'}
                      `}>
                        {comp.icon}
                      </div>
                      
                      <h4 className={`font-bold text-sm ${isActiveInSim ? 'text-blue-700' : 'text-slate-700'}`}>
                        {comp.title}
                      </h4>
                      
                      <p className="text-xs text-slate-500 text-center mt-2 line-clamp-2">
                        {comp.description}
                      </p>

                      {/* Connection Arrows (Simplified visual for the flow) */}
                      {layerIdx < layersOrder.length - 1 && (
                         <div className="hidden lg:block absolute -bottom-10 left-1/2 -translate-x-1/2 z-0">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-colors duration-500 ${isDoneInSim ? 'text-blue-400' : 'text-slate-200'}`}>
                             <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;

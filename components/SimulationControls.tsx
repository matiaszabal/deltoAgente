
import React, { useRef, useEffect } from 'react';
import { SimulationState } from '../types';

interface Props {
  simulation: SimulationState;
  onStart: () => void;
  onReset: () => void;
}

const SimulationControls: React.FC<Props> = ({ simulation, onStart, onReset }) => {
  const logEndRef = useRef<HTMLDivElement>(null);
  const totalSteps = 9; 

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulation.logs]);

  const progress = Math.min(100, Math.max(0, ((simulation.currentStep + 1) / totalSteps) * 100));

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className={`
        relative overflow-hidden bg-[#0A0F1E] rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-stretch justify-between gap-12 transition-all duration-700 border border-slate-800 shadow-2xl
        ${simulation.isActive ? 'ring-4 ring-blue-500/20 scale-[1.01]' : ''}
      `}>
        {/* Dynamic Glow background */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -mr-[250px] -mt-[250px] pointer-events-none transition-all duration-1000 ${simulation.isActive ? 'bg-blue-600/20' : 'bg-blue-900/5'}`}></div>

        <div className="flex-1 z-10 flex flex-col justify-between min-h-[180px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-2.5 h-2.5 rounded-full ${simulation.isActive ? 'bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(96,165,250,0.8)]' : 'bg-slate-700'}`}></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400/80">Trace Monitor (Delto Harness)</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
              {simulation.message}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              <span>Ejecución Segura Paso a Paso</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800/40 rounded-full h-3 overflow-hidden backdrop-blur-md border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-[#00519E] to-blue-400 h-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Real-time OTLP Logs */}
        <div className="w-full lg:w-[420px] bg-black/40 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-6 flex flex-col z-10 shadow-inner">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Observability Stream (OTLP)
          </p>
          <div className="flex-1 overflow-y-auto max-h-[160px] font-mono text-[11px] space-y-3 scrollbar-hide pr-2">
            {simulation.logs.length === 0 && (
              <p className="text-slate-700 italic font-medium uppercase tracking-widest">Awaiting system activation...</p>
            )}
            {simulation.logs.map((log, i) => (
              <div key={i} className="flex gap-3 text-slate-400 border-l border-slate-800 pl-3">
                <span className="text-slate-600 font-bold">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={log.includes('OTLP') || log.includes('SEC') || log.includes('GOV') ? 'text-blue-300 font-medium' : 'text-slate-500'}>{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        <div className="flex flex-col gap-4 z-10 shrink-0 self-center">
          {!simulation.isActive && simulation.currentStep === -1 ? (
            <button
              onClick={onStart}
              className="px-12 py-6 bg-[#00519E] hover:bg-blue-600 text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(0,81,158,0.3)] hover:shadow-[0_20px_60px_rgba(0,81,158,0.5)] transition-all active:scale-95 flex items-center justify-center gap-4 group"
            >
              <svg className="w-7 h-7 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span className="uppercase tracking-[0.2em] text-xs">Iniciar Operación</span>
            </button>
          ) : (
             <button
              onClick={onReset}
              disabled={simulation.isActive}
              className={`
                px-12 py-6 font-black rounded-3xl transition-all border-2 text-xs uppercase tracking-[0.2em]
                ${simulation.isActive ? 'bg-slate-800/50 border-slate-700 text-slate-600 cursor-not-allowed' : 'bg-transparent border-slate-700 text-slate-100 hover:bg-slate-800'}
              `}
            >
              Resetear Sistema
            </button>
          )}
          <p className="text-[9px] text-slate-500 text-center font-black uppercase tracking-widest opacity-50">Custom AI Sandbox Env</p>
        </div>
      </div>
      
      {/* KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricCard 
          label="Faithfulness Score" 
          value={simulation.metrics.faithfulness ? `${(simulation.metrics.faithfulness * 100).toFixed(0)}%` : '--'} 
          active={simulation.isActive && simulation.metrics.faithfulness > 0}
          color="emerald"
        />
        <MetricCard 
          label="OTLP Tracing (GCP)" 
          value={simulation.metrics.otlpTracing ? 'TRACE ACTIVE' : 'PENDING'} 
          active={simulation.metrics.otlpTracing}
          color="blue"
        />
        <MetricCard 
          label="PHI Masking (HIPAA)" 
          value={simulation.metrics.hipaaCompliant ? 'SECURE' : 'STANDBY'} 
          active={simulation.metrics.hipaaCompliant}
          color="indigo"
        />
        <MetricCard 
          label="JSON Schema Validation" 
          value={simulation.metrics.jsonValidated ? 'VERIFIED' : 'AWAITING'} 
          active={simulation.metrics.jsonValidated}
          color="amber"
        />
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, active, color }: { label: string, value: string, active: boolean, color: string }) => {
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/5 border-blue-500/20',
    indigo: 'text-indigo-500 bg-indigo-500/5 border-indigo-500/20',
    amber: 'text-amber-500 bg-amber-500/5 border-amber-500/20'
  };
  
  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-700 bg-white flex flex-col justify-between group overflow-hidden relative ${active ? 'shadow-xl shadow-slate-200/50 border-slate-200' : 'opacity-40 border-slate-100'}`}>
      {active && <div className={`absolute top-0 right-0 w-16 h-16 blur-2xl opacity-20 -mr-8 -mt-8 ${colorMap[color].split(' ')[1]}`}></div>}
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 z-10">{label}</p>
      <div className="flex items-center justify-between z-10">
        <p className={`text-xl font-black tracking-tight ${active ? colorMap[color].split(' ')[0] : 'text-slate-300'}`}>{value}</p>
        {active && <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${colorMap[color].split(' ')[0].replace('text-', 'bg-')}`}></span>}
      </div>
    </div>
  );
};

export default SimulationControls;

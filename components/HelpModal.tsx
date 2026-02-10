
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Virtualización Denodo",
      desc: "Comprende cómo SanCor Salud accede a los datos de afiliados sin moverlos de su origen, garantizando privacidad mediante Denodo SDK.",
      icon: "🧬"
    },
    {
      title: "2. Orquestación Harness",
      desc: "Observa cómo el motor de Delto coordina a los agentes especializados sin permitir que el LLM tome decisiones fuera de los límites de negocio.",
      icon: "⚙️"
    },
    {
      title: "3. Observabilidad OTLP",
      desc: "Inicia simulaciones y monitorea cómo OpenTelemetry registra cada traza en Google Cloud para auditoría forense inmediata.",
      icon: "📡"
    },
    {
      title: "4. Seguridad de Archivos",
      desc: "Pon a prueba el sistema contra la 'Inyección Indirecta' en el laboratorio lateral para ver cómo saneamos documentos médicos adjuntos.",
      icon: "🧪"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#0A0F1E]/80 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in duration-500">
        <div className="bg-[#00519E] p-10 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Programa Sinergia Digital</p>
          <h2 className="text-4xl font-black tracking-tight">Ecosistema Custom AI SanCor</h2>
          <p className="text-blue-100/70 text-sm mt-3 font-medium max-w-lg leading-relaxed">Guía técnica para la evaluación de arquitectura, seguridad y gobernanza agéntica.</p>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">{step.icon}</span>
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">{step.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-10 pt-0 bg-slate-50/30">
          <button 
            onClick={onClose}
            className="w-full py-6 bg-[#00519E] hover:bg-blue-600 text-white font-black rounded-3xl shadow-[0_15px_40px_rgba(0,81,158,0.2)] transition-all active:scale-[0.98] text-[10px] uppercase tracking-[0.3em]"
          >
            Comenzar Auditoría Técnica
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;

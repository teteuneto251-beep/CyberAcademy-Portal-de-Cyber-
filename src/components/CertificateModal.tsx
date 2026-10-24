import React from 'react';
import { Award, X, Printer, ShieldCheck, CheckCircle2, Lock, Linkedin, Calendar } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizScore: number;
  totalQuestions: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  quizScore,
  totalQuestions
}) => {
  if (!isOpen) return null;

  const certHash = "SHA256:7e2f-9d8a-3b1c-840e-561f-22a9-c901";
  const issueDate = "19 de Outubro de 2026";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-red-500/40 overflow-hidden shadow-2xl">
        {/* Modal Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Certificado de Conclusão Técnica &amp; Competências Homologadas</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white keep-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center space-y-6">
          {/* Top Seal */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 flex items-center justify-center border-2 border-red-400/40 shadow-2xl shadow-red-600/30">
              <ShieldCheck className="w-10 h-10 text-white keep-white" />
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold">
              CERTIFICAÇÃO EXECUTIVA DE ENGENHARIA EM CYBERSECURITY • NIST CSF 2.0 &amp; ISO/IEC 27001
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Certificado de Qualificação Técnica em Defesa Cibernética &amp; Operações SOC
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Titular / Autor Responsável: <strong className="text-slate-900 dark:text-white">José Matheus dos Santos Neto</strong>
            </p>
          </div>

          {/* Holder Name & LinkedIn */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white">
              José Matheus dos Santos Neto
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/jose-matheus-dos-santos-neto-a37974384</span>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-1">
              Certifica-se a autoria do portal e conclusão com êxito da formação técnica avançada em <strong>Cybersecurity, Hardening de Redes, Arquitetura de Defesa e Governança IAM</strong>, fundamentada nos materiais didáticos e laboratórios elaborados pelo <strong>Prof. Rômulo Pereira de Almeida</strong> (100% dos 25 documentos e materiais técnicos homologados).
            </p>
          </div>

          {/* Competencies Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto text-left text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> NIST CSF 2.0 &amp; SOC
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Triagem ALT-042 e playbooks de contenção.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hardening &amp; NetSim
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Regras iptables stateful e 3 zonas isoladas.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Análise Wireshark
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Dissecação QUIC HTTP/3 KP0 e ICMPv6 NDP.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Gestão de Riscos (Aurora)
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Matriz 5x5, RTO (4h), RPO (1h) e backups WORM.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> IAM &amp; Motor Híbrido H1
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">RBAC, ABAC, PEP/PDP/PIP/PAP e SoD.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Simulado Técnico
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Score de Avaliação: {quizScore} de {totalQuestions} acertos.</p>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span>Data de Criação / Emissão: </span>
              <strong className="text-slate-900 dark:text-white">{issueDate} (19/10/2026)</strong>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] text-slate-700 dark:text-slate-300">{certHash}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

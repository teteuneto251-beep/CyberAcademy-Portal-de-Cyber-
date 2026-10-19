import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { quizQuestionsData, QuizQuestion } from '../data/modulesData';

interface QuizViewProps {
  userAnswers?: Record<number, number>;
  onSelectOption?: (questionId: number, optionIndex: number) => void;
  onReset?: () => void;
  onOpenCertificate?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  userAnswers: controlledAnswers,
  onSelectOption: controlledSelect,
  onReset: controlledReset,
  onOpenCertificate
}) => {
  const [internalAnswers, setInternalAnswers] = useState<Record<number, number>>({});

  const userAnswers = controlledAnswers !== undefined ? controlledAnswers : internalAnswers;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (userAnswers[questionId] !== undefined) return;
    if (controlledSelect) {
      controlledSelect(questionId, optionIndex);
    } else {
      setInternalAnswers((prev) => ({
        ...prev,
        [questionId]: optionIndex
      }));
    }
  };

  const handleReset = () => {
    if (controlledReset) {
      controlledReset();
    } else {
      setInternalAnswers({});
    }
  };

  const totalQuestions = quizQuestionsData.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([qId, ansIdx]) => {
      const q = quizQuestionsData.find((item) => item.id === parseInt(qId));
      return q && q.correctIndex === ansIdx;
    }
  ).length;

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-mono uppercase mb-1">
          <Zap className="w-4 h-4" />
          <span>Avaliação Prática Integrada • {totalQuestions} Questões Técnicas Abrangendo os 18 Documentos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Simulado Interativo &amp; Resolução de Casos Técnicos
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Teste seus conhecimentos com questões extraídas diretamente dos laboratórios práticos do <strong>NetSim</strong>, <strong>Wireshark</strong>, <strong>Ciclo de Defesa NIST</strong>, <strong>Caso Aurora</strong> e <strong>Arquitetura IAM (RBAC/ABAC/H1)</strong>.
        </p>
      </div>

      {/* Score Summary Banner */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-mono">Pontuação Atual:</span>
            <div className="text-2xl font-extrabold font-mono text-white flex items-center gap-2">
              <span>{correctCount} / {totalQuestions} Acertos</span>
              <span className="text-xs font-normal text-slate-400">({scorePercentage}%)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {answeredCount === totalQuestions
                ? 'Simulado concluído! Confira os fundamentos técnicos em cada explicação abaixo.'
                : `Respondidas ${answeredCount} de ${totalQuestions} questões.`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs transition shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Emitir Certificado Homologado</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-yellow-400" />
            <span>Reiniciar Simulado</span>
          </button>
        </div>
      </div>

      {/* Questões */}
      <div className="space-y-6">
        {quizQuestionsData.map((item: QuizQuestion, qIndex: number) => {
          const selectedAns = userAnswers[item.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = hasAnswered && selectedAns === item.correctIndex;

          return (
            <div
              key={item.id}
              className={`glass-card rounded-2xl p-6 border transition space-y-4 ${
                hasAnswered
                  ? isCorrect
                    ? 'border-emerald-500/50 bg-emerald-950/10'
                    : 'border-red-500/50 bg-red-950/10'
                  : 'border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-cyan-400 font-bold">
                    Questão {qIndex + 1} • {item.module}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-2 leading-relaxed">
                    {item.question}
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {item.options.map((opt: string, optIdx: number) => {
                  let optStyle =
                    'bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200';

                  if (hasAnswered) {
                    if (optIdx === item.correctIndex) {
                      optStyle =
                        'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (optIdx === selectedAns) {
                      optStyle = 'bg-red-50 dark:bg-red-950/70 border-red-500 text-red-900 dark:text-red-200 font-medium';
                    } else {
                      optStyle = 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 text-slate-600 dark:text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(item.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between gap-3 ${optStyle} ${
                        !hasAnswered ? 'cursor-pointer hover:border-slate-400 dark:hover:border-slate-700' : 'cursor-default'
                      }`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {hasAnswered && optIdx === item.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      )}
                      {hasAnswered && optIdx === selectedAns && optIdx !== item.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explicação Técnica Senior */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono border space-y-1 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/30 border-red-500/40 text-red-900 dark:text-red-300'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>RESPOSTA CORRETA</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span>RESPOSTA INCORRETA — FUNDAMENTAÇÃO TÉCNICA:</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

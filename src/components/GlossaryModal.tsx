import React, { useState } from 'react';
import { BookMarked, X, Search, Shield, Tag, ExternalLink } from 'lucide-react';
import { glossaryTermsData, GlossaryTerm } from '../data/modulesData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'IAM', 'NIST & SOC', 'Redes', 'Governança & Risco'];

  const filtered = glossaryTermsData.filter((item) => {
    const matchesCat = selectedCat === 'Todos' || item.category === selectedCat;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.standard.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-slate-700 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/15 border border-cyan-500/30 flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                Glossário Técnico de Cybersecurity &amp; Padrões Internacionais
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Normas NIST CSF 2.0, ISO/IEC 27001, RFCs IETF e Padrões de Controle de Acesso
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo ou norma..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              Nenhum termo encontrado para os critérios selecionados.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {filtered.map((item: GlossaryTerm, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25">
                        {item.category}
                      </span>
                      <span className="text-amber-400 font-bold">{item.standard}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mt-1">{item.term}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

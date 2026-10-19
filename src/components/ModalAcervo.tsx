import React, { useState } from 'react';
import { FolderTree, X, ArrowUpRight, Search, FileText, CheckCircle2 } from 'lucide-react';
import { acervoDocs, TechDoc } from '../data/documents';

interface ModalAcervoProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDocModule: (modulo: string) => void;
}

export const ModalAcervo: React.FC<ModalAcervoProps> = ({
  isOpen,
  onClose,
  onSelectDocModule
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['Todos', 'Apostilas', 'Guias Práticos', 'Diagnósticos', 'Relatórios'];

  const filteredDocs = acervoDocs.filter((doc) => {
    const matchesCategory =
      filterCategory === 'Todos' ||
      (filterCategory === 'Apostilas' && doc.categoria === 'Apostila') ||
      (filterCategory === 'Guias Práticos' && doc.categoria === 'Guia Prático') ||
      (filterCategory === 'Diagnósticos' && doc.categoria === 'Diagnóstico / Risco') ||
      (filterCategory === 'Relatórios' && doc.categoria === 'Relatório de Lab');

    const matchesSearch =
      doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col border border-slate-700 overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 flex items-center justify-center">
              <FolderTree className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                Inventário Oficial do Acervo Técnico ({acervoDocs.length} Documentos)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                13 Apostilas e Guias Práticos + 5 Relatórios Técnicos e Workbooks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar & search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-red-600 text-white'
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
              maxLength={80}
              autoComplete="off"
              spellCheck={false}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.slice(0, 80))}
              placeholder="Filtrar por nome ou tag..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/50"
            />
          </div>
        </div>

        {/* Docs list */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          {filteredDocs.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              Nenhum documento encontrado com os critérios de busca selecionados.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredDocs.map((doc: TechDoc) => (
                <div
                  key={doc.num}
                  onClick={() => {
                    onSelectDocModule(doc.modulo);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800/90 hover:border-slate-700 cursor-pointer transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-bold border border-red-500/25">
                        DOC #{doc.num}
                      </span>
                      <span className="text-slate-400 truncate max-w-[180px]">{doc.autor}</span>
                    </div>
                    <div className="font-bold text-white text-xs group-hover:text-red-400 transition leading-snug line-clamp-2">
                      {doc.titulo}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {doc.resumo}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] text-cyan-400 font-mono flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Indexado &amp; Integrado
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition">
                      Acessar Aula
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
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

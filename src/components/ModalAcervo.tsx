import React, { useState } from 'react';
import {
  FolderTree,
  X,
  ArrowUpRight,
  Search,
  FileText,
  CheckCircle2,
  Download,
  ExternalLink,
  BookOpen,
  Eye,
  ArrowLeft,
  Calendar,
  Sparkles
} from 'lucide-react';
import { acervoDocs, TechDoc } from '../data/documents';

interface ModalAcervoProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDocModule: (modulo: string) => void;
  isLightMode?: boolean;
}

export const ModalAcervo: React.FC<ModalAcervoProps> = ({
  isOpen,
  onClose,
  onSelectDocModule,
  isLightMode = false
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePdfDoc, setActivePdfDoc] = useState<TechDoc | null>(null);

  if (!isOpen) return null;

  const categories = ['Todos', 'Apostilas', 'Guias Práticos', 'Diagnósticos', 'Relatórios', 'Com PDF Oficial'];

  const filteredDocs = acervoDocs.filter((doc) => {
    const matchesCategory =
      filterCategory === 'Todos' ||
      (filterCategory === 'Apostilas' && doc.categoria === 'Apostila') ||
      (filterCategory === 'Guias Práticos' && doc.categoria === 'Guia Prático') ||
      (filterCategory === 'Diagnósticos' && doc.categoria === 'Diagnóstico / Risco') ||
      (filterCategory === 'Relatórios' && doc.categoria === 'Relatório de Lab') ||
      (filterCategory === 'Com PDF Oficial' && Boolean(doc.pdfUrl));

    const matchesSearch =
      doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.subtitulo && doc.subtitulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const romuloDocsCount = acervoDocs.filter((d) => d.autor.includes('Rômulo')).length;
  const matheusDocsCount = acervoDocs.filter((d) => d.autor.includes('Matheus')).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div
        className={`rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col border overflow-hidden shadow-2xl transition-colors ${
          isLightMode
            ? 'bg-white border-slate-300 text-slate-800'
            : 'bg-slate-950 border-slate-800 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 flex items-center justify-center shrink-0">
              <FolderTree className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`font-bold text-base sm:text-lg ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Inventário Oficial do Acervo Técnico ({acervoDocs.length} Documentos)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-500/15 text-red-600 dark:text-red-400 font-semibold border border-red-500/30">
                  Atualizado Out/2026
                </span>
              </div>
              <p
                className={`text-xs ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {romuloDocsCount} Materiais de Estudos &amp; Blueprints (<strong>Prof. Rômulo Pereira de Almeida</strong>) + {matheusDocsCount} Relatórios Técnicos (<strong>José Matheus dos Santos Neto</strong>)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActivePdfDoc(null);
              onClose();
            }}
            aria-label="Fechar modal"
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-black'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If viewing a single PDF document */}
        {activePdfDoc ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* PDF Toolbar */}
            <div
              className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
                isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivePdfDoc(null)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    isLightMode
                      ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Catálogo</span>
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
                      DOC #{activePdfDoc.num}
                    </span>
                    <h4
                      className={`font-bold text-xs sm:text-sm line-clamp-1 ${
                        isLightMode ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {activePdfDoc.titulo}
                    </h4>
                  </div>
                  <p
                    className={`text-[11px] ${
                      isLightMode ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    Autor: <strong>{activePdfDoc.autor}</strong> • {activePdfDoc.paginas || 'Material Completo'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activePdfDoc.pdfUrl && (
                  <>
                    <a
                      href={activePdfDoc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir em Nova Aba</span>
                    </a>
                    <a
                      href={activePdfDoc.pdfUrl}
                      download
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar PDF</span>
                    </a>
                  </>
                )}
                <button
                  onClick={() => {
                    onSelectDocModule(activePdfDoc.modulo);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow cursor-pointer"
                >
                  <span>Ir para Módulo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 bg-slate-900 overflow-hidden relative min-h-[450px]">
              {activePdfDoc.pdfUrl ? (
                <iframe
                  src={`${activePdfDoc.pdfUrl}#toolbar=1&navpanes=1`}
                  title={activePdfDoc.titulo}
                  className="w-full h-full border-0 min-h-[500px]"
                />
              ) : (
                <div className="p-8 text-center text-slate-400">
                  Documento técnico integrado aos módulos interativos do portal.
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Filter bar & search */}
            <div
              className={`p-4 border-b flex flex-col sm:flex-row gap-3 items-center justify-between ${
                isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      filterCategory === cat
                        ? 'bg-red-600 text-white'
                        : isLightMode
                        ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  maxLength={80}
                  autoComplete="off"
                  spellCheck={false}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.slice(0, 80))}
                  placeholder="Filtrar por nome, tag ou autor..."
                  className={`w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-red-500/70 ${
                    isLightMode
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            {/* Docs list */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs flex-1">
              {filteredDocs.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  Nenhum documento encontrado com os critérios de busca selecionados.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {filteredDocs.map((doc: TechDoc) => (
                    <div
                      key={doc.num}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between group ${
                        isLightMode
                          ? 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                          : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800/90 hover:border-slate-700 shadow-lg'
                      }`}
                    >
                      <div>
                        {/* Top Meta */}
                        <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-600 dark:text-red-400 font-bold border border-red-500/25">
                              DOC #{doc.num}
                            </span>
                            {doc.pdfUrl && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/25 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> PDF Oficial
                              </span>
                            )}
                          </div>
                          <span
                            className={`truncate max-w-[170px] ${
                              isLightMode ? 'text-slate-600 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {doc.autor}
                          </span>
                        </div>

                        {/* Title */}
                        <div
                          className={`font-bold text-xs sm:text-sm transition leading-snug ${
                            isLightMode
                              ? 'text-slate-900 group-hover:text-red-600'
                              : 'text-white group-hover:text-red-400'
                          }`}
                        >
                          {doc.titulo}
                        </div>

                        {doc.subtitulo && (
                          <div
                            className={`text-[11px] font-medium mt-1 line-clamp-1 ${
                              isLightMode ? 'text-slate-600' : 'text-slate-400'
                            }`}
                          >
                            {doc.subtitulo}
                          </div>
                        )}

                        {/* Summary */}
                        <p
                          className={`text-[11px] mt-2 leading-relaxed line-clamp-2 ${
                            isLightMode ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          {doc.resumo}
                        </p>

                        {/* Pages and publication date if available */}
                        {(doc.paginas || doc.dataPublicacao) && (
                          <div
                            className={`mt-2 flex items-center gap-3 text-[10px] font-mono ${
                              isLightMode ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {doc.paginas && <span>📄 {doc.paginas}</span>}
                            {doc.dataPublicacao && <span>🗓️ {doc.dataPublicacao}</span>}
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                                isLightMode
                                  ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom action row */}
                      <div
                        className={`mt-3 pt-3 border-t text-[11px] flex items-center justify-between gap-2 ${
                          isLightMode ? 'border-slate-200' : 'border-slate-800/60'
                        }`}
                      >
                        {doc.pdfUrl ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActivePdfDoc(doc)}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-1 transition cursor-pointer text-[10px]"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Visualizar PDF</span>
                            </button>
                            <a
                              href={doc.pdfUrl}
                              download
                              className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition text-[10px] ${
                                isLightMode
                                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                              }`}
                            >
                              <Download className="w-3 h-3" />
                              <span>Baixar</span>
                            </a>
                          </div>
                        ) : (
                          <span
                            className={`flex items-center gap-1 ${
                              isLightMode ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Indexado no Portal
                          </span>
                        )}

                        <button
                          onClick={() => {
                            onSelectDocModule(doc.modulo);
                            onClose();
                          }}
                          className="flex items-center gap-1 font-mono text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer group-hover:translate-x-0.5 transition ml-auto text-[11px]"
                        >
                          <span>Acessar Módulo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

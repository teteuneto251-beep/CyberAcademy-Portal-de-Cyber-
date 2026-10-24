import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ModalAcervo } from './components/ModalAcervo';
import { GlossaryModal } from './components/GlossaryModal';
import { CertificateModal } from './components/CertificateModal';
import { DashboardView } from './components/DashboardView';
import { Module1View } from './components/Module1View';
import { Module2View } from './components/Module2View';
import { Module3View } from './components/Module3View';
import { Module4View } from './components/Module4View';
import { Module5View } from './components/Module5View';
import { Module6View } from './components/Module6View';
import { QuizView } from './components/QuizView';
import { acervoDocs, TechDoc } from './data/documents';
import { quizQuestionsData } from './data/modulesData';
import {
  Search,
  X,
  Shield,
  ArrowUpRight,
  Radio,
  Flame,
  Activity,
  UserCheck,
  Award,
  BookMarked,
  Linkedin,
  Calendar
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isAcervoOpen, setIsAcervoOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});

  // Theme state: defaults to Modo Branco (Light mode) as requested by user
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cyberacademy_theme');
      return saved ? saved === 'light' : true;
    } catch {
      return true;
    }
  });

  // Sync HTML class when theme toggles
  useEffect(() => {
    try {
      localStorage.setItem('cyberacademy_theme', isLightMode ? 'light' : 'dark');
    } catch {
      // ignore
    }
    if (isLightMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === 'Escape') {
        setIsAcervoOpen(false);
        setIsGlossaryOpen(false);
        setIsCertificateOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to element helper
  const scrollToElement = (elementId: string) => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Change tab and scroll top
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quiz score computation
  const totalQuestions = quizQuestionsData.length;
  const correctQuizScore = Object.entries(userQuizAnswers).filter(([qId, ansIdx]) => {
    const q = quizQuestionsData.find((item) => item.id === parseInt(qId));
    return q && q.correctIndex === ansIdx;
  }).length;

  const handleSelectQuizOption = (questionId: number, optionIndex: number) => {
    if (userQuizAnswers[questionId] !== undefined) return;
    setUserQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setUserQuizAnswers({});
  };

  // Search Results
  const matchingDocs = searchQuery.trim().length >= 2
    ? acervoDocs.filter((d) => {
        const q = searchQuery.toLowerCase();
        return (
          d.titulo.toLowerCase().includes(q) ||
          d.resumo.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div
      className={`min-h-screen flex flex-col cyber-grid-bg transition-colors duration-200 selection:bg-cyan-500 selection:text-black ${
        isLightMode ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#050811] text-slate-100'
      }`}
    >
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenAcervo={() => setIsAcervoOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onToggleSidebar={() => setIsSidebarOpenMobile((prev) => !prev)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        completedDocsCount={acervoDocs.length}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode((prev) => !prev)}
      />

      {/* SOC Live Threat Ticker Banner - Futuristic HUD Style */}
      <div
        className={`border-b px-4 py-2 text-[11px] font-mono overflow-x-auto select-none backdrop-blur-md transition-colors duration-200 ${
          isLightMode
            ? 'bg-white/80 border-slate-200/90 text-slate-600'
            : 'bg-[#070b18]/80 border-cyan-500/15 text-slate-400'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SOC TELEMETRY
            </span>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>
              DEFCON 4 (Operacional)
            </span>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <span>
              Framework:{' '}
              <strong className={isLightMode ? 'text-cyan-700 font-semibold' : 'text-cyan-300'}>
                NIST CSF 2.0 (6 Funções)
              </strong>
            </span>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <span>
              Firewall:{' '}
              <strong className={isLightMode ? 'text-emerald-700 font-semibold' : 'text-emerald-300'}>
                NetSim Stateful (DROP Padrão)
              </strong>
            </span>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <span>
              Autorização:{' '}
              <strong className={isLightMode ? 'text-rose-700 font-semibold' : 'text-rose-300'}>
                H1 Híbrido (PEP/PDP/PIP)
              </strong>
            </span>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <span>
              Protocolos:{' '}
              <strong className={isLightMode ? 'text-purple-700 font-semibold' : 'text-purple-300'}>
                QUIC (HTTP/3 UDP 443) &amp; ICMPv6 NDP
              </strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition text-xs"
            >
              <BookMarked className="w-3.5 h-3.5" /> Glossário de Siglas
            </button>
            <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer transition text-xs"
            >
              <Award className="w-3.5 h-3.5" /> Certificado Homologado
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex relative">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleTabChange}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
          onScrollToElement={scrollToElement}
          isLightMode={isLightMode}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8">
          {/* Global Search Results Dropdown/Box if user searches */}
          {searchQuery.trim().length >= 2 && (
            <div
              className={`rounded-2xl p-5 border shadow-2xl animate-fadeIn space-y-3 ${
                isLightMode
                  ? 'bg-white border-red-500/40 shadow-slate-200'
                  : 'glass-card border-red-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                  <Search className="w-4 h-4 text-red-500" />
                  <span>
                    Resultados da Busca no Acervo Técnico ({matchingDocs.length} encontrados)
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Limpar busca (Esc)
                </button>
              </div>

              {matchingDocs.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nenhum documento específico encontrado para &ldquo;{searchQuery}&rdquo;. Tente termos como &ldquo;QUIC&rdquo;, &ldquo;IAM&rdquo;, &ldquo;Aurora&rdquo;, &ldquo;NetSim&rdquo;, &ldquo;NIST&rdquo;, &ldquo;RBAC&rdquo;, &ldquo;ABAC&rdquo; ou &ldquo;MFA&rdquo;.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchingDocs.map((doc: TechDoc) => (
                    <div
                      key={doc.num}
                      onClick={() => {
                        handleTabChange(doc.modulo);
                        setSearchQuery('');
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between group ${
                        isLightMode
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                          : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold">
                            DOC #{doc.num}
                          </span>
                          <span className="text-slate-500">{doc.categoria}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition line-clamp-1">
                          {doc.titulo}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {doc.resumo}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center justify-between">
                        <span>Acessar Módulo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Active Tab View */}
          {currentTab === 'dashboard' && (
            <DashboardView
              onSelectTab={handleTabChange}
              onOpenAcervo={() => setIsAcervoOpen(true)}
              onScrollToElement={scrollToElement}
              isLightMode={isLightMode}
            />
          )}

          {currentTab === 'mod1' && <Module1View />}
          {currentTab === 'mod2' && <Module2View />}
          {currentTab === 'mod3' && <Module3View />}
          {currentTab === 'mod4' && (
            <Module4View
              isLightMode={isLightMode}
              onNavigateToLab={(tab, anchor) => {
                handleTabChange(tab);
                scrollToElement(anchor);
              }}
            />
          )}
          {currentTab === 'mod5' && <Module5View isLightMode={isLightMode} />}
          {currentTab === 'mod6' && <Module6View isLightMode={isLightMode} />}
          {currentTab === 'quiz' && (
            <QuizView
              userAnswers={userQuizAnswers}
              onSelectOption={handleSelectQuizOption}
              onReset={handleResetQuiz}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer
        className={`border-t py-6 px-4 sm:px-6 transition-colors duration-200 ${
          isLightMode
            ? 'bg-white border-slate-200 text-slate-600'
            : 'bg-slate-950/90 border-slate-800/80 text-slate-400'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-red-600/15 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>
                Desenvolvido por José Matheus dos Santos Neto
              </span>
              <span className="mx-2 text-slate-400">•</span>
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>
                Material de Estudos: <strong>Prof. Rômulo Pereira de Almeida</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span>Criado em: <strong className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>19 de Outubro de 2026 (19/10/2026)</strong></span>
            </span>
            <a
              href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition ${
                isLightMode
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                  : 'bg-blue-950/50 hover:bg-blue-900/60 border-blue-700/60 text-blue-300'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>linkedin.com/in/jose-matheus-dos-santos-neto-a37974384</span>
            </a>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {acervoDocs.length}/{acervoDocs.length} Documentos Catalogados
            </span>
          </div>
        </div>
      </footer>

      {/* Technical Documents Archive Modal */}
      <ModalAcervo
        isOpen={isAcervoOpen}
        onClose={() => setIsAcervoOpen(false)}
        onSelectDocModule={(mod) => handleTabChange(mod)}
        isLightMode={isLightMode}
      />

      {/* Technical Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Professional Completion Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        quizScore={correctQuizScore}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}

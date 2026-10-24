import React from 'react';
import {
  ShieldCheck,
  Search,
  BookOpen,
  Menu,
  Layers,
  BookMarked,
  Award,
  Sun,
  Moon,
  Linkedin,
  Calendar,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAcervo: () => void;
  onOpenGlossary: () => void;
  onOpenCertificate: () => void;
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  completedDocsCount: number;
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectTab,
  onOpenAcervo,
  onOpenGlossary,
  onOpenCertificate,
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  completedDocsCount,
  isLightMode = false,
  onToggleTheme
}) => {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${
        isLightMode
          ? 'bg-white/90 border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] text-slate-800'
          : 'bg-[#050811]/90 border-cyan-500/20 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.8)] text-white'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Abrir menu de navegação"
            className={`lg:hidden p-2 rounded-xl border transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-100/90 border-slate-200 text-slate-700 hover:text-black'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-extrabold text-base sm:text-lg tracking-tight ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Engenharia &amp; Defesa Cibernética
                </span>
                <span className="hidden sm:inline text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                  NIST CSF 2.0 · SOC
                </span>
              </div>
              <p
                className={`text-[11px] hidden sm:flex items-center gap-1.5 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <span>Material: <strong className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>Prof. Rômulo Pereira de Almeida</strong></span>
                <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
                <span>Autor: <strong className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>José Matheus dos Santos Neto</strong></span>
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar - Clean Futuristic HUD Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition" />
            <input
              id="global-search"
              type="text"
              maxLength={80}
              autoComplete="off"
              spellCheck={false}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value.slice(0, 80))}
              placeholder="Buscar no acervo (RBAC, ABAC, PEP, NIST, QUIC, iptables, SoD)..."
              className={`w-full rounded-xl pl-10 pr-12 py-2 text-xs sm:text-sm border focus:outline-none transition ${
                isLightMode
                  ? 'bg-slate-50/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-200 placeholder-slate-500 focus:border-cyan-500/60 focus:bg-slate-900/90 focus:ring-1 focus:ring-cyan-500/30'
              }`}
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            ) : (
              <kbd
                className={`absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono border rounded select-none pointer-events-none ${
                  isLightMode
                    ? 'text-slate-500 bg-white border-slate-200'
                    : 'text-slate-400 bg-slate-800/80 border-slate-700'
                }`}
              >
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        {/* Right Metrics & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button (Modo Branco / Modo Escuro) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-amber-400'
              }`}
              title={isLightMode ? 'Alternar para Modo Escuro' : 'Alternar para Modo Branco'}
              aria-label="Alternar tema de cores"
            >
              {isLightMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden lg:inline text-[11px] font-mono font-bold text-slate-800">
                    Modo Branco
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden lg:inline text-[11px] font-mono font-bold text-slate-300">
                    Modo Escuro
                  </span>
                </>
              )}
            </button>
          )}

          <div
            className={`hidden lg:flex items-center gap-2 border px-3 py-1.5 rounded-xl text-[11px] font-mono ${
              isLightMode
                ? 'bg-slate-50 border-slate-200 text-slate-600'
                : 'bg-slate-900/60 border-cyan-500/20 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>SOC:</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-semibold">ATIVO</span>
          </div>

          <a
            href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLightMode
                ? 'bg-blue-50/80 hover:bg-blue-100 border-blue-200 text-blue-800'
                : 'bg-blue-950/40 hover:bg-blue-900/60 border-blue-700/50 text-blue-300 hover:text-white'
            }`}
            title="LinkedIn: José Matheus dos Santos Neto"
          >
            <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden xl:inline">LinkedIn</span>
          </a>

          <button
            onClick={onOpenGlossary}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-900/70 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white'
            }`}
            title="Glossário Técnico"
          >
            <BookMarked className="w-4 h-4 text-cyan-500" />
            <span className="hidden xl:inline">Glossário</span>
          </button>

          <button
            onClick={onOpenCertificate}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-900/70 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white'
            }`}
            title="Certificado de Conclusão"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span className="hidden xl:inline">Certificado</span>
          </button>

          <button
            onClick={onOpenAcervo}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-slate-900/80 hover:bg-slate-800 border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <span className="hidden sm:inline font-mono">{completedDocsCount} Docs</span>
          </button>
        </div>
      </div>
    </header>
  );
};

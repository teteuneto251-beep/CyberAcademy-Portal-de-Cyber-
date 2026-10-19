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
  Calendar
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
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${
        isLightMode
          ? 'bg-white/95 border-slate-200 shadow-sm text-slate-800'
          : 'bg-slate-950/90 border-slate-800/80 text-white'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Abrir menu de navegação"
            className={`lg:hidden p-2.5 rounded-xl border transition cursor-pointer ${
              isLightMode
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/25 border border-red-400/30">
              <ShieldCheck className="w-6 h-6 text-white keep-white" />
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
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-md bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 font-semibold">
                  NIST CSF 2.0 • SOC
                </span>
              </div>
              <p
                className={`text-[11px] hidden sm:block ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Material: <strong className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>Prof. Rômulo Pereira de Almeida</strong> • Autor do Portal: <strong className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>José Matheus dos Santos Neto</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search"
              type="text"
              maxLength={80}
              autoComplete="off"
              spellCheck={false}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value.slice(0, 80))}
              placeholder="Buscar termos no acervo (ex: RBAC, ABAC, PEP, NIST, QUIC, iptables, SoD)..."
              className={`w-full rounded-xl pl-10 pr-12 py-2 text-xs sm:text-sm border focus:outline-none transition ${
                isLightMode
                  ? 'bg-slate-100/90 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-red-500 focus:bg-white'
                  : 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-red-500/60'
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
                    : 'text-slate-500 bg-slate-800 border-slate-700'
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
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-400'
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
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={isLightMode ? 'text-slate-500' : 'text-slate-400'}>SOC:</span>
            <span className="text-emerald-500 font-semibold">ATIVO</span>
          </div>

          <a
            href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLightMode
                ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                : 'bg-blue-950/50 hover:bg-blue-900/60 border-blue-700/60 text-blue-300 hover:text-white'
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
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
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
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
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
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline">{completedDocsCount} Docs</span>
          </button>
        </div>
      </div>
    </header>
  );
};

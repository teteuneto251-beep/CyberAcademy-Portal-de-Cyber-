import React from 'react';
import {
  LayoutDashboard,
  Compass,
  ShieldAlert,
  BarChart3,
  Network,
  Flame,
  UserCheck,
  Zap,
  TriangleAlert,
  Activity,
  Terminal,
  KeyRound,
  Shield,
  ChevronRight,
  Server,
  Cpu,
  Linkedin,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onScrollToElement: (elementId: string) => void;
  isLightMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onScrollToElement,
  isLightMode = false
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Visão Geral & Acervo',
      sub: 'Estatísticas & 25 Docs',
      icon: LayoutDashboard,
      color: 'text-red-400'
    },
    {
      id: 'mod1',
      label: 'Módulo 1: Fundamentos',
      sub: 'CIA, Carreiras & Corporativo',
      icon: Compass,
      color: 'text-blue-400'
    },
    {
      id: 'mod2',
      label: 'Módulo 2: Ciclo de Defesa',
      sub: 'NIST CSF 2.0, SOC & ALT-042',
      icon: ShieldAlert,
      color: 'text-cyan-400'
    },
    {
      id: 'mod3',
      label: 'Módulo 3: Gestão de Riscos',
      sub: 'Workbook Aurora (8 Ativos/Riscos)',
      icon: BarChart3,
      color: 'text-amber-400'
    },
    {
      id: 'mod4',
      label: 'Módulo 4: Redes & Wireshark',
      sub: 'OSI, TCP/IP, QUIC & ICMPv6',
      icon: Network,
      color: 'text-purple-400'
    },
    {
      id: 'mod5',
      label: 'Módulo 5: Hardening & NetSim',
      sub: 'Firewall, 3 Zonas, IDS/IPS & VPN',
      icon: Flame,
      color: 'text-emerald-400'
    },
    {
      id: 'mod6',
      label: 'Módulo 6: IAM & Identidade',
      sub: 'SSO, NHI, Cofres, RBAC & SoD',
      icon: UserCheck,
      color: 'text-rose-400'
    },
    {
      id: 'quiz',
      label: 'Simulado & Microtarefas',
      sub: 'Desafios Práticos Resolvidos',
      icon: Zap,
      color: 'text-yellow-400'
    }
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    if (isOpenMobile) onCloseMobile();
  };

  const handleLabShortcut = (tabId: string, elementId: string) => {
    onSelectTab(tabId);
    if (isOpenMobile) onCloseMobile();
    setTimeout(() => {
      onScrollToElement(elementId);
    }, 150);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] border-r flex flex-col justify-between p-4 transition-transform duration-300 overflow-y-auto backdrop-blur-xl ${
          isLightMode
            ? 'bg-white/90 border-slate-200/90 text-slate-800'
            : 'bg-[#050811]/90 lg:bg-[#050811]/70 border-cyan-500/15 text-white'
        } ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Trilha Principal */}
          <div>
            <div className="px-3 flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                Trilha Técnica &amp; Módulos
              </span>
              <span className="text-[10px] font-mono text-slate-400">8 Áreas</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? isLightMode
                          ? 'nav-active bg-cyan-50/80 text-cyan-900 font-bold'
                          : 'nav-active bg-cyan-950/40 text-cyan-200 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : isLightMode
                        ? 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-950 font-medium'
                        : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${item.color} ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' : ''} transition-transform`} />
                    <div className="overflow-hidden">
                      <div className="leading-tight truncate">{item.label}</div>
                      <div className={`text-[10px] truncate ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.sub}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Atalhos de Simulação Prática */}
          <div>
            <div className="px-3 flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Laboratórios Interativos
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1.5 px-0.5">
              <button
                onClick={() => handleLabShortcut('mod1', 'sim-cia')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-blue-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lab Tríade CIA</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleLabShortcut('mod2', 'sim-alt042')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-amber-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <TriangleAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Triagem Alerta ALT-042</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleLabShortcut('mod4', 'sim-wireshark')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-purple-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dissecador Wireshark</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleLabShortcut('mod5', 'sim-netsim')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-emerald-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Firewall NetSim</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleLabShortcut('mod5', 'sim-bruteforce')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-rose-50/70 hover:bg-rose-100/80 text-rose-800 border-rose-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-rose-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>Lab Ataque Brute Force</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleLabShortcut('mod6', 'sim-iam')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 border-slate-800/80 hover:border-rose-500/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-rose-400" />
                  <span>Validador SoD &amp; JML</span>
                </span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavClick('mod6')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition cursor-pointer font-semibold ${
                  isLightMode
                    ? 'bg-cyan-50/80 hover:bg-cyan-100/80 text-cyan-900 border-cyan-200'
                    : 'bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 border-cyan-500/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Motor Decisão H1 (RBAC/ABAC)</span>
                </span>
                <ChevronRight className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Card de Autoria Oficial: José Matheus & Prof. Rômulo */}
        <div
          className={`mt-6 p-3.5 rounded-2xl border space-y-2.5 backdrop-blur-md ${
            isLightMode
              ? 'bg-slate-50/90 border-slate-200 text-slate-800 shadow-sm'
              : 'bg-gradient-to-b from-slate-900/90 to-slate-950 border-cyan-500/20 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center font-extrabold text-white text-xs shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              JM
            </div>
            <div className="overflow-hidden">
              <p className={`text-xs font-bold leading-snug truncate ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                José Matheus dos Santos Neto
              </p>
              <p className={`text-[10px] truncate ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Autor do Portal &amp; Engenharia
              </p>
            </div>
          </div>

          <div className={`pt-2 border-t text-[10px] ${isLightMode ? 'border-slate-200 text-slate-700' : 'border-slate-800/80 text-slate-300'}`}>
            <span className="text-slate-400 dark:text-slate-500 block font-mono uppercase text-[9px]">
              Material de Estudos &amp; Docência:
            </span>
            <strong className={isLightMode ? 'text-slate-900' : 'text-cyan-200'}>
              Prof. Rômulo Pereira de Almeida
            </strong>
          </div>

          <a
            href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full px-2.5 py-1.5 rounded-xl border text-[11px] font-medium flex items-center justify-between transition ${
              isLightMode
                ? 'bg-blue-50/80 hover:bg-blue-100 border-blue-200 text-blue-900'
                : 'bg-blue-950/40 hover:bg-blue-900/60 border-blue-700/50 text-blue-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate font-mono text-[10px]">
                linkedin.com/in/jose-matheus-dos-santos-neto-a37974384
              </span>
            </span>
            <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-slate-400" />
          </a>

          <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono ${isLightMode ? 'border-slate-200 text-slate-500' : 'border-slate-800/80 text-slate-400'}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-500" />
              <span>Criado: 19/10/2026</span>
            </span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ativo
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

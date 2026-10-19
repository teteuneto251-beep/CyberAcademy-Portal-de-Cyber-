import React from 'react';
import {
  Play,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Network,
  Flame,
  UserCheck,
  Compass,
  FileText,
  GitFork,
  Wrench,
  Building2,
  Terminal,
  Activity,
  KeyRound,
  CheckCircle2,
  Cpu,
  Shield,
  Linkedin,
  Calendar,
  ExternalLink,
  User
} from 'lucide-react';
import { SecurityRadarChart } from './SecurityRadarChart';

interface DashboardViewProps {
  onSelectTab: (tabId: string) => void;
  onOpenAcervo: () => void;
  onScrollToElement: (elementId: string) => void;
  isLightMode?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectTab,
  onOpenAcervo,
  onScrollToElement,
  isLightMode = false
}) => {
  const modules = [
    {
      id: 'mod1',
      num: 'MÓDULO 01',
      docs: 'Docs #01 e #02',
      title: 'Panorama, Carreiras & Ambientes Corporativos',
      badgeColor: 'bg-blue-500/15 text-blue-400',
      description:
        'Tríade CIA (Confidencialidade, Integridade, Disponibilidade), Estudo de Caso real AWS no Oriente Médio, Mapeamento das 8 Carreiras de Segurança e as 4 Camadas de Dependências do Caso Horizonte Serviços.',
      actionText: 'Acessar Fundamentos & Carreiras',
      icon: Compass,
      accent: 'blue'
    },
    {
      id: 'mod2',
      num: 'MÓDULO 02',
      docs: 'Doc #03',
      title: 'Ciclo de Defesa & NIST CSF 2.0',
      badgeColor: 'bg-cyan-500/15 text-cyan-400',
      description:
        'As 6 funções estratégicas do NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), atuação do Blue Team e SOC, correlação de logs e laboratório interativo de triagem do Alerta ALT-042.',
      actionText: 'Acessar Módulo + Simulador ALT-042',
      icon: ShieldAlert,
      accent: 'cyan'
    },
    {
      id: 'mod3',
      num: 'MÓDULO 03',
      docs: 'Docs #04, #12 e #13',
      title: 'Diagnóstico de Riscos — Caso Aurora Distribuição',
      badgeColor: 'bg-amber-500/15 text-amber-400',
      description:
        'Estudo de caso completo (C01 a C10), inventário de 8 ativos críticos, 5 cenários de risco mapeados, cálculo de Risco Inerente vs Residual (5x5), metas de RTO (4h), RPO (1h) e gestão de terceiros (NexoTI).',
      actionText: 'Ver Workbook & Matriz de Riscos',
      icon: BarChart3,
      accent: 'amber'
    },
    {
      id: 'mod4',
      num: 'MÓDULO 04',
      docs: 'Docs #05, #14 e #15',
      title: 'Redes, TCP/IP, IP Scanner & Wireshark',
      badgeColor: 'bg-purple-500/15 text-purple-400',
      description:
        'Modelo OSI vs TCP/IP, Three-Way Handshake TCP, DNS, HTTP/3 sobre QUIC (UDP 443, TLS 1.3, KP0), ICMPv6 Neighbor Discovery (NDP) e dissecação interativa de pacotes capturados.',
      actionText: 'Explorar Dissecador Wireshark',
      icon: Network,
      accent: 'purple'
    },
    {
      id: 'mod5',
      num: 'MÓDULO 05',
      docs: 'Docs #06, #07, #08 e #16',
      title: 'Hardening de Rede, Firewalls & Simulador NetSim',
      badgeColor: 'bg-emerald-500/15 text-emerald-400',
      description:
        'Lab 5 oficial (Harden a vulnerable network) e Topologia de 3 Zonas construída do zero (Usuários .10, Servidores .20, Visitantes .30). Regras iptables stateful conntrack, IDS/IPS e VPN corporativa.',
      actionText: 'Testar Terminal NetSim Interativo',
      icon: Flame,
      accent: 'emerald'
    },
    {
      id: 'mod6',
      num: 'MÓDULO 06',
      docs: 'Docs #09, #10, #11, #17 e #18',
      title: 'Identity & Access Management (IAM, RBAC & ABAC)',
      badgeColor: 'bg-rose-500/15 text-rose-400',
      description:
        'Conceito de Identidade, Conta, Credencial e Autenticador. Fluxo AAA, Ciclo de Vida JML, Resistência a Phishing (FIDO2/Passkey vs TOTP/SMS), Arquitetura PEP/PDP/PIP/PAP e Motor de Decisão Híbrido H1.',
      actionText: 'Acessar Blueprint, SoD & Motor H1',
      icon: UserCheck,
      accent: 'rose'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner com Autoria Oficial */}
      <div
        className={`relative rounded-3xl overflow-hidden border p-6 sm:p-8 lg:p-10 transition-all ${
          isLightMode
            ? 'bg-gradient-to-r from-red-50/80 via-white to-slate-50 border-red-200 shadow-md text-slate-900'
            : 'bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/40 border-slate-800 shadow-2xl text-white'
        }`}
      >
        <div className="max-w-4xl space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              ARQUITETURA CORPORATIVA • NIST CSF 2.0 • ISO/IEC 27001 • ZERO TRUST
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono font-semibold ${
                isLightMode
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-900/90 border-slate-700 text-slate-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span>Criado em: 19 de Outubro de 2026 (19/10/2026)</span>
            </div>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Plataforma Executiva de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 dark:from-red-400 dark:via-rose-300 dark:to-cyan-400">
              Engenharia em Cybersecurity &amp; Defesa Ativa
            </span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Ambiente técnico e laboratorial consolidando{' '}
            <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>
              100% dos 18 referenciais normativos, guias operacionais, blueprints arquiteturais e relatórios técnicos de engenharia
            </strong>. Estruturado conforme diretrizes internacionais de Blue Team, Operações SOC, Hardening de Redes e Governança de Riscos.
          </p>

          {/* Author & LinkedIn Attribution Card */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isLightMode
                ? 'bg-white/95 border-slate-200 shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white keep-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                JM
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    José Matheus dos Santos Neto
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 font-mono text-[10px] font-bold">
                    Autor &amp; Engenheiro Responsável
                  </span>
                </div>
                <p className={`text-xs mt-0.5 font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Data de criação do portal: <strong>19 de Outubro de 2026</strong> • linkedin.com/in/jose-matheus-dos-santos-neto-a37974384
                </p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-xl font-semibold text-xs border transition flex items-center gap-2 shrink-0 ${
                isLightMode
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
                  : 'bg-blue-950/60 hover:bg-blue-900/70 text-blue-300 border-blue-700/60'
              }`}
            >
              <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Acessar LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => onSelectTab('mod1')}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Iniciar Trilha Completa
            </button>
            <button
              onClick={onOpenAcervo}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition flex items-center gap-2 cursor-pointer ${
                isLightMode
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" /> Ver Inventário dos 18 Arquivos
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Documentos Indexados</span>
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            18
          </p>
          <p className="text-[11px] text-emerald-500 mt-1 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 13 Apostilas + 5 Relatórios
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Frameworks Globais</span>
            <GitFork className="w-5 h-5 text-cyan-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            NIST 2.0
          </p>
          <p className="text-[11px] text-slate-400 mt-1">SP 800-61r3, CIS Controls &amp; LGPD</p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Laboratórios Interativos</span>
            <Wrench className="w-5 h-5 text-purple-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            5 Labs
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Wireshark, NetSim, SOC, SoD &amp; H1</p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Estudos de Caso</span>
            <Building2 className="w-5 h-5 text-amber-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            3 Casos
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Aurora Dist., Horizonte &amp; AWS</p>
        </div>
      </div>

      {/* Gráfico de Radar Interativo (Recharts) de Proficiência nos 6 Módulos */}
      <SecurityRadarChart
        isLightMode={isLightMode}
        onNavigateModule={(modId) => onSelectTab(modId)}
      />

      {/* Grid dos 6 Módulos em Ordem Didática */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Módulos Didáticos da Formação (Em Ordem Cronológica)</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Clique em qualquer módulo para estudar
          </span>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onSelectTab(m.id)}
                className="glass-card rounded-2xl p-5 cursor-pointer group flex flex-col justify-between hover:border-slate-600 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold ${m.badgeColor}`}>
                      {m.num}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{m.docs}</span>
                  </div>

                  <h3 className={`text-base font-bold group-hover:text-red-500 transition flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition" />
                    <span>{m.title}</span>
                  </h3>

                  <p className={`text-xs mt-2.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {m.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs font-medium group-hover:text-red-500 transition ${isLightMode ? 'border-slate-200 text-slate-700' : 'border-slate-800/80 text-slate-300'}`}>
                  <span>{m.actionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atalhos Rápidos para os Laboratórios Práticos */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className={`text-base font-bold flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
          <Wrench className="w-5 h-5 text-cyan-500" />
          <span>Acesso Imediato aos 6 Laboratórios e Simuladores Técnicos</span>
        </h3>
        <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
          Ferramentas interativas desenvolvidas para reproduzir os cenários reais executados durante a formação:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => {
              onSelectTab('mod1');
              setTimeout(() => onScrollToElement('sim-cia'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center mb-2.5">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-blue-400 transition">
              Lab Tríade CIA
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Classifique violações reais em Confidencialidade, Integridade e Disponibilidade.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod2');
              setTimeout(() => onScrollToElement('sim-alt042'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center mb-2.5">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
              Triagem Alerta ALT-042
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Simulador SOC com contenção, tokens OAuth2 e regra de e-mail.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod4');
              setTimeout(() => onScrollToElement('sim-wireshark'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center mb-2.5">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-purple-400 transition">
              Dissecador Wireshark v4.6
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Inspeção de pacotes reais QUIC (HTTP/3 KP0) e ICMPv6 NDP.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod5');
              setTimeout(() => onScrollToElement('sim-netsim'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-2.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
              Terminal Firewall NetSim
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Simule pacotes antes e depois do Hardening iptables stateful.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod5');
              setTimeout(() => onScrollToElement('sim-bruteforce'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-red-500/40 hover:border-red-400 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center mb-2.5">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-red-400 transition">
              Lab Ataque Brute Force &amp; Mitigação
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Inspecione logs auth.log e aplique regras de firewall iptables DROP.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod6');
              setTimeout(() => onScrollToElement('sim-iam'), 150);
            }}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center mb-2.5">
              <KeyRound className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-rose-400 transition">
              Validador SoD &amp; RBAC
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Teste autorizações entre Solicitante, Aprovador e Admin TI.
            </p>
          </div>

          <div
            onClick={() => onSelectTab('mod6')}
            className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/40 hover:border-rose-400 cursor-pointer transition group sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-rose-300 transition flex items-center gap-2">
                    <span>Motor de Decisão Híbrido H1 (RBAC + ABAC)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] uppercase font-bold">
                      Novo Material Integrado
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Avaliação em tempo real com PEP / PDP / PIP / PAP, Matriz de Testes T1 a T10 e os 8 casos da Empresa Horizonte.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

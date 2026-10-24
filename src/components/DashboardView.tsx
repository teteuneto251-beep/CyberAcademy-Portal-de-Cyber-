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
  User,
  Sparkles
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
      image: '/assets/aistudio/Cybersecurity_shield_emblem_bann__20261024192254_8674da8a.jpg',
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
      image: '/assets/aistudio/Cybersecurity_engineer_analyzing__20261024192147_fe89649e.jpg',
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
      image: '/assets/aistudio/Corporate_risk_management_execut__20261024192245_dfa047d3.jpg',
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
      image: '/assets/aistudio/Data_packets_traveling_across_ne__20261024192207_422b4094.jpg',
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
      image: '/assets/aistudio/Corporate_network_fortress_archi__20261024192219_6ed44814.jpg',
      description:
        'Lab 5 oficial (Harden a vulnerable network) e Topologia de 3 Zonas construída do zero (Usuários .10, Servidores .20, Visitantes .30). Regras iptables stateful conntrack, IDS/IPS e VPN corporativa.',
      actionText: 'Testar Terminal NetSim Interativo',
      icon: Flame,
      accent: 'emerald'
    },
    {
      id: 'mod6',
      num: 'MÓDULO 06',
      docs: 'Docs #09, #10, #11, #17 a #25',
      title: 'IAM, Federação SSO, NHI & Cofres de Segredos',
      badgeColor: 'bg-rose-500/15 text-rose-400',
      image: '/assets/aistudio/Digital_identity_federation_arch__20261024192228_da215ae9.jpg',
      description:
        'Conceito de Identidade, Conta, Credencial e Autenticador. Fluxo AAA, Ciclo JML, MFA FIDO2, Federação SAML 2.0 / OIDC, SCIM, Identidades Não Humanas (NHI), Workload Identity Federation (WIF), Cofres de Segredos (HashiCorp/AWS/Azure/GCP), Criptografia Envelope (DEK/KEK) e Motor Híbrido H1.',
      actionText: 'Acessar SSO, NHI, Cofres & Motor H1',
      icon: UserCheck,
      accent: 'rose'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner com Autoria Oficial - Futuristic Cyber HUD */}
      <div
        className={`relative rounded-3xl overflow-hidden border p-6 sm:p-8 lg:p-10 transition-all ${
          isLightMode
            ? 'bg-gradient-to-br from-cyan-50/70 via-white to-slate-50 border-cyan-200/70 shadow-[0_4px_30px_-6px_rgba(6,182,212,0.1)] text-slate-900'
            : 'bg-gradient-to-br from-[#070d1e] via-[#091124] to-[#0d091a] border-cyan-500/25 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8)] text-white'
        }`}
      >
        {/* Subtle decorative futuristic grid beam */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                ARQUITETURA CORPORATIVA · NIST CSF 2.0 · ISO/IEC 27001 · ZERO TRUST
              </span>
              <span className={isLightMode ? 'text-slate-300' : 'text-slate-700'}>·</span>
              <span className={`flex items-center gap-1.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                <span>Criado: 19 de Outubro de 2026 (19/10/2026)</span>
              </span>
            </div>

            <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Plataforma Executiva de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-300 dark:to-indigo-300">
                Engenharia em Cybersecurity &amp; Defesa Ativa
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Ambiente técnico e laboratorial consolidando{' '}
              <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>
                100% dos 25 materiais didáticos, guias práticos, blueprints arquiteturais e relatórios técnicos de laboratório
              </strong>{' '}
              com material de estudos de autoria do{' '}
              <strong className={isLightMode ? 'text-slate-900' : 'text-cyan-200'}>
                Prof. Rômulo Pereira de Almeida
              </strong>{' '}
              e plataforma desenvolvida por{' '}
              <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>
                José Matheus dos Santos Neto
              </strong>.
            </p>

            {/* Author, Professor & LinkedIn Attribution Card */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-md space-y-3 ${
                isLightMode
                  ? 'bg-white/95 border-slate-200/90 shadow-sm'
                  : 'bg-slate-900/60 border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
                    JM
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        José Matheus dos Santos Neto
                      </span>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                        Autor do Portal &amp; Engenharia
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                      Criado em 19 de Outubro de 2026 · linkedin.com/in/jose-matheus-dos-santos-neto-a37974384
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl font-semibold text-xs border transition flex items-center gap-2 shrink-0 ${
                    isLightMode
                      ? 'bg-blue-50/90 hover:bg-blue-100 text-blue-900 border-blue-200 shadow-sm'
                      : 'bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border-blue-700/50 hover:text-white shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>Acessar LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

              {/* Credit to Prof. Rômulo Pereira de Almeida */}
              <div
                className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                  isLightMode ? 'border-slate-200 text-slate-700' : 'border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center font-extrabold text-cyan-700 dark:text-cyan-400 text-xs shrink-0">
                    RP
                  </div>
                  <div>
                    <span className="font-bold">Prof. Rômulo Pereira de Almeida</span>
                    <span className="mx-2 text-slate-400">·</span>
                    <span className={isLightMode ? 'text-slate-600' : 'text-slate-400'}>
                      Autor do Material de Estudos, Apostilas Técnicas, Guias de Laboratório &amp; Blueprints IAM
                    </span>
                  </div>
                </div>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold shrink-0">
                  Autoria Didática Oficial
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => onSelectTab('mod1')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Iniciar Trilha Completa
              </button>
              <button
                onClick={onOpenAcervo}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition flex items-center gap-2 cursor-pointer ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-cyan-500/30 hover:border-cyan-400/50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-cyan-500" /> Ver 25 Documentos
              </button>
            </div>
          </div>

          {/* Futuristic Cyber Shield Showcase Emblem - Visível e nítido em qualquer tema */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center w-full max-w-sm mx-auto lg:max-w-none">
            <div className={`relative group p-1.5 rounded-3xl border transition shadow-xl w-full ${
              isLightMode
                ? 'bg-white border-cyan-300/60 shadow-[0_4px_24px_rgba(6,182,212,0.15)]'
                : 'bg-gradient-to-b from-cyan-500/30 via-blue-500/10 to-indigo-500/20 border-cyan-500/35 shadow-[0_0_35px_rgba(6,182,212,0.22)]'
            }`}>
              <div className="relative overflow-hidden rounded-2xl w-full cyber-img-box">
                <img
                  src="/assets/aistudio/Cybersecurity_shield_emblem_bann__20261024192254_8674da8a.jpg"
                  alt="Cybersecurity Shield Emblem"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-2xl transition duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="cyber-img-overlay" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono font-bold shadow-lg ${
                    isLightMode
                      ? 'bg-white/90 border-cyan-300 text-cyan-800'
                      : 'bg-slate-900/85 border-cyan-500/40 text-cyan-300'
                  }`}>
                    <Shield className="w-3.5 h-3.5 text-cyan-500" />
                    DEFESA ATIVA · BRASÃO OFICIAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      {/* Quick Metrics Cards - Futuristic Telemetry HUD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hud-panel rounded-2xl p-4 sm:p-5 transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Docs Catalogados</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            25
          </p>
          <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mt-1.5 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 20 Apostilas/Blueprints + 5 Labs
          </p>
        </div>

        <div className="hud-panel rounded-2xl p-4 sm:p-5 transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Frameworks</span>
            <GitFork className="w-4 h-4 text-blue-400" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            NIST 2.0
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">SP 800-61r3, CIS &amp; Zero Trust</p>
        </div>

        <div className="hud-panel rounded-2xl p-4 sm:p-5 transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Laboratórios</span>
            <Wrench className="w-4 h-4 text-purple-400" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            6 Labs
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Wireshark, NetSim, SOC &amp; H1</p>
        </div>

        <div className="hud-panel rounded-2xl p-4 sm:p-5 transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Casos Práticos</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold mt-2 font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            3 Casos
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Aurora Dist., Horizonte &amp; AWS</p>
        </div>
      </div>

      {/* Gráfico de Radar Interativo (Recharts) de Proficiência nos 6 Módulos */}
      <SecurityRadarChart
        isLightMode={isLightMode}
        onNavigateModule={(modId) => onSelectTab(modId)}
      />

      {/* Novas Atualizações Oficiais do Acervo Técnico: 7 Novos Materiais */}
      <div
        className={`rounded-3xl p-6 sm:p-7 border relative overflow-hidden backdrop-blur-xl transition-all ${
          isLightMode
            ? 'bg-gradient-to-br from-cyan-50/60 via-white to-blue-50/40 border-cyan-200/80 shadow-[0_4px_24px_-4px_rgba(6,182,212,0.08)]'
            : 'bg-gradient-to-br from-[#070e22] via-[#091228] to-[#0d1633] border-cyan-500/25 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)]'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-bold tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Novas Atualizações do Acervo Técnico (Outubro / 2026)</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              7 Novos Materiais Didáticos &amp; Blueprints de Identidades
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Conteúdo oficial elaborado pelo <strong className={isLightMode ? 'text-slate-900' : 'text-cyan-200'}>Prof. Rômulo Pereira de Almeida</strong> com arquivos PDF originais para download e leitura interativa.
            </p>
          </div>

          <button
            onClick={onOpenAcervo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md shadow-cyan-600/20 shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Abrir Leitor de PDFs no Acervo</span>
          </button>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Pillar 1: Federação & SSO */}
          <div
            className={`p-4 rounded-2xl border transition flex flex-col justify-between group ${
              isLightMode
                ? 'bg-white/90 border-slate-200 shadow-sm'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div>
              {/* Image Banner */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-blue-500/25 cyber-img-box">
                <img
                  src="/assets/aistudio/Digital_identity_federation_arch__20261024192228_da215ae9.jpg"
                  alt="Federação de Identidades & SSO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="cyber-img-overlay" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-950/80 backdrop-blur-md text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                  Docs #19 e #20
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">
                  Federação &amp; Tokens
                </span>
                <span className="text-slate-500 font-semibold">42 páginas / slides</span>
              </div>
              <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Federação de Identidades &amp; SSO
              </h4>
              <p className={`text-xs mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                SAML 2.0 (Assertions, IdP vs SP), OpenID Connect (OIDC, Tokens JWT), SCIM 2.0 e Políticas de Acesso Condicional adaptativo.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <a
                href="/assets/aistudio/Material_Didatico_IAM_Federacao_SSO_JJ_eb59222b.pdf"
                download
                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] flex items-center gap-1 transition shadow-sm"
              >
                <span>Baixar Apostila (27p)</span>
              </a>
              <a
                href="/assets/aistudio/Blueprint_de_Federa__o_e_SSO_0396ad34.pdf"
                download
                className={`px-2.5 py-1 rounded-lg border font-semibold text-[10px] flex items-center gap-1 transition ${
                  isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span>Blueprint (15s)</span>
              </a>
            </div>
          </div>

          {/* Pillar 2: Identidades Não Humanas (NHI) */}
          <div
            className={`p-4 rounded-2xl border transition flex flex-col justify-between group ${
              isLightMode
                ? 'bg-white/90 border-slate-200 shadow-sm'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div>
              {/* Image Banner */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-emerald-500/25 cyber-img-box">
                <img
                  src="/assets/aistudio/Non-Human_Identities_communicati__20261024192236_15372edd.jpg"
                  alt="Identidades Não Humanas (NHI)"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="cyber-img-overlay" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  Docs #21, #22 e #23
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  Governança WIF
                </span>
                <span className="text-slate-500 font-semibold">67 páginas / slides</span>
              </div>
              <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Identidades Não Humanas (NHI)
              </h4>
              <p className={`text-xs mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Service Accounts, APIs, Tokens, Workload Identity Federation (WIF), eliminação de credenciais estáticas e 5 microtarefas práticas resolvidas.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <a
                href="/assets/aistudio/Material_Didatico_IAM_Identidades_Nao_Humanas_JJ_c94eac27.pdf"
                download
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] flex items-center gap-1 transition shadow-sm"
              >
                <span>Apostila (27p)</span>
              </a>
              <a
                href="/assets/aistudio/Blueprint_de_Identidades_N_o_Humanas__1__ff4d6dd2.pdf"
                download
                className={`px-2.5 py-1 rounded-lg border font-semibold text-[10px] flex items-center gap-1 transition ${
                  isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span>Blueprint</span>
              </a>
              <a
                href="/assets/aistudio/organized_fac73fe4.pdf"
                download
                className={`px-2.5 py-1 rounded-lg border font-semibold text-[10px] flex items-center gap-1 transition ${
                  isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span>Casos Práticos (25s)</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: Gestão de Credenciais & Cofres */}
          <div
            className={`p-4 rounded-2xl border transition flex flex-col justify-between group ${
              isLightMode
                ? 'bg-white/90 border-slate-200 shadow-sm'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div>
              {/* Image Banner */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-rose-500/25 cyber-img-box">
                <img
                  src="/assets/aistudio/Security_vault_with_storage_cells_20261024192539_1efd5503.jpg"
                  alt="Cofres de Segredos & Envelope Crypto"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="cyber-img-overlay" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-950/80 backdrop-blur-md text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                  Docs #24 e #25
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-rose-600 dark:text-rose-400 font-bold uppercase">
                  Cofres &amp; Crypto
                </span>
                <span className="text-slate-500 font-semibold">46 páginas / slides</span>
              </div>
              <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Cofres de Segredos &amp; Envelope Crypto
              </h4>
              <p className={`text-xs mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                HashiCorp Vault, AWS/Azure/GCP Secrets, Dynamic Secrets efêmeros, Rotação Zero-Downtime e Criptografia Envelope (DEK/KEK).
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <a
                href="/assets/aistudio/Material_Didatico_IAM_Gestao_Credenciais_Cofres_Segredos_JJ_9d93122d.pdf"
                download
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[10px] flex items-center gap-1 transition shadow-sm"
              >
                <span>Baixar Apostila (31p)</span>
              </a>
              <a
                href="/assets/aistudio/Gest_o_de_Credenciais_e_Segredos_7539a3c4.pdf"
                download
                className={`px-2.5 py-1 rounded-lg border font-semibold text-[10px] flex items-center gap-1 transition ${
                  isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span>Blueprint (15s)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid dos 6 Módulos em Ordem Didática */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
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
                className="hud-panel rounded-2xl p-4 sm:p-5 cursor-pointer group flex flex-col justify-between transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_8px_30px_-6px_rgba(6,182,212,0.15)]"
              >
                <div>
                  {/* Module Image Preview Card */}
                  <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3.5 border border-slate-700/40 group-hover:border-cyan-500/40 transition cyber-img-box">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="cyber-img-overlay" />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-[10px] font-mono text-cyan-400 font-bold border border-cyan-500/30">
                      {m.num}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-wider">
                      {m.num}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">{m.docs}</span>
                  </div>

                  <h3 className={`text-base font-bold group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition flex items-center gap-2.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                    <span>{m.title}</span>
                  </h3>

                  <p className={`text-xs mt-2.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {m.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition ${isLightMode ? 'border-slate-200 text-slate-700' : 'border-slate-800/80 text-slate-300'}`}>
                  <span>{m.actionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atalhos Rápidos para os Laboratórios Práticos - Clean Futuristic HUD */}
      <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition ${
        isLightMode
          ? 'bg-white/95 border-slate-200/90 shadow-sm'
          : 'bg-[#070d1e]/80 border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <Wrench className="w-5 h-5 text-cyan-500" />
            <span>Laboratórios Práticos &amp; Simuladores Interativos</span>
          </h3>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold hidden sm:inline">
            6 Laboratórios em Tempo Real
          </span>
        </div>
        <p className={`text-xs mb-6 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
          Ferramentas interativas desenvolvidas para reproduzir cenários corporativos reais executados durante a formação:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => {
              onSelectTab('mod1');
              setTimeout(() => onScrollToElement('sim-cia'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-blue-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-blue-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center mb-2.5">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className={`text-xs font-bold group-hover:text-blue-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Lab Tríade CIA
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Classifique violações reais em Confidencialidade, Integridade e Disponibilidade.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod2');
              setTimeout(() => onScrollToElement('sim-alt042'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-cyan-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-cyan-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-2.5">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
            </div>
            <div className={`text-xs font-bold group-hover:text-cyan-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Triagem Alerta ALT-042
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Simulador SOC com contenção, tokens OAuth2 e regra de e-mail maliciosa.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod4');
              setTimeout(() => onScrollToElement('sim-wireshark'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-purple-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-purple-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center mb-2.5">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className={`text-xs font-bold group-hover:text-purple-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Dissecador Wireshark v4.6
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Inspeção de pacotes reais QUIC (HTTP/3 KP0) e ICMPv6 Neighbor Discovery.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod5');
              setTimeout(() => onScrollToElement('sim-netsim'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-emerald-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-emerald-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-2.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div className={`text-xs font-bold group-hover:text-emerald-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Terminal Firewall NetSim
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Simule pacotes antes e depois do Hardening iptables stateful conntrack.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod5');
              setTimeout(() => onScrollToElement('sim-bruteforce'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-rose-50/60 hover:bg-rose-100/80 border-rose-200 hover:border-rose-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-rose-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center mb-2.5">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
            <div className={`text-xs font-bold group-hover:text-rose-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Lab Ataque Brute Force &amp; Mitigação
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Inspecione logs auth.log e aplique regras de firewall iptables DROP.
            </p>
          </div>

          <div
            onClick={() => {
              onSelectTab('mod6');
              setTimeout(() => onScrollToElement('sim-iam'), 150);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition group ${
              isLightMode
                ? 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-cyan-400'
                : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-cyan-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-2.5">
              <KeyRound className="w-4 h-4 text-cyan-400" />
            </div>
            <div className={`text-xs font-bold group-hover:text-cyan-500 transition ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Validador SoD &amp; RBAC
            </div>
            <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Teste autorizações e segregação de funções entre perfis conflitantes.
            </p>
          </div>

          <div
            onClick={() => onSelectTab('mod6')}
            className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition group sm:col-span-2 lg:col-span-3 ${
              isLightMode
                ? 'bg-gradient-to-r from-cyan-50/70 via-white to-blue-50/50 border-cyan-200 hover:border-cyan-400 shadow-sm'
                : 'bg-gradient-to-r from-[#071024] via-slate-900 to-[#0e1633] border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className={`text-xs sm:text-sm font-bold group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <span>Motor de Decisão Híbrido H1 (RBAC + ABAC)</span>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                      PEP · PDP · PIP · PAP
                    </span>
                  </div>
                  <p className={`text-[11px] mt-0.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Avaliação contextual em tempo real com Matriz de Testes T1 a T10 e os 8 casos da Empresa Horizonte.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition hidden sm:block shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  UserCheck,
  KeyRound,
  Shield,
  Fingerprint,
  Smartphone,
  Lock,
  RotateCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Layers,
  Cpu,
  Database,
  Sliders,
  Play,
  RotateCcw,
  GitBranch,
  BookOpen,
  ArrowRight,
  Clock,
  Laptop,
  FolderLock,
  Terminal,
  FileCheck,
  Network
} from 'lucide-react';
import {
  rbacMatrixOfficial,
  abacAttributesDictionary,
  testCasesH1Data,
  practiceCases8Data,
  TestCaseT,
  PracticeCase8
} from '../data/modulesData';
import { SSOView } from './iam/SSOView';
import { NHIView } from './iam/NHIView';
import { SecretsVaultView } from './iam/SecretsVaultView';

interface Module6ViewProps {
  isLightMode?: boolean;
}

export const Module6View: React.FC<Module6ViewProps> = ({ isLightMode = false }) => {
  // Main sub-tabs within Module 6
  const [subTab, setSubTab] = useState<
    'fundamentos' | 'rbac' | 'abac' | 'arquitetura' | 'lab_h1' | 'pratica16' | 'sso' | 'nhi' | 'secrets'
  >('lab_h1');

  // Interactive SoD role test state (from previous)
  const [selectedRole, setSelectedRole] = useState<'solicitante' | 'aprovador' | 'admin'>('solicitante');
  const [selectedAction, setSelectedAction] = useState<string>('criar_compra');

  // Interactive H1 Engine Simulator State
  const [simRole, setSimRole] = useState<'Editor' | 'Auditor' | 'Leitor' | 'Revisor'>('Editor');
  const [simSubjectActive, setSimSubjectActive] = useState<boolean>(true);
  const [simSubjectProjects, setSimSubjectProjects] = useState<string[]>(['Atlas']);
  const [simDocProject, setSimDocProject] = useState<string>('Atlas');
  const [simDocClass, setSimDocClass] = useState<'interno' | 'restrito'>('interno');
  const [simManagedDevice, setSimManagedDevice] = useState<boolean>(true);
  const [simReqTime, setSimReqTime] = useState<string>('14:00'); // Valid window: [09:00, 17:00)
  const [simAction, setSimAction] = useState<'ler' | 'excluir' | 'enviar' | 'revisar'>('ler');
  const [simMissingProject, setSimMissingProject] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('T1');

  // Practice Cases (Page 16) State
  const [selectedPracticeCase, setSelectedPracticeCase] = useState<PracticeCase8>(practiceCases8Data[0]);
  const [practiceAnswer, setPracticeAnswer] = useState<'Permitir' | 'Negar' | null>(null);

  // Apply a Preset from T1-T10
  const applyPreset = (test: TestCaseT) => {
    setActivePreset(test.id);
    switch (test.id) {
      case 'T1': // Ideal
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T2': // Somente Auditor
        setSimRole('Auditor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T3': // Projeto Boreal
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Boreal');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T4': // Restrito
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('restrito');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T5': // Dispositivo não gerenciado
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(false);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T6': // 09:00 Exato (Inclusivo)
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('09:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T7': // 17:00 Exato (Exclusivo)
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('17:00');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T8': // Atributo Ausente
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('ler');
        setSimMissingProject(true);
        break;
      case 'T9': // 08:59 (Antes do início)
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('08:59');
        setSimAction('ler');
        setSimMissingProject(false);
        break;
      case 'T10': // Excluir
        setSimRole('Editor');
        setSimSubjectActive(true);
        setSimSubjectProjects(['Atlas']);
        setSimDocProject('Atlas');
        setSimDocClass('interno');
        setSimManagedDevice(true);
        setSimReqTime('14:00');
        setSimAction('excluir');
        setSimMissingProject(false);
        break;
    }
  };

  // Evaluate H1 Logic in real-time
  const evalRbac = (role: string, action: string): boolean => {
    const row = rbacMatrixOfficial.find(
      (r) => r.action.toLowerCase() === (action === 'ler' ? 'ler documento' : action === 'excluir' ? 'excluir documento' : action === 'enviar' ? 'enviar versão' : 'registrar revisão')
    );
    if (!row) return false;
    if (role === 'Editor') return row.editor;
    if (role === 'Leitor') return row.leitor;
    if (role === 'Revisor') return row.revisor;
    if (role === 'Auditor') return row.auditor;
    return false;
  };

  const rbacGranted = evalRbac(simRole, simAction);

  // ABAC A1 Rule conditions (for 'ler'):
  // 1. sujeito.tipo = pessoa e sujeito.ativo = verdadeiro
  const cond1 = simSubjectActive;
  // 2. acao = ler e recurso.tipo = documento
  const cond2 = simAction === 'ler';
  // 3. recurso.classificacao = interno
  const cond3 = simDocClass === 'interno';
  // 4. recurso.projeto pertence a sujeito.projetos (and not missing)
  const cond4 = !simMissingProject && simSubjectProjects.includes(simDocProject);
  // 5. contexto.dispositivo_gerenciado = verdadeiro
  const cond5 = simManagedDevice;
  // 6. sujeito.inicio <= contexto.agora < sujeito.fim ([09:00, 17:00))
  // Parse hours
  const parseHour = (hStr: string) => {
    const [h, m] = hStr.split(':').map(Number);
    return h * 60 + m;
  };
  const reqMin = parseHour(simReqTime);
  const startMin = 9 * 60; // 09:00
  const endMin = 17 * 60; // 17:00
  const cond6 = reqMin >= startMin && reqMin < endMin;

  const abacA1Granted = cond1 && cond2 && cond3 && cond4 && cond5 && cond6;
  const hybridH1Granted = rbacGranted && abacA1Granted;

  // SoD Role configs for old tab
  const roleConfigs = {
    solicitante: {
      title: 'Solicitante de Compras (Perfil Operacional)',
      userTag: 'setor.compras@empresa.com',
      authn: 'Autenticado via Passkey FIDO2 (Fator Biométrico + Chave Hardware)',
      allowedActions: ['criar_compra', 'consultar_pedidos'],
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    aprovador: {
      title: 'Aprovador Financeiro (Gestor de Alçadas)',
      userTag: 'gestao.financeira@empresa.com',
      authn: 'Autenticado via Passkey FIDO2 + Verificação de Origem',
      allowedActions: ['aprovar_compra', 'consultar_pedidos'],
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    admin: {
      title: 'Administrador Técnico de TI (Infraestrutura / PAM)',
      userTag: 'admin.infra@empresa.com',
      authn: 'Autenticado com Credencial Privilegiada Nominal + MFA',
      allowedActions: ['gerenciar_usuarios', 'consultar_pedidos'],
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    }
  };

  const currentRole = roleConfigs[selectedRole];
  const isSodAllowed = currentRole.allowedActions.includes(selectedAction);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header with IAM Federation Showcase */}
      <div
        className={`relative rounded-2xl overflow-hidden border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
          isLightMode
            ? 'bg-gradient-to-r from-rose-50/90 via-white to-indigo-50/70 border-rose-200 shadow-sm'
            : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/30 border-rose-500/25 shadow-lg'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-mono uppercase">
            <UserCheck className="w-4 h-4" />
            <span>Módulo 06 • Documentos #09, #10, #11, #17 a #25 (Trilha Completa de IAM, SSO, NHI &amp; Cofres)</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            IAM Blueprint: Autorização, Federação SSO, NHI &amp; Cofres de Segredos
          </h2>
          <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Materiais didáticos oficiais do <strong>Prof. Rômulo Pereira de Almeida</strong>. Do modelo <strong>RBAC / ABAC</strong> e motor híbrido H1 à <strong>Federação SAML 2.0 / OIDC</strong>, <strong>Identidades Não Humanas (NHI)</strong> e <strong>Cofres de Segredos com Criptografia Envelope</strong>.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-56 h-36 rounded-xl overflow-hidden border border-rose-500/30 shadow-md relative group cyber-img-box">
          <img
            src="/assets/aistudio/Digital_identity_federation_arch__20261024192228_da215ae9.jpg"
            alt="IAM and Digital Identity Federation"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="cyber-img-overlay" />
          <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            isLightMode ? 'bg-white/90 text-rose-900 border-rose-200' : 'bg-slate-950/80 text-rose-300 border-rose-500/30'
          }`}>
            IAM · SSO · NHI · Cofres
          </span>
        </div>
      </div>

      {/* Sub-navigation Tabs - Futuristic Segmented HUD */}
      <div className="flex flex-wrap gap-2 border-b border-cyan-500/15 pb-3">
        {[
          { id: 'lab_h1', label: 'Laboratório: Motor Híbrido H1', icon: Cpu, badge: 'Interativo' },
          { id: 'sso', label: 'Federação & SSO (Docs #19-#20)', icon: Network, badge: 'Novo' },
          { id: 'nhi', label: 'Identidades Não Humanas (Docs #21-#23)', icon: Cpu, badge: 'Novo' },
          { id: 'secrets', label: 'Cofres & Segredos (Docs #24-#25)', icon: Lock, badge: 'Novo' },
          { id: 'rbac', label: 'Modelagem RBAC & Matriz', icon: Layers },
          { id: 'abac', label: 'ABAC Dinâmico & Dicionário', icon: Sliders },
          { id: 'arquitetura', label: 'Arquitetura PEP/PDP/PIP/PAP', icon: GitBranch },
          { id: 'pratica16', label: 'Simulador 8 Casos (Prática)', icon: FileCheck },
          { id: 'fundamentos', label: 'Fundamentos, MFA & SoD', icon: Fingerprint }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25 border border-cyan-400/30'
                  : isLightMode
                  ? 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  · {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: LABORATÓRIO INTERATIVO: MOTOR DE DECISÃO HÍBRIDO H1 (RBAC + ABAC)  */}
      {/* ========================================================================= */}
      {subTab === 'lab_h1' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-2 border-rose-500/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">
                  LABORATÓRIO CENTRAL • NIST SP 800-162 / SP 800-205
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Motor de Decisão Híbrido H1 = Permissão RBAC + Contexto ABAC (A1)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 block">Fórmula de Avaliação:</span>
                <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  H1 = Matriz[Papel, Ação] ∧ Política_A1(Sujeito, Recurso, Contexto)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O ponto de decisão (<strong>PDP</strong>) avalia a solicitação em duas etapas complementares: primeiro verifica se o papel técnico concede a operação na <strong>Matriz RBAC</strong>; em seguida, consulta o <strong>PIP</strong> para auditar os atributos situacionais contra a <strong>Regra ABAC A1</strong>.
            </p>

            {/* Presets de Teste Oficiais (T1 a T10) */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-2">
                Casos de Teste Oficiais da Matriz T1 a T10 (Clique para carregar no motor):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {testCasesH1Data.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => applyPreset(tc)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition cursor-pointer flex flex-col justify-between ${
                      activePreset === tc.id
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-600 dark:border-rose-500 text-slate-900 dark:text-white font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-rose-400 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{tc.id}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          tc.expected === 'Permitir'
                            ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                            : 'bg-red-500/20 text-red-800 dark:text-red-300'
                        }`}
                      >
                        {tc.expected}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate mt-1">
                      {tc.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuração Interativa da Solicitação */}
            <div className="grid md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80">
              {/* Painel do Sujeito e Papel */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> 1. Sujeito &amp; Papel RBAC
                </span>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Papel Atribuído (RBAC):</label>
                  <select
                    value={simRole}
                    onChange={(e) => {
                      setSimRole(e.target.value as any);
                      setActivePreset('Custom');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Editor">Editor (Lê e Envia versão)</option>
                    <option value="Revisor">Revisor (Lê e Registra revisão)</option>
                    <option value="Leitor">Leitor (Apenas Lê)</option>
                    <option value="Auditor">Auditor (Apenas Consulta Logs)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">Status do Vínculo (RH):</label>
                  <button
                    onClick={() => {
                      setSimSubjectActive(!simSubjectActive);
                      setActivePreset('Custom');
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                      simSubjectActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-950/70 border border-red-600 dark:border-red-500 text-red-800 dark:text-red-300'
                    }`}
                  >
                    {simSubjectActive ? '✔ Vínculo Ativo (sujeito.ativo = true)' : '✘ Vínculo Inativo / Suspenso'}
                  </button>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">Projetos Autorizados ao Usuário:</label>
                  <div className="flex gap-2">
                    {['Atlas', 'Boreal', 'Ceres'].map((proj) => {
                      const isAuth = simSubjectProjects.includes(proj);
                      return (
                        <button
                          key={proj}
                          onClick={() => {
                            if (isAuth) {
                              setSimSubjectProjects(simSubjectProjects.filter((p) => p !== proj));
                            } else {
                              setSimSubjectProjects([...simSubjectProjects, proj]);
                            }
                            setActivePreset('Custom');
                          }}
                          className={`flex-1 py-1 rounded text-[11px] font-mono transition cursor-pointer ${
                            isAuth
                              ? 'bg-cyan-500/20 border-2 border-cyan-600 dark:border-cyan-500 text-cyan-900 dark:text-cyan-300 font-bold'
                              : 'bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                          }`}
                        >
                          {proj}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Painel do Recurso e Ação */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <FolderLock className="w-4 h-4" /> 2. Recurso &amp; Ação Solicitada
                </span>

                <div>
                  <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">Ação Solicitada:</label>
                  <select
                    value={simAction}
                    onChange={(e) => {
                      setSimAction(e.target.value as any);
                      setActivePreset('Custom');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="ler">ler (Ler documento D-27)</option>
                    <option value="enviar">enviar (Enviar nova versão)</option>
                    <option value="revisar">revisar (Registrar revisão)</option>
                    <option value="excluir">excluir (Excluir documento)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">Projeto do Documento:</label>
                  <div className="flex gap-2">
                    {['Atlas', 'Boreal'].map((proj) => (
                      <button
                        key={proj}
                        onClick={() => {
                          setSimDocProject(proj);
                          setSimMissingProject(false);
                          setActivePreset('Custom');
                        }}
                        className={`flex-1 py-1 rounded text-[11px] font-mono transition cursor-pointer ${
                          !simMissingProject && simDocProject === proj
                            ? 'bg-amber-500/20 border-2 border-amber-600 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                            : 'bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {proj}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-600 dark:text-slate-400">Classificação:</label>
                    <button
                      onClick={() => {
                        setSimMissingProject(!simMissingProject);
                        setActivePreset('Custom');
                      }}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition cursor-pointer ${
                        simMissingProject
                          ? 'bg-red-500/20 text-red-800 dark:text-red-300 font-bold border border-red-500/40'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {simMissingProject ? '⚠ Projeto Ausente!' : 'Simular Dado Ausente'}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {['interno', 'restrito'].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => {
                          setSimDocClass(cls as any);
                          setActivePreset('Custom');
                        }}
                        className={`flex-1 py-1 rounded text-[11px] font-mono capitalize transition cursor-pointer ${
                          simDocClass === cls
                            ? 'bg-purple-500/20 border-2 border-purple-600 dark:border-purple-500 text-purple-900 dark:text-purple-300 font-bold'
                            : 'bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Painel do Contexto e Horário */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> 3. Contexto &amp; Ambiente (PIP)
                </span>

                <div>
                  <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">Dispositivo Gerenciado (MDM):</label>
                  <button
                    onClick={() => {
                      setSimManagedDevice(!simManagedDevice);
                      setActivePreset('Custom');
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold font-mono transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      simManagedDevice
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-950/70 border border-red-600 dark:border-red-500 text-red-800 dark:text-red-300'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    {simManagedDevice ? 'Gerenciado (BitLocker/EDR OK)' : 'Dispositivo Não Gerenciado (BYOD)'}
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 text-[11px] text-slate-600 dark:text-slate-400">
                    <span>Horário da Requisição (NTP):</span>
                    <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">{simReqTime} (UTC-03)</span>
                  </div>
                  <input
                    type="time"
                    value={simReqTime}
                    onChange={(e) => {
                      setSimReqTime(e.target.value);
                      setActivePreset('Custom');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  />
                  <div className="text-[10px] text-slate-600 dark:text-slate-500 font-mono mt-1">
                    Janela Permitida A1: <span className="text-slate-900 dark:text-slate-300 font-semibold">[09:00, 17:00)</span> (Início inclusivo, fim exclusivo)
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex gap-1.5">
                    {['08:59', '09:00', '14:00', '17:00'].map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSimReqTime(time);
                          setActivePreset('Custom');
                        }}
                        className={`flex-1 py-1 rounded text-[10px] font-mono transition cursor-pointer ${
                          simReqTime === time
                            ? 'bg-amber-500/20 border-2 border-amber-600 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                            : 'bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Painel do Motor de Decisão (PDP / PEP) */}
            <div className="terminal-bg rounded-xl p-5 font-mono text-xs space-y-3 mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-white font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  MOTOR DE DECISÃO PDP — AVALIAÇÃO DE CONFORMIDADE EM TEMPO REAL
                </span>
                <span className="text-slate-400 text-[11px]">
                  Preset Atual: <span className="text-rose-400 font-bold">{activePreset}</span>
                </span>
              </div>

              {/* Avaliação das Camadas */}
              <div className="grid md:grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5 font-bold">
                    <span className="text-purple-400">1. AVALIAÇÃO RBAC (Matriz de Permissões):</span>
                    {rbacGranted ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CONCEDE
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> NÃO CONCEDE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    O papel <strong>{simRole}</strong> para a ação <strong>{simAction}</strong>:{' '}
                    {rbacGranted
                      ? 'Concede autorização técnica na matriz de papéis.'
                      : 'Ausência de concessão na matriz RBAC (Default Deny).'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5 font-bold">
                    <span className="text-cyan-400">2. AVALIAÇÃO ABAC (Política A1 &amp; Contexto):</span>
                    {abacA1Granted ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ATENDIDA
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> FALHOU
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] space-y-0.5 text-slate-400">
                    <div>• Vínculo Ativo: {cond1 ? '✔' : '✘ (sujeito inativo)'}</div>
                    <div>• Ação 'ler': {cond2 ? '✔' : '✘ (A1 é apenas para leitura)'}</div>
                    <div>• Classificação Interna: {cond3 ? '✔' : '✘ (classificação não permitida)'}</div>
                    <div>• Projeto no Escopo: {cond4 ? '✔' : simMissingProject ? '✘ (Regra de Ouro: Dado Ausente)' : '✘ (projeto não autorizado)'}</div>
                    <div>• Dispositivo Gerenciado: {cond5 ? '✔' : '✘ (dispositivo não gerenciado)'}</div>
                    <div>• Janela Temporal: {cond6 ? '✔' : '✘ (fora do intervalo [09:00, 17:00))'}</div>
                  </div>
                </div>
              </div>

              {/* Veredito Final do PEP */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  hybridH1Granted
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                    : 'bg-red-950/50 border-red-500 text-red-200'
                }`}
              >
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                    Decisão Final do Ponto de Aplicação (PEP):
                  </div>
                  <div className="text-lg font-extrabold flex items-center gap-2 mt-0.5">
                    {hybridH1Granted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300">ACESSO PERMITIDO (STATUS HTTP 200 OK)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">ACESSO NEGADO (STATUS HTTP 403 FORBIDDEN)</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {hybridH1Granted
                      ? 'Todas as condições do modelo híbrido H1 foram integralmente satisfeitas: papel técnico aprovado e validação situacional de atributos em conformidade.'
                      : !rbacGranted
                      ? `Bloqueado no primeiro filtro: o papel '${simRole}' não possui concessão para a ação '${simAction}' na matriz RBAC.`
                      : simMissingProject
                      ? 'Bloqueado por violação de integridade: o atributo obrigatório de projeto está ausente (Regra de Ouro: Ausente ≠ Permitido).'
                      : !cond3
                      ? 'Bloqueado pela política ABAC A1: a classificação do documento é restrita e requer regra de autorização específica.'
                      : !cond4
                      ? `Bloqueado por violação de escopo: o documento pertence ao projeto '${simDocProject}', mas o sujeito só tem autorização em {${simSubjectProjects.join(', ')}}.`
                      : !cond5
                      ? 'Bloqueado pela postura do dispositivo: o endpoint não é gerenciado pelo MDM corporativo.'
                      : !cond6
                      ? `Bloqueado por restrição temporal: o horário ${simReqTime} está fora da validade permitida [09:00 às 17:00).`
                      : 'Bloqueado pelo motor de decisão por não atender aos requisitos da política.'}
                  </p>
                </div>

                <div className="text-right font-mono text-[11px] text-slate-400">
                  <div>Trilha: AuditLog_H1</div>
                  <div className="text-slate-500">Hash: 8f4a..c91e</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: MODELAGEM RBAC & MATRIZ DE PERMISSÕES                             */}
      {/* ========================================================================= */}
      {subTab === 'rbac' && (
        <div className="space-y-6">
          {/* Matriz Oficial RBAC */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-rose-400" />
                  <span>Matriz de Permissões RBAC Oficial (Aulas 4 e 5)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Associação fundamental: <strong>Sujeito → Papel → Permissão</strong>. A ausência de marcação significa ausência de concessão (Default Deny).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-4">Ação / Operação no Recurso</th>
                    <th className="py-3 px-4 text-center">Leitor</th>
                    <th className="py-3 px-4 text-center">Editor</th>
                    <th className="py-3 px-4 text-center">Revisor</th>
                    <th className="py-3 px-4 text-center">Auditor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono">
                  {rbacMatrixOfficial.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition">
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.action}</td>
                      <td className="py-3 px-4 text-center">
                        {row.leitor ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Sim</span>
                        ) : (
                          <span className="text-slate-600">Não</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.editor ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Sim</span>
                        ) : (
                          <span className="text-slate-600">Não</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.revisor ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Sim</span>
                        ) : (
                          <span className="text-slate-600">Não</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.auditor ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Sim</span>
                        ) : (
                          <span className="text-slate-600">Não</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-400 font-mono block">Diretrizes de Leitura da Matriz (Pág. 5):</strong>
              <p>• <strong>Leia por coluna:</strong> para auditar se cada papel possui apenas o estritamente necessário (Menor Privilégio).</p>
              <p>• <strong>Leia por linha:</strong> para conferir quais sujeitos têm capacidade de executar cada operação.</p>
              <p>• <strong>Auditor independente:</strong> consultar evidências de logs de auditoria NÃO concede o direito de ler o conteúdo sigiloso dos documentos!</p>
            </div>
          </div>

          {/* Três Conceitos Críticos de RBAC */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="glass-card rounded-2xl p-5 space-y-2 border-t-4 border-t-blue-500">
              <h4 className="font-bold text-white text-sm">Papel ≠ Cargo</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Um cargo como <em>&ldquo;Analista&rdquo;</em> é genérico de RH. Duas pessoas com o mesmo cargo podem ter responsabilidades totalmente distintas no sistema. Permissões devem ser associadas a papéis funcionais (Leitor, Editor, Revisor), não a títulos de cargos.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2 border-t-4 border-t-purple-500">
              <h4 className="font-bold text-white text-sm">Papel ≠ Grupo de Rede</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                O nome de um grupo de diretório (ex.: <code>Equipe Atlas</code>) é um agrupador de rede, mas não informa sozinho quais permissões o sistema concede. A associação técnica efetiva entre papéis e permissões deve ser verificada diretamente na aplicação.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2 border-t-4 border-t-amber-500">
              <h4 className="font-bold text-white text-sm">O Risco da Explosão de Papéis</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Se cada combinação de projeto, região, horário e classificação virar um papel estático (ex.: <em>Editor-Atlas-Manhã</em>, <em>Editor-Boreal-Tarde</em>), o catálogo explode e torna-se inadministrável. É o sinal claro de que a regra deve migrar para <strong>ABAC</strong>.
              </p>
            </div>
          </div>

          {/* Hierarquia de Papéis e SoD */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-rose-400" />
              <span>Hierarquia de Papéis &amp; Segregação de Funções (SoD)</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 font-mono block">Hierarquia Técnica (Slide 6):</span>
                <p>
                  Papéis superiores herdam permissões da base: <strong>Editor herda Leitor</strong> (leitura + envio); <strong>Revisor herda Leitor</strong> (leitura + registro de revisão).
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Cuidado Mandatório:</strong> Hierarquia técnica NÃO deve copiar o organograma da empresa! Um gerente não precisa e não deve herdar os privilégios técnicos operacionais de seus subordinados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 font-mono block">Prevenção de Autorrevisão (SoD por Operação):</span>
                <p>
                  SoD distribui atividades incompatíveis. Para impedir que um colaborador revise a versão que ele próprio produziu, o sistema precisa comparar o <code>autor_versao</code> com o <code>revisor_versao</code> no momento da transação.
                </p>
                <p className="text-slate-400 text-[11px]">
                  Apenas possuir o papel Revisor não resolve essa condição, e usar duas contas diferentes da mesma pessoa também viola a independência requerida.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: ABAC DINÂMICO & DICIONÁRIO DE ATRIBUTOS                           */}
      {/* ========================================================================= */}
      {subTab === 'abac' && (
        <div className="space-y-6">
          {/* Introdução ao ABAC */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>ABAC: Avaliação Dinâmica Baseada em Atributos (NIST SP 800-162)</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                Padrão SP 800-162 / 800-205
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O ABAC avalia características específicas em tempo real do <strong>Sujeito</strong>, do <strong>Recurso</strong>, da <strong>Operação</strong> e do <strong>Ambiente/Contexto</strong>. Elimina a necessidade de multiplicar papéis estáticos e viabiliza decisões granulares de segurança.
            </p>

            {/* Dicionário de Atributos */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Nome do Atributo</th>
                    <th className="py-2.5 px-3">Categoria</th>
                    <th className="py-2.5 px-3">Tipo / Formato</th>
                    <th className="py-2.5 px-3">Origem Responsável (PIP)</th>
                    <th className="py-2.5 px-3">Finalidade na Decisão</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {abacAttributesDictionary.map((attr, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {attr.name}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                          {attr.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {attr.type}
                      </td>
                      <td className="py-2.5 px-3 text-amber-300 text-xs">
                        {attr.source}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 text-xs min-w-[200px]">
                        {attr.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* A Regra de Ouro da Integridade */}
          <div className="glass-card rounded-2xl p-6 border-2 border-red-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>A Regra de Ouro da Integridade: Ausente ≠ Permitido (Slide 8 e Pág. 8)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Um atributo obrigatório ausente, inválido ou considerado desatualizado <strong>impede a concessão e resulta em negação automática (Fail-Closed)</strong>. A arquitetura de segurança <strong>nunca deve preencher falhas técnicas com a opção mais permissiva</strong>!
            </p>
          </div>

          {/* Sintaxe da Política ABAC A1 */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>Sintaxe da Política ABAC Didática: Regra A1 (Pág. 9)</span>
            </h3>
            <div className="terminal-bg rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-emerald-400 font-bold">
                PERMITIR leitura de documento SOMENTE SE todas as condições forem verdadeiras:
              </div>
              <div className="pl-4 space-y-1 text-slate-200">
                <div>1. sujeito.tipo == &quot;pessoa&quot; <strong>E</strong> sujeito.ativo == verdadeiro</div>
                <div>2. acao == &quot;ler&quot; <strong>E</strong> recurso.tipo == &quot;documento&quot;</div>
                <div>3. recurso.classificacao == &quot;interno&quot;</div>
                <div>4. recurso.projeto ∈ sujeito.projetos</div>
                <div>5. contexto.dispositivo_gerenciado == verdadeiro</div>
                <div>6. sujeito.inicio ≤ contexto.agora &lt; sujeito.fim</div>
              </div>
              <div className="text-red-400 font-bold pt-1">
                CASO CONTRÁRIO: NEGAR. (Atributos obrigatórios devem estar presentes e válidos).
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <strong className="text-amber-300">Atenção Técnica:</strong> O conector lógico <strong>E</strong> exige o cumprimento de todas as condições conjuntamente. Trocar <code>E</code> por <code>OU</code> entre &ldquo;vínculo ativo&rdquo; e &ldquo;mesmo projeto&rdquo; anularia a segurança do sistema! Além disso, <em>ações não se transferem por semelhança</em>: permitir &ldquo;ler&rdquo; não autoriza &ldquo;exportar&rdquo; ou &ldquo;excluir&rdquo;.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: ARQUITETURA DO SISTEMA DE DECISÃO (PEP / PDP / PIP / PAP)          */}
      {/* ========================================================================= */}
      {subTab === 'arquitetura' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-cyan-400" />
                <span>A Arquitetura do Sistema de Decisão de Acesso (NIST SP 800-162)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Padrão XACML / Cloud IAM</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O controle de acesso moderno desacopla a regra de negócio da aplicação. Quatro componentes lógicos coordenam a decisão:
            </p>

            {/* Diagrama Visual dos 4 Componentes */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border-t-4 border-t-blue-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-blue-400">PEP</span>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded">Aplicação</span>
                </div>
                <h4 className="font-bold text-white text-xs">Policy Enforcement Point</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Ponto cego da interface. Intercepta a requisição do usuário ou API e bloqueia ou libera a execução conforme o veredito do PDP.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border-t-4 border-t-cyan-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-cyan-400">PDP</span>
                  <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded">Decisão</span>
                </div>
                <h4 className="font-bold text-white text-xs">Policy Decision Point</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Motor lógico central. Avalia a solicitação contra as políticas ativas usando os atributos em tempo real para responder <em>Permitir</em> ou <em>Negar</em>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border-t-4 border-t-purple-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-purple-400">PIP</span>
                  <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded">Informação</span>
                </div>
                <h4 className="font-bold text-white text-xs">Policy Information Point</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Banco de atributos e contexto consultado em tempo real (cadastro de RH, status no MDM, dono do projeto, relógio NTP).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border-t-4 border-t-emerald-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-emerald-400">PAP</span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded">Administração</span>
                </div>
                <h4 className="font-bold text-white text-xs">Policy Administration Point</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Ambiente onde as políticas são formalmente redigidas, auditadas, versionadas e publicadas pela equipe de governança.
                </p>
              </div>
            </div>

            {/* Convenção de Conflitos e Precedência */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 text-xs font-mono uppercase block">
                Convenção de Resolução de Conflitos e Precedência (Slide 10 e Pág. 10):
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Negação explícita sempre prevalece (Deny Overrides):</strong> se uma regra proibir e outra permitir, a decisão final é NEGAR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Sem negação, exige-se concessão explícita:</strong> na ausência de regra que autorize expressamente, a solicitação é negada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Falha no PIP resulta em bloqueio (Fail-Closed):</strong> se a fonte de atributos estiver offline ou indisponível, o sistema NÃO converte a falha em liberação silenciosa.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Comparativo RBAC vs ABAC vs Híbrido */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Comparativo e Síntese: RBAC vs ABAC vs Modelo Híbrido H1 (Slide 11)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Critério</th>
                    <th className="py-2.5 px-3">RBAC (Baseado em Papéis)</th>
                    <th className="py-2.5 px-3">ABAC (Baseado em Atributos)</th>
                    <th className="py-2.5 px-3">Modelo Híbrido H1 (Recomendado)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Base da Decisão</td>
                    <td className="py-2.5 px-3">Papéis e suas permissões estáticas</td>
                    <td className="py-2.5 px-3">Atributos avaliados por políticas</td>
                    <td className="py-2.5 px-3 font-bold text-cyan-300">Papel Técnico + Validação Situacional</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Aplicação Ideal</td>
                    <td className="py-2.5 px-3">Responsabilidades estáveis e repetidas</td>
                    <td className="py-2.5 px-3">Escopo e condições dinâmicas por recurso</td>
                    <td className="py-2.5 px-3 font-bold text-cyan-300">Ambientes corporativos complexos</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Risco Principal</td>
                    <td className="py-2.5 px-3 text-red-300">Acúmulo e explosão de papéis</td>
                    <td className="py-2.5 px-3 text-amber-300">Complexidade de regras e dependência de dados</td>
                    <td className="py-2.5 px-3 text-emerald-300">Equilibra simplicidade com menor privilégio</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 5: SIMULADOR DOS 8 CASOS PRÁTICOS (PÁGINA 16 DO MATERIAL)             */}
      {/* ========================================================================= */}
      {subTab === 'pratica16' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-2 border-cyan-500/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                  PRÁTICA GUIADA • PÁGINA 16 DO MATERIAL DIDÁTICO
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Resolução Interativa dos 8 Casos da Empresa Horizonte
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Regra: Consulta de relatórios internos da mesma unidade com dispositivo gerenciado
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Selecione qualquer uma das 8 solicitações para submetê-la ao motor e comparar a sua decisão com a justificativa técnica:
            </p>

            {/* Grid dos 8 Casos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {practiceCases8Data.map((caseItem) => {
                const isSelected = selectedPracticeCase.id === caseItem.id;
                return (
                  <button
                    key={caseItem.id}
                    onClick={() => {
                      setSelectedPracticeCase(caseItem);
                      setPracticeAnswer(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-50 dark:bg-cyan-600/25 border-2 border-cyan-600 dark:border-cyan-500 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="font-bold text-cyan-700 dark:text-cyan-400">CASO #{caseItem.id}</span>
                        <span className="text-slate-600 dark:text-slate-400">{caseItem.timeReq}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white mt-1">
                        {caseItem.subject} → {caseItem.reportId}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                        Unidade: {caseItem.userUnit} | Doc: {caseItem.reportUnit || 'Ausente!'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Painel de Análise do Caso Selecionado */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    Caso Selecionado: #{selectedPracticeCase.id}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {selectedPracticeCase.subject} solicitando consulta ao relatório {selectedPracticeCase.reportId}
                  </h4>
                </div>
                <div className="font-mono text-xs text-slate-400">
                  Horário: <strong className="text-white">{selectedPracticeCase.timeReq}</strong> (Janela: {selectedPracticeCase.validity})
                </div>
              </div>

              {/* Detalhes dos Atributos */}
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-mono text-[10px]">Atributos do Sujeito:</span>
                  <p className="text-white font-semibold mt-1">
                    Ativo: {selectedPracticeCase.active ? 'Sim' : 'Não'} | Unidade: {selectedPracticeCase.userUnit}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-mono text-[10px]">Atributos do Recurso:</span>
                  <p className="text-white font-semibold mt-1">
                    Unidade: {selectedPracticeCase.reportUnit || 'NULO/AUSENTE'} | Classificação: {selectedPracticeCase.reportClass}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-mono text-[10px]">Atributos de Contexto:</span>
                  <p className="text-white font-semibold mt-1">
                    Dispositivo Gerenciado: {selectedPracticeCase.managedDevice ? 'Sim' : 'Não'}
                  </p>
                </div>
              </div>

              {/* Interação: Qual a sua decisão? */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-300 block mb-2 font-semibold">
                  Qual é a decisão correta do motor de autorização?
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPracticeAnswer('Permitir')}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs font-mono transition cursor-pointer flex items-center justify-center gap-2 ${
                      practiceAnswer === 'Permitir'
                        ? 'bg-emerald-600 text-white keep-white'
                        : 'bg-white dark:bg-slate-950 border border-emerald-600/40 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Permitir Acesso
                  </button>
                  <button
                    onClick={() => setPracticeAnswer('Negar')}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs font-mono transition cursor-pointer flex items-center justify-center gap-2 ${
                      practiceAnswer === 'Negar'
                        ? 'bg-red-600 text-white keep-white'
                        : 'bg-white dark:bg-slate-950 border border-red-600/40 dark:border-slate-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <XCircle className="w-4 h-4" /> Negar Acesso
                  </button>
                </div>
              </div>

              {/* Resolução Explicada */}
              {practiceAnswer && (
                <div
                  className={`p-4 rounded-xl border text-xs font-mono space-y-1 ${
                    practiceAnswer === selectedPracticeCase.expected
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/40 border-red-500 text-red-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {practiceAnswer === selectedPracticeCase.expected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>SUA RESPOSTA ESTÁ CORRETA! (Decisão Esperada: {selectedPracticeCase.expected})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>RESPOSTA INCORRETA (Decisão Esperada: {selectedPracticeCase.expected})</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-200 font-sans mt-1 leading-relaxed">
                    <strong>Justificativa Técnica Oficial:</strong> {selectedPracticeCase.justification}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 6: FUNDAMENTOS IAM, MFA & VALIDADOR SoD (Conteúdo Consolidado)        */}
      {/* ========================================================================= */}
      {subTab === 'fundamentos' && (
        <div className="space-y-6">
          {/* Trindade da Identidade & AAA */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-rose-400" />
                <span>A Trindade da Identidade + Identificador Único (Doc #09)</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-rose-400 block font-mono">1. Identidade Digital:</span>
                  <p>
                    Representação digital de um ser humano ou de um <strong>serviço automatizado</strong> (como rotinas de integração de banco de dados ou APIs, que exigem responsável humano formalmente designado).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-cyan-400 block font-mono">2. Identificador Único vs Atributos:</span>
                  <p>
                    O identificador (ex.: <code>UID-10842</code>) é imutável e perene, mesmo se o nome, e-mail ou setor mudarem. Atributos são mutáveis (cargo, lotação, gestor imediato e status de vínculo).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-amber-400 block font-mono">3. Conta vs Credencial vs Autenticador:</span>
                  <p>
                    A <strong>Conta</strong> é o registro lógico no sistema que agrupa acessos; a <strong>Credencial</strong> é o dado que vincula a conta ao autenticador; o <strong>Autenticador</strong> é o instrumento físico ou lógico usado para provar a posse (senha, token TOTP, passkey FIDO2).
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <span>O Fluxo AAA: Autenticação (Authn) vs Autorização (Authz) vs Auditoria</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-emerald-400 block font-mono">Autenticação (Authn) — &ldquo;Quem é você?&rdquo;:</span>
                  <p>
                    Processo que valida criptograficamente se o solicitante possui e controla os autenticadores vinculados à conta. <em>Digitar apenas o nome de usuário é mera Identificação; o desafio de segurança é a Autenticação.</em>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-purple-400 block font-mono">Autorização (Authz) — &ldquo;O que você pode fazer?&rdquo;:</span>
                  <p>
                    Decide se a identidade previamente autenticada possui permissão para executar uma ação específica no contexto atual.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-bold text-blue-400 block font-mono">Accounting / Auditoria — &ldquo;O que aconteceu?&rdquo;:</span>
                  <p>
                    Registro indelével em log de auditoria tanto das tentativas com sucesso quanto das <strong>recusas de autorização</strong> (tentativas de violação de acesso), com timestamp NTP sincronizado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulador Interativo SoD & RBAC Tradicional */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">
              SIMULADOR DE GOVERNANÇA IAM • RBAC &amp; SoD
            </span>
            <h3 className="text-base font-bold text-white">
              Validador de Segregação de Funções (Compras &amp; Financeiro)
            </h3>

            <div className="grid sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedRole('solicitante')}
                className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedRole === 'solicitante'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                Solicitante
              </button>
              <button
                onClick={() => setSelectedRole('aprovador')}
                className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedRole === 'aprovador'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                Aprovador
              </button>
              <button
                onClick={() => setSelectedRole('admin')}
                className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                Admin Técnico TI
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">Ação a ser executada:</label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="criar_compra">Criar Nova Solicitação de Compra</option>
                <option value="aprovar_compra">Aprovar Pedido de Compra / Fornecedor</option>
                <option value="liberar_pagamento">Liberar Pagamento / Ordem Bancária</option>
                <option value="gerenciar_usuarios">Criar / Editar Contas de Usuários no AD</option>
                <option value="consultar_pedidos">Consultar Relatório de Pedidos</option>
              </select>
            </div>

            <div className="terminal-bg rounded-xl p-4 font-mono text-xs space-y-2">
              <div className="text-white font-bold flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span>// POLÍTICA SoD: {currentRole.title}</span>
                <span className="text-slate-400 text-[10px]">{currentRole.userTag}</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                <span className="text-cyan-400 font-bold">[AUTHN]: </span>
                {currentRole.authn}
              </div>
              {isSodAllowed ? (
                <div className="text-emerald-400 font-bold flex items-start gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>[AUTHZ - AUTORIZADO]: Ação permitida pelo modelo RBAC para esta função.</span>
                </div>
              ) : (
                <div className="text-red-400 font-bold flex items-start gap-1.5 pt-1">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>[AUTHZ - NEGADO POR SoD]: Ação bloqueada! Conflito de Segregação de Funções detectado.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA: FEDERAÇÃO & SINGLE SIGN-ON (DOCS #19 E #20)                          */}
      {/* ========================================================================= */}
      {subTab === 'sso' && <SSOView isLightMode={isLightMode} />}

      {/* ========================================================================= */}
      {/* ABA: IDENTIDADES NÃO HUMANAS (DOCS #21, #22 E #23)                        */}
      {/* ========================================================================= */}
      {subTab === 'nhi' && <NHIView isLightMode={isLightMode} />}

      {/* ========================================================================= */}
      {/* ABA: GESTÃO DE CREDENCIAIS & COFRES (DOCS #24 E #25)                      */}
      {/* ========================================================================= */}
      {subTab === 'secrets' && <SecretsVaultView isLightMode={isLightMode} />}
    </div>
  );
};

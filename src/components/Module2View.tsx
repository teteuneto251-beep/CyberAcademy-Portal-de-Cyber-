import React, { useState } from 'react';
import {
  ShieldAlert,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  Database,
  Lock,
  Search,
  Activity,
  FileText
} from 'lucide-react';
import { nistFunctionsData } from '../data/modulesData';

interface Module2ViewProps {
  isLightMode?: boolean;
}

export const Module2View: React.FC<Module2ViewProps> = ({ isLightMode = false }) => {
  // Simulator State for ALT-042
  const [revokedTokens, setRevokedTokens] = useState(false);
  const [accountSuspended, setAccountSuspended] = useState(false);
  const [ruleDeleted, setRuleDeleted] = useState(false);
  const [mfaEnforced, setMfaEnforced] = useState(false);
  const [triedOnlyPassword, setTriedOnlyPassword] = useState(false);

  const resetSimulation = () => {
    setRevokedTokens(false);
    setAccountSuspended(false);
    setRuleDeleted(false);
    setMfaEnforced(false);
    setTriedOnlyPassword(false);
  };

  const isContained = revokedTokens && accountSuspended;
  const isEradicated = isContained && ruleDeleted && mfaEnforced;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header with SOC Image Showcase */}
      <div
        className={`relative rounded-2xl overflow-hidden border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
          isLightMode
            ? 'bg-gradient-to-r from-cyan-50/90 via-white to-blue-50/70 border-cyan-200 shadow-sm'
            : 'bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/30 border-cyan-500/25 shadow-lg'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Módulo 02 • Documento #03 (4 - introducao_ciclo_defesa_alunos.pdf)</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Introdução ao Ciclo de Defesa, SOC &amp; NIST CSF 2.0
          </h2>
          <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Material do <strong>Prof. Rômulo Pereira de Almeida</strong> embasado no <strong>NIST CSF 2.0 (2024)</strong> e <strong>NIST SP 800-61 Rev. 3 (2025)</strong>: <em>prevenir não basta; é imperativo saber observar, investigar, conter, erradicar e recuperar</em>.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-56 h-36 rounded-xl overflow-hidden border border-cyan-500/30 shadow-md relative group cyber-img-box">
          <img
            src="/assets/aistudio/Cybersecurity_engineer_analyzing__20261024192147_fe89649e.jpg"
            alt="Cybersecurity Engineer SOC Telemetry"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="cyber-img-overlay" />
          <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            isLightMode ? 'bg-white/90 text-cyan-900 border-cyan-200' : 'bg-slate-950/80 text-cyan-300 border-cyan-500/30'
          }`}>
            Blue Team · Operações SOC
          </span>
        </div>
      </div>

      {/* As 6 Funções do NIST CSF 2.0 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>As 6 Funções Estratégicas do NIST CSF 2.0</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
            Atualização Oficial NIST 2024
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nistFunctionsData.map((f) => (
            <div
              key={f.code}
              className={`glass-card p-5 rounded-2xl border-t-4 flex flex-col justify-between ${
                f.color === 'amber'
                  ? 'border-t-amber-400'
                  : f.color === 'blue'
                  ? 'border-t-blue-400'
                  : f.color === 'emerald'
                  ? 'border-t-emerald-400'
                  : f.color === 'purple'
                  ? 'border-t-purple-400'
                  : f.color === 'red'
                  ? 'border-t-red-500'
                  : 'border-t-cyan-400'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono font-bold text-sm text-white">{f.code}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {f.namePt}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 mb-1.5">{f.question}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Exemplos Corporativos:
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  {f.practicalExamples.map((ex, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fontes de Logs e Telemetria (Seção 5 da Apostila) */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-400" />
          <span>DETECT: O Que Buscar em Cada Fonte de Logs (Seção 5 da Apostila)</span>
        </h3>
        <p className="text-xs text-slate-400">
          Nenhuma fonte isolada fornece a visão completa de um incidente. A correlação de eventos é o papel central do analista de SOC:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-4">Fonte de Logs</th>
                <th className="py-2.5 px-4">Pergunta Investigativa que Responde</th>
                <th className="py-2.5 px-4">Cuidado / Limitação Analítica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-400" /> Identidade &amp; Autenticação
                </td>
                <td className="py-3 px-4">
                  Houve login bem-sucedido? Qual conta, IP de origem, dispositivo, User-Agent e resultado do desafio de MFA?
                </td>
                <td className="py-3 px-4 text-amber-300 text-xs">
                  IP oriundo de VPN legítima ou viagem corporativa pode parecer suspeito sem sê-lo.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" /> Auditoria do E-mail (M365)
                </td>
                <td className="py-3 px-4">
                  Quem criou regra de encaminhamento externo, delegação de caixa postal ou regra de ocultação de mensagens?
                </td>
                <td className="py-3 px-4 text-amber-300 text-xs">
                  O comprometimento em nuvem ocorre mesmo sem nenhum malware ou processo malicioso no PC do usuário.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Endpoint / EDR
                </td>
                <td className="py-3 px-4">
                  Quais processos foram criados, hashes executados e conexões de rede locais foram abertas na máquina?
                </td>
                <td className="py-3 px-4 text-amber-300 text-xs">
                  Roubo de credenciais via phishing em navegador pessoal não gera alerta no antivírus do endpoint.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-400" /> DNS, Proxy &amp; Firewall
                </td>
                <td className="py-3 px-4">
                  Que domínio malicioso ou C2 foi consultado e quais portas/volumes de dados foram trafegados para a internet?
                </td>
                <td className="py-3 px-4 text-amber-300 text-xs">
                  Uma consulta de DNS isolada demonstra apenas resolução de nome, não comprova exfiltração efetiva de dados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SIMULADOR INTERATIVO: TRIAGEM DO ALERTA ALT-042 */}
      <div id="sim-alt042" className="glass-card rounded-2xl p-6 border-2 border-cyan-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
              LABORATÓRIO INTERATIVO SOC • SEÇÃO 6 DA APOSTILA
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Simulador SOC: Triagem do Alerta Didático{' '}
              <span className="font-mono text-amber-400">ALT-042</span>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-lg">
              Severidade: ALTA / CRÍTICA
            </span>
            <button
              onClick={resetSimulation}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title="Reiniciar Simulação"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Telemetria Bruta do Alerta */}
        <div className="terminal-bg rounded-xl p-4 font-mono text-xs space-y-1.5 text-slate-300">
          <div className="text-cyan-400 font-bold mb-2 flex items-center justify-between">
            <span>// TELEMETRIA DO ALERTA ALT-042 — SOC SEC-OPS CENTER</span>
            <span className="text-emerald-400">STATUS: EM INVESTIGAÇÃO</span>
          </div>
          <div>
            <span className="text-slate-500">Timestamp: </span> 24/09/2026, 09:15:22 (UTC-3)
          </div>
          <div>
            <span className="text-slate-500">Conta / Ativo: </span>{' '}
            <span className="text-amber-300 font-bold">analista.financeiro@empresa.com</span> (Acesso a Contas a Pagar e Conciliação Bancária)
          </div>
          <div>
            <span className="text-slate-500">Eventos Correlacionados: </span>{' '}
            <span className="text-red-400 font-bold">[09:12]</span> Login bem-sucedido em dispositivo não gerenciado |{' '}
            <span className="text-red-400 font-bold">[09:14]</span> Criação de regra de encaminhamento automático para e-mail externo
          </div>
          <div>
            <span className="text-slate-500">Endereço IP de Origem: </span>{' '}
            <span className="text-emerald-300 font-bold">203.0.113.24</span> (ASN Internacional não catalogado no perfil do usuário)
          </div>
          <div>
            <span className="text-slate-500">Postura da Conta: </span>{' '}
            <span className="text-red-400 font-bold">MFA NÃO HABILITADO</span> (Apenas senha estática legada)
          </div>
          <div>
            <span className="text-slate-500">Lacunas no Momento da Detecção: </span> Sem contato verbal prévio com o operador do financeiro; sem confirmação ainda de download de faturas.
          </div>
        </div>

        {/* Painel Interativo de Ações de Contenção & Erradicação */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
            Painel de Resposta a Incidentes (Playbook SOC):
          </h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Ação 1: Revogar sessões */}
            <button
              onClick={() => setRevokedTokens(true)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                revokedTokens
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">1. Revogar Sessões &amp; Tokens</div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                Invalida os tokens OAuth2 e desconecta sessões de navegador ativas na nuvem.
              </p>
              <div className="mt-2 text-[10px] font-mono font-semibold">
                {revokedTokens ? '✔ Tokens Revogados' : 'Clique para Executar'}
              </div>
            </button>

            {/* Ação 2: Suspender conta */}
            <button
              onClick={() => setAccountSuspended(true)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                accountSuspended
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">2. Suspender Conta Temporariamente</div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                Bloqueia novos logins imediatos enquanto a investigação e alinhamento ocorrem.
              </p>
              <div className="mt-2 text-[10px] font-mono font-semibold">
                {accountSuspended ? '✔ Conta Suspensa' : 'Clique para Executar'}
              </div>
            </button>

            {/* Ação 3: Excluir regra maliciosa */}
            <button
              onClick={() => setRuleDeleted(true)}
              disabled={!isContained}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                !isContained
                  ? 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : ruleDeleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 cursor-pointer shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-slate-700 cursor-pointer shadow-xs'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">3. Excluir Regra de E-mail</div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                Erradicação: remove o encaminhamento oculto criado para exfiltrar mensagens.
              </p>
              <div className="mt-2 text-[10px] font-mono font-semibold">
                {!isContained ? 'Bloqueado (Requer Contenção)' : ruleDeleted ? '✔ Regra Removida' : 'Clique para Excluir'}
              </div>
            </button>

            {/* Ação 4: Habilitar MFA */}
            <button
              onClick={() => setMfaEnforced(true)}
              disabled={!ruleDeleted}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                !ruleDeleted
                  ? 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : mfaEnforced
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 cursor-pointer shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-slate-700 cursor-pointer shadow-xs'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">4. Redefinir Senha &amp; Exigir MFA</div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                Recuperação: redefinição de credencial vinculada a autenticador FIDO2/Passkey.
              </p>
              <div className="mt-2 text-[10px] font-mono font-semibold">
                {!ruleDeleted ? 'Bloqueado (Requer Erradicação)' : mfaEnforced ? '✔ MFA Exigido' : 'Clique para Aplicar'}
              </div>
            </button>
          </div>

          {/* Pegadinha da Prova / Aviso Técnico Senior */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-300 block">
                Atenção Crítica de SOC (Item de Prova / Caso Aurora):
              </span>
              <p>
                Por que apenas alterar a senha ou bloquear o IP <code>203.0.113.24</code> no firewall da empresa <strong>NÃO</strong> é suficiente? Porque o Microsoft 365 opera em nuvem pública (fora da rede local), e os tokens de acesso OAuth2 gerados durante o login às 09:12 permanecem válidos em conexões estabelecidas até que sejam explicitamente <strong>revogados</strong> pela console de IAM!
              </p>
            </div>
          </div>

          {/* Feedback de Status do Incidente */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isEradicated
                    ? 'bg-emerald-400 animate-pulse'
                    : isContained
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-red-500'
                }`}
              />
              <div className="text-xs">
                <span className="text-slate-400">Status da Resposta: </span>
                <span className="font-bold text-white font-mono">
                  {isEradicated
                    ? 'INCIDENTE RESOLVIDO & RECUPERADO (MFA ATIVO, REGRA REMOVIDA, AUDITORIA CONCLUÍDA)'
                    : isContained
                    ? 'CONTENÇÃO ATIVA (SESSÕES DERRUBADAS, CONTA SUSPENSA - PENDENTE ERRADICAÇÃO)'
                    : 'INCIDENTE ATIVO — RISCO DE DESVIO DE FATURAS E PERDA FINANCEIRA'}
                </span>
              </div>
            </div>
            {isEradicated && (
              <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">
                ✔ Playbook NIST CSF 2.0 Cumprido
              </span>
            )}
          </div>
        </div>

        {/* TIMELINE INVESTIGATIVA E MÉTRICAS DE SECOPS (CASO ALT-042) */}
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Linha do Tempo do Incidente &amp; Métricas SecOps (NIST SP 800-61r3)</span>
            </h4>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">MTTD: <strong className="text-cyan-400">3 min</strong></span>
              <span className="text-slate-400">MTTR: <strong className="text-emerald-400">6 min</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-red-400 font-bold block">09:12 (UTC-3)</span>
              <p className="text-white font-semibold text-[11px]">Login Anômalo</p>
              <p className="text-[10px] text-slate-400">Dispositivo novo e IP 203.0.113.24 não homologado.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-red-400 font-bold block">09:14 (UTC-3)</span>
              <p className="text-white font-semibold text-[11px]">Regra Externa</p>
              <p className="text-[10px] text-slate-400">Encaminhamento automático configurado na caixa postal.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1">
              <span className="text-[10px] text-cyan-400 font-bold block">09:15 (DETECT)</span>
              <p className="text-white font-semibold text-[11px]">Alerta ALT-042</p>
              <p className="text-[10px] text-slate-400">SIEM correlaciona login e regra em 3 minutos.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block">09:17 (RESPOND)</span>
              <p className="text-white font-semibold text-[11px]">Contenção</p>
              <p className="text-[10px] text-slate-400">Revogação de tokens OAuth2 e suspensão da conta.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold block">09:18 (RECOVER)</span>
              <p className="text-white font-semibold text-[11px]">Erradicação</p>
              <p className="text-[10px] text-slate-400">Regra excluída e imposição de Passkey FIDO2.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

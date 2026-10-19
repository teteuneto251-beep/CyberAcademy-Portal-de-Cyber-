import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Flame,
  Radio,
  Filter,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Lock,
  Server,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Ban,
  Activity,
  Cpu,
  UserX,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  sourceIp: string;
  user: string;
  status: 'FAIL' | 'BLOCKED' | 'NORMAL';
  message: string;
  logType: 'ssh' | 'http' | 'kernel';
}

interface BruteForceLabProps {
  isLightMode?: boolean;
}

export const BruteForceLab: React.FC<BruteForceLabProps> = ({ isLightMode = false }) => {
  // Simulation State
  const [isAttacking, setIsAttacking] = useState<boolean>(true);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [logFilter, setLogFilter] = useState<string>('');
  const [activeLogTab, setActiveLogTab] = useState<'ssh' | 'http' | 'kernel'>('ssh');
  
  // Investigation Form State
  const [identifiedIp, setIdentifiedIp] = useState<string>('');
  const [identifiedService, setIdentifiedService] = useState<string>('');
  const [identificationSubmitted, setIdentificationSubmitted] = useState<boolean>(false);
  const [identificationSuccess, setIdentificationSuccess] = useState<boolean | null>(null);

  // Mitigation Strategy State
  const [selectedMitigation, setSelectedMitigation] = useState<'firewall_drop' | 'account_lock' | 'rate_limit'>('firewall_drop');
  const [mitigationApplied, setMitigationApplied] = useState<boolean>(false);
  const [appliedStrategy, setAppliedStrategy] = useState<string | null>(null);
  const [terminalCmd, setTerminalCmd] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '# srv-auth-prod01 Netfilter/iptables Subsystem Initialized',
    '# iptables -L INPUT -n -v (Policy: ACCEPT, Rules: 0)',
    '# Monitoramento ativo na interface eth0...'
  ]);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  // Dynamic Telemetry Metrics
  const [failedAttempts, setFailedAttempts] = useState<number>(342);
  const [blockedPackets, setBlockedPackets] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState<number>(88);
  const [reqPerSec, setReqPerSec] = useState<number>(142);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Initial simulated logs
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: '00:51:12',
      sourceIp: '198.51.100.42',
      user: 'root',
      status: 'FAIL',
      message: 'sshd[28401]: Failed password for invalid user root from 198.51.100.42 port 51102 ssh2',
      logType: 'ssh'
    },
    {
      id: 2,
      timestamp: '00:51:13',
      sourceIp: '198.51.100.42',
      user: 'admin',
      status: 'FAIL',
      message: 'sshd[28404]: Failed password for invalid user admin from 198.51.100.42 port 51104 ssh2',
      logType: 'ssh'
    },
    {
      id: 3,
      timestamp: '00:51:13',
      sourceIp: '10.0.1.25',
      user: 'analista_soc',
      status: 'NORMAL',
      message: 'sshd[28406]: Accepted publickey for analista_soc from 10.0.1.25 port 54120 ssh2: ED25519',
      logType: 'ssh'
    },
    {
      id: 4,
      timestamp: '00:51:14',
      sourceIp: '198.51.100.42',
      user: 'deploy',
      status: 'FAIL',
      message: 'sshd[28408]: Failed password for user deploy from 198.51.100.42 port 51106 ssh2',
      logType: 'ssh'
    },
    {
      id: 5,
      timestamp: '00:51:14',
      sourceIp: '198.51.100.42',
      user: 'root',
      status: 'FAIL',
      message: 'nginx: 198.51.100.42 - "POST /api/v1/auth/login HTTP/1.1" 401 128 "-" "Hydra/9.5"',
      logType: 'http'
    },
    {
      id: 6,
      timestamp: '00:51:15',
      sourceIp: '198.51.100.42',
      user: 'oracle',
      status: 'FAIL',
      message: 'sshd[28412]: Failed password for invalid user oracle from 198.51.100.42 port 51110 ssh2',
      logType: 'ssh'
    },
    {
      id: 7,
      timestamp: '00:51:15',
      sourceIp: '198.51.100.42',
      user: 'administrator',
      status: 'FAIL',
      message: 'nginx: 198.51.100.42 - "POST /api/v1/auth/login HTTP/1.1" 401 128 "-" "Hydra/9.5"',
      logType: 'http'
    },
    {
      id: 8,
      timestamp: '00:51:16',
      sourceIp: '198.51.100.42',
      user: 'backup',
      status: 'FAIL',
      message: 'sshd[28415]: Failed password for invalid user backup from 198.51.100.42 port 51114 ssh2',
      logType: 'ssh'
    }
  ]);

  // Periodic log emission simulation
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const usernames = ['admin', 'root', 'postgres', 'deploy', 'ubuntu', 'financeiro', 'test', 'guest'];
      const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
      const randomPort = Math.floor(Math.random() * 2000) + 50000;

      if (mitigationApplied) {
        // Attack traffic is being dropped by iptables or blocked
        setBlockedPackets((prev) => prev + 3);
        setLogs((prev) => [
          ...prev.slice(-40),
          {
            id: Date.now() + Math.random(),
            timestamp: timeStr,
            sourceIp: '198.51.100.42',
            user: randomUser,
            status: 'BLOCKED',
            message: `kernel: [IPTABLES-DROP] IN=eth0 OUT= SRC=198.51.100.42 DST=10.0.4.15 PROTO=TCP DPT=22 [PAC_DROP_BLOCKED]`,
            logType: 'kernel'
          }
        ]);
        setCpuUsage((prev) => Math.max(3, prev - 2));
        setReqPerSec(0);
      } else {
        // Under active attack
        setFailedAttempts((prev) => prev + 1);
        const isHttp = Math.random() > 0.6;
        setLogs((prev) => [
          ...prev.slice(-40),
          {
            id: Date.now() + Math.random(),
            timestamp: timeStr,
            sourceIp: '198.51.100.42',
            user: randomUser,
            status: 'FAIL',
            message: isHttp
              ? `nginx: 198.51.100.42 - "POST /api/v1/auth/login user=${randomUser}" 401 128 "-" "Hydra/9.5 (BruteForceEngine)"`
              : `sshd[${Math.floor(Math.random() * 5000) + 28000}]: Failed password for invalid user ${randomUser} from 198.51.100.42 port ${randomPort} ssh2`,
            logType: isHttp ? 'http' : 'ssh'
          }
        ]);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming, mitigationApplied]);

  // Scroll log console to bottom when new logs appear
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Verify Attack Identification
  const handleVerifyIdentification = () => {
    setIdentificationSubmitted(true);
    const ipClean = identifiedIp.trim();
    const isIpCorrect = ipClean === '198.51.100.42';
    const isServiceCorrect = identifiedService === 'ssh' || identifiedService === 'both';

    if (isIpCorrect && isServiceCorrect) {
      setIdentificationSuccess(true);
    } else {
      setIdentificationSuccess(false);
    }
  };

  // Apply Selected Mitigation
  const handleApplyMitigation = (strategyKey: 'firewall_drop' | 'account_lock' | 'rate_limit') => {
    setSelectedMitigation(strategyKey);
    let command = '';
    let explanation = '';

    if (strategyKey === 'firewall_drop') {
      command = 'iptables -I INPUT 1 -s 198.51.100.42 -p tcp --dport 22 -j DROP';
      explanation = 'Regra de Kernel aplicada! Todos os pacotes TCP com origem em 198.51.100.42 na porta 22 serão sumariamente descartados (DROP) sem responder SYN/ACK.';
    } else if (strategyKey === 'account_lock') {
      command = 'fail2ban-client set sshd banip 198.51.100.42 && usermod -L deploy';
      explanation = 'Jail do Fail2ban ativado para 198.51.100.42 e conta deploy temporariamente travada preventivamente contra comprometimento.';
    } else {
      command = 'iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP';
      explanation = 'Módulo xt_recent ativado: qualquer IP que tentar mais de 4 novas conexões SSH em 60 segundos terá o tráfego bloqueado automaticamente.';
    }

    setTerminalCmd(command);
    setTerminalHistory((prev) => [
      ...prev,
      `root@srv-auth-prod01:~# ${command}`,
      `[OK] ${explanation}`,
      '# Atualizando contadores de pacotes Netfilter: conntrack sync concluído.',
      '# Status: Tráfego malicioso mitigado com sucesso.'
    ]);

    setMitigationApplied(true);
    setAppliedStrategy(strategyKey);
    setIsAttacking(false);
    setReqPerSec(0);
    setCpuUsage(4);
  };

  // Reset Simulation
  const handleResetSimulation = () => {
    setIsAttacking(true);
    setMitigationApplied(false);
    setAppliedStrategy(null);
    setBlockedPackets(0);
    setFailedAttempts(342);
    setReqPerSec(142);
    setCpuUsage(88);
    setIdentificationSubmitted(false);
    setIdentificationSuccess(null);
    setTerminalHistory([
      '# srv-auth-prod01 Netfilter/iptables Subsystem Initialized',
      '# iptables -F INPUT (Regras de bloqueio removidas para novo teste)',
      '# ATENÇÃO: Servidor exposto novamente. Tráfego malicioso detectado!'
    ]);
  };

  const handleCopyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  // Filtered log display
  const filteredLogs = logs.filter((l) => {
    if (activeLogTab === 'ssh' && l.logType !== 'ssh') return false;
    if (activeLogTab === 'http' && l.logType !== 'http') return false;
    if (activeLogTab === 'kernel' && l.logType !== 'kernel') return false;
    if (!logFilter) return true;
    const q = logFilter.toLowerCase();
    return (
      l.sourceIp.toLowerCase().includes(q) ||
      l.user.toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q)
    );
  });

  return (
    <div id="sim-bruteforce" className="space-y-6 animate-fadeIn">
      {/* Lab Header Banner */}
      <div
        className={`rounded-2xl p-6 border transition-all ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-md'
            : 'glass-card border-red-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/20'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                Laboratório Prático SOC &amp; Firewall
              </span>
              <span className="text-xs font-mono text-slate-500">Módulo 05 / 04 • Documento #16</span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Simulador de Ataque Brute Force &amp; Mitigação com Firewall (iptables / UFW)
            </h3>
            <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Um servidor corporativo de autenticação (<code>srv-auth-prod01</code>) está sofrendo um ataque massivo de força bruta por dicionário. Inspecione os logs em tempo real, identifique o IP de origem malicioso e aplique regras de mitigação no firewall do kernel para restaurar a integridade e disponibilidade do serviço.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSimulation}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Simulação
            </button>
          </div>
        </div>

        {/* Server Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div
            className={`p-3 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="text-[11px] text-slate-500 font-mono uppercase flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              Estado do Servidor
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  mitigationApplied ? 'bg-emerald-500' : 'bg-red-500 animate-ping'
                }`}
              />
              <span
                className={`text-xs font-bold ${
                  mitigationApplied
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {mitigationApplied ? 'PROTEGIDO (Mitigado)' : 'SOB ATAQUE (Crítico)'}
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="text-[11px] text-slate-500 font-mono uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-purple-500" />
              Taxa de Requisições
            </div>
            <div className="mt-1">
              <span className={`text-base font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {reqPerSec} req/s
              </span>
              <span className="text-[10px] text-slate-400 ml-1">
                {mitigationApplied ? '(Fluxo normal)' : '(Anomalia volumétrica)'}
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="text-[11px] text-slate-500 font-mono uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              Falhas / Bloqueios
            </div>
            <div className="mt-1">
              <span className="text-base font-extrabold text-red-600 dark:text-red-400">
                {mitigationApplied ? `${blockedPackets} Bloqueados` : `${failedAttempts} Falhas`}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">
                {mitigationApplied ? 'no Firewall' : 'em 2 min'}
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="text-[11px] text-slate-500 font-mono uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-500" />
              Carga da CPU
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-base font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {cpuUsage}%
              </span>
              <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    cpuUsage > 70 ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${cpuUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Lab Grid: Left = Live Server Logs Console; Right = Analysis & Mitigation Center */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Server Log Console (7 Cols) */}
        <div
          className={`lg:col-span-7 rounded-2xl border flex flex-col overflow-hidden ${
            isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-slate-800'
          }`}
        >
          {/* Console Header Bar */}
          <div
            className={`px-4 py-3 border-b flex items-center justify-between ${
              isLightMode
                ? 'bg-slate-100 text-slate-900 border-slate-200'
                : 'bg-slate-900 text-slate-200 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal className={`w-4 h-4 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />
              <span className={`text-xs font-mono font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>
                srv-auth-prod01:/var/log/
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                  isLightMode
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-800 text-emerald-400 border-slate-700'
                }`}
              >
                syslog stream
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className={`text-[11px] px-2.5 py-1 rounded border flex items-center gap-1 font-mono transition cursor-pointer ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title={isStreaming ? 'Pausar fluxo de logs' : 'Retomar fluxo'}
              >
                {isStreaming ? (
                  <>
                    <Pause className={`w-3 h-3 ${isLightMode ? 'text-amber-600' : 'text-amber-400'}`} />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className={`w-3 h-3 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    <span>Ao Vivo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Log Tabs & Search */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveLogTab('ssh')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  activeLogTab === 'ssh'
                    ? 'bg-red-600 text-white keep-white shadow-sm'
                    : isLightMode
                    ? 'text-slate-700 hover:bg-slate-200'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                auth.log (SSH)
              </button>
              <button
                onClick={() => setActiveLogTab('http')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  activeLogTab === 'http'
                    ? 'bg-red-600 text-white keep-white shadow-sm'
                    : isLightMode
                    ? 'text-slate-700 hover:bg-slate-200'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                access.log (Web)
              </button>
              <button
                onClick={() => setActiveLogTab('kernel')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  activeLogTab === 'kernel'
                    ? 'bg-red-600 text-white keep-white shadow-sm'
                    : isLightMode
                    ? 'text-slate-700 hover:bg-slate-200'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                iptables.log (Firewall)
              </button>
            </div>

            <div className="relative">
              <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                placeholder="Filtrar IP, usuário ou erro..."
                className={`text-xs pl-8 pr-3 py-1 rounded-lg border focus:outline-none transition font-mono ${
                  isLightMode
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-red-500'
                    : 'bg-slate-900 border-slate-800 text-slate-200 focus:border-red-500'
                }`}
              />
            </div>
          </div>

          {/* Terminal Screen for Logs */}
          <div
            ref={logContainerRef}
            className="terminal-bg p-4 flex-1 min-h-[320px] max-h-[460px] overflow-y-auto font-mono text-[11px] leading-relaxed select-text space-y-1.5"
          >
            {filteredLogs.length === 0 ? (
              <div className="text-slate-600 dark:text-slate-500 text-center py-10 font-sans">
                Nenhum log encontrado para o filtro aplicado.
              </div>
            ) : (
              filteredLogs.map((log) => {
                const isFail = log.status === 'FAIL';
                const isBlocked = log.status === 'BLOCKED';
                return (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2 py-1 px-2 rounded transition ${
                      isFail
                        ? isLightMode
                          ? 'bg-red-50 text-red-900 border border-red-200 hover:bg-red-100/80'
                          : 'bg-red-950/25 text-red-300 hover:bg-red-950/40'
                        : isBlocked
                        ? isLightMode
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100/80'
                          : 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                        : isLightMode
                        ? 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50'
                        : 'text-slate-300 hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="text-slate-600 dark:text-slate-500 select-none flex-shrink-0">{log.timestamp}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase select-none flex-shrink-0 ${
                        isFail
                          ? isLightMode
                            ? 'bg-red-200 text-red-900'
                            : 'bg-red-900/80 text-red-200'
                          : isBlocked
                          ? isLightMode
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-emerald-900/80 text-emerald-200'
                          : isLightMode
                          ? 'bg-blue-200 text-blue-900'
                          : 'bg-blue-900/80 text-blue-200'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="break-all">{log.message}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Tip on Logs */}
          <div className="p-3 bg-slate-100 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Dica Forense: Observe a repetição do endereço IP e o espaçamento em milissegundos entre as tentativas.</span>
            <span className="font-mono">{filteredLogs.length} eventos exibidos</span>
          </div>
        </div>

        {/* Right Column: Step-by-Step Investigation & Mitigation (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Passo 1: Identificação Forense */}
          <div
            className={`rounded-2xl p-5 border transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Passo 1: Identificar o Atacante nos Logs
              </h4>
            </div>

            <p className={`text-xs mb-3.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Analise os eventos no console ao lado. Qual é o endereço IP da máquina que está executando os ataques automatizados e qual serviço está sob mira?
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold mb-1">
                  Endereço IP Suspeito Detectado:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={identifiedIp}
                    onChange={(e) => setIdentifiedIp(e.target.value)}
                    placeholder="Ex: 198.51.100.42"
                    className={`flex-1 text-xs px-3 py-2 rounded-xl border focus:outline-none font-mono ${
                      isLightMode
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-500'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-red-500'
                    }`}
                  />
                  <button
                    onClick={() => setIdentifiedIp('198.51.100.42')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                  >
                    Usar do Log
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold mb-1">
                  Vetor / Serviço Alvo:
                </label>
                <select
                  value={identifiedService}
                  onChange={(e) => setIdentifiedService(e.target.value)}
                  className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-500'
                      : 'bg-slate-900 border-slate-800 text-white focus:border-red-500'
                  }`}
                >
                  <option value="">Selecione o serviço identificado...</option>
                  <option value="ssh">SSH (Porta 22 - Força Bruta de Credenciais)</option>
                  <option value="dns">DNS Recursivo (Porta 53 - Amplificação)</option>
                  <option value="http">HTTP/Web Login (/api/v1/auth/login)</option>
                  <option value="both">Híbrido: SSH (22) e Web Login (443)</option>
                </select>
              </div>

              <button
                onClick={handleVerifyIdentification}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Validar Identificação Forense
              </button>

              {identificationSubmitted && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                    identificationSuccess
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-300'
                  }`}
                >
                  {identificationSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500 mt-0.5" />
                      <div>
                        <strong>Evidência Confirmada!</strong> O IP <code>198.51.100.42</code> pertence a uma botnet conhecida tentando adivinhar senhas via Hydra contra o serviço SSH e a API de login.
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 flex-shrink-0 text-red-500 mt-0.5" />
                      <div>
                        <strong>Identificação incorreta.</strong> Revise o log: busque pelo IP externo (não-privado) que acumula erros "Failed password" repetitivos.
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Passo 2: Aplicação da Mitigação */}
          <div
            className={`rounded-2xl p-5 border transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                2
              </span>
              <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Passo 2: Aplicar Regra de Mitigação
              </h4>
            </div>

            <p className={`text-xs mb-3.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Escolha qual estratégia de defesa ativa você deseja acionar para conter o atacante imediatamente:
            </p>

            <div className="space-y-2.5">
              {/* Opção A: Firewall Drop */}
              <div
                onClick={() => setSelectedMitigation('firewall_drop')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedMitigation === 'firewall_drop'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : isLightMode
                    ? 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      Regra de Firewall Iptables (DROP)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-semibold">
                    Recomendado
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 select-all bg-black/10 dark:bg-black/40 p-1.5 rounded">
                  iptables -I INPUT 1 -s 198.51.100.42 -p tcp --dport 22 -j DROP
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Descarta pacotes no nível de kernel antes mesmo de processar o handshake TCP.
                </p>
              </div>

              {/* Opção B: Account Lock + Fail2ban */}
              <div
                onClick={() => setSelectedMitigation('account_lock')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedMitigation === 'account_lock'
                    ? 'border-blue-500 bg-blue-500/10'
                    : isLightMode
                    ? 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-blue-500" />
                    <span className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      Fail2ban Jail &amp; Bloqueio de Conta
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold">
                    Aplicação
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 select-all bg-black/10 dark:bg-black/40 p-1.5 rounded">
                  fail2ban-client set sshd banip 198.51.100.42
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bane o IP no daemon e trava contas comprometidas preventivamente.
                </p>
              </div>

              {/* Opção C: Rate Limiting Stateful */}
              <div
                onClick={() => setSelectedMitigation('rate_limit')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedMitigation === 'rate_limit'
                    ? 'border-amber-500 bg-amber-500/10'
                    : isLightMode
                    ? 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      Rate Limiting Stateful (Módulo xt_recent)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold">
                    Anti-Flooding
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 select-all bg-black/10 dark:bg-black/40 p-1.5 rounded">
                  -m recent --update --seconds 60 --hitcount 4 -j DROP
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Limita conexões a 3 tentativas por minuto para qualquer endereço externo.
                </p>
              </div>

              {/* Execution Action Button */}
              <button
                onClick={() => handleApplyMitigation(selectedMitigation)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Executar Regra de Defesa no Servidor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Command Output & Incident Report */}
      {mitigationApplied && (
        <div
          className={`rounded-2xl p-6 border transition-all animate-fadeIn ${
            isLightMode ? 'bg-white border-emerald-300 shadow-md' : 'glass-card border-emerald-500/40 bg-slate-950'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Incidente Mitigado com Sucesso! Relatório de Pós-Contenção
                </h4>
                <p className="text-xs text-slate-500">
                  Regra ativada no Kernel Netfilter • IP 198.51.100.42 neutralizado • CPU normalizada (3%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCmd(terminalCmd)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copiado!' : 'Copiar Comando Executado'}</span>
              </button>
            </div>
          </div>

          {/* Terminal History */}
          <div className="terminal-bg p-3.5 rounded-xl font-mono text-[11px] text-emerald-400 space-y-1 mb-4 select-text">
            {terminalHistory.map((line, idx) => (
              <div key={idx} className={line.startsWith('#') ? 'text-slate-400' : 'text-emerald-300'}>
                {line}
              </div>
            ))}
          </div>

          {/* Key Lessons Learned */}
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <span className="font-bold text-red-600 dark:text-red-400 block mb-1">
                1. DROP vs REJECT no Firewall:
              </span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Utilizar <code>-j DROP</code> é mais eficaz contra força bruta porque não envia pacote TCP RST de volta, forçando o socket do atacante a aguardar timeout e esgotando os recursos da botnet.
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                2. Autenticação por Chave &amp; MFA:
              </span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Firewalls mitigam a rede, mas a regra de ouro em servidores produtivos é desabilitar <code>PasswordAuthentication no</code> e exigir chaves criptográficas Ed25519 e MFA.
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                3. Defesa em Profundidade:
              </span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                A mitigação ideal combina Netfilter (camada 3/4) para descarte em hardware/kernel com Fail2ban (camada 7) monitorando e banindo IPs após limites predefinidos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

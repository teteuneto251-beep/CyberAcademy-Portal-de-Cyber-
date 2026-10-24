import React, { useState } from 'react';
import {
  Flame,
  Terminal,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Server,
  Lock,
  Copy,
  Check,
  AlertTriangle,
  Eye,
  Radio,
  ArrowRight,
  Cpu,
  Layers,
  Activity,
  Workflow,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react';
import { iptablesRecipesData, IptablesRecipe } from '../data/modulesData';
import { BruteForceLab } from './BruteForceLab';

interface Module5ViewProps {
  isLightMode?: boolean;
}

export const Module5View: React.FC<Module5ViewProps> = ({ isLightMode = false }) => {
  const [isHardened, setIsHardened] = useState<boolean>(true);
  const [copiedRule, setCopiedRule] = useState<string | null>(null);
  const [recipeFilter, setRecipeFilter] = useState<string>('Todas');

  // Interactive Packet Pipeline Tracer State
  const [tracerSrc, setTracerSrc] = useState<'inet1' | 'usuarios' | 'visitantes'>('inet1');
  const [tracerDst, setTracerDst] = useState<'web80' | 'ssh22' | 'lan'>('web80');
  const [tracerState, setTracerState] = useState<'NEW' | 'ESTABLISHED' | 'INVALID'>('NEW');
  const [packetCount, setPacketCount] = useState<number>(14);

  const [terminalOutput, setTerminalOutput] = useState<{
    cmd: string;
    output: string[];
    statusColor: string;
  }>({
    cmd: 'iptables -S | grep FORWARD',
    output: [
      '-P FORWARD DROP',
      '-A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT',
      '-A FORWARD -i eth0 -o eth1 -s 192.168.10.0/24 -d 192.168.20.10 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT'
    ],
    statusColor: 'text-emerald-400'
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRule(id);
    setTimeout(() => setCopiedRule(null), 2000);
  };

  const runCommand = (type: string) => {
    if (type === 'ping-lan') {
      if (isHardened) {
        setTerminalOutput({
          cmd: 'inet1:~$ ping -c 2 192.168.1.10',
          output: [
            'PING 192.168.1.10 (192.168.1.10): 56 data bytes',
            '--- 192.168.1.10 ping statistics ---',
            '2 packets transmitted, 0 packets received, 100% packet loss',
            '[SEGURANÇA ATIVA: Pacote ICMP descartado pelo Firewall fw1 (FORWARD DROP)]'
          ],
          statusColor: 'text-emerald-400'
        });
      } else {
        setTerminalOutput({
          cmd: 'inet1:~$ ping -c 2 192.168.1.10',
          output: [
            'PING 192.168.1.10 (192.168.1.10): 56 data bytes',
            '64 bytes from 192.168.1.10: icmp_seq=0 ttl=63 time=1.23 ms',
            '64 bytes from 192.168.1.10: icmp_seq=1 ttl=63 time=1.19 ms',
            '[VULNERABILIDADE CRÍTICA: Estação interna visível e alcançável diretamente pela Internet WAN!]'
          ],
          statusColor: 'text-red-400'
        });
      }
    } else if (type === 'nc-ssh') {
      if (isHardened) {
        setTerminalOutput({
          cmd: 'inet1:~$ nc -z -w 2 192.168.1.20 22',
          output: [
            'nc: connect to 192.168.1.20 port 22 (tcp) timed out: Operation now in progress',
            '[SUCESSO DE HARDENING: Porta 22 SSH protegida! Acesso restrito exclusivamente à sub-rede MGMT pc2]'
          ],
          statusColor: 'text-emerald-400'
        });
      } else {
        setTerminalOutput({
          cmd: 'inet1:~$ nc -z -w 2 192.168.1.20 22',
          output: [
            'Connection to 192.168.1.20 22 port [tcp/ssh] succeeded!',
            'SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6',
            '[FALHA GRAVE: Gestão SSH aberta para a Internet pública! Risco iminente de força bruta]'
          ],
          statusColor: 'text-red-400'
        });
      }
    } else if (type === 'curl-web') {
      setTerminalOutput({
        cmd: 'pc-usuarios:~$ curl -I http://192.168.20.10',
        output: [
          'HTTP/1.1 200 OK',
          'Date: Thu, 15 Oct 2026 14:00:00 GMT',
          'Server: Apache/2.4.52 (Ubuntu)',
          'Content-Type: text/html; charset=UTF-8',
          '[FLUXO AUTORIZADO: Tráfego HTTP Porta 80 liberado conforme regra de Menor Privilégio]'
        ],
        statusColor: 'text-cyan-400'
      });
    } else if (type === 'visitante-srv') {
      if (isHardened) {
        setTerminalOutput({
          cmd: 'pc-visitantes (192.168.30.10):~$ ping -c 2 192.168.20.10',
          output: [
            'PING 192.168.20.10 (192.168.20.10): 56 data bytes',
            '--- 192.168.20.10 ping statistics ---',
            '2 packets transmitted, 0 packets received, 100% packet loss',
            '[ISOLAMENTO EFETIVO: Segmento de Visitantes está 100% bloqueado de acessar a Intranet e Servidores Internos!]'
          ],
          statusColor: 'text-emerald-400'
        });
      } else {
        setTerminalOutput({
          cmd: 'pc-visitantes (192.168.30.10):~$ ping -c 2 192.168.20.10',
          output: [
            'PING 192.168.20.10 (192.168.20.10): 56 data bytes',
            '64 bytes from 192.168.20.10: icmp_seq=0 ttl=63 time=0.88 ms',
            '[FALHA DE SEGMENTAÇÃO: Visitante alcançou os servidores internos corporativos!]'
          ],
          statusColor: 'text-red-400'
        });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header with Network Fortress Showcase */}
      <div
        className={`relative rounded-2xl overflow-hidden border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
          isLightMode
            ? 'bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/70 border-emerald-200 shadow-sm'
            : 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border-emerald-500/25 shadow-lg'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase">
            <Flame className="w-4 h-4" />
            <span>Módulo 05 • Documentos #06, #07, #08 e #16 + Laboratório NetSim</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Hardening de Rede, Firewalls Stateful, IDS/IPS &amp; Simulador NetSim
          </h2>
          <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Material didático do <strong>Prof. Rômulo Pereira de Almeida</strong> consolidando os dois grandes laboratórios no <code>netsim.borck.education</code>: <strong>Lab 5 (Perímetro WAN/LAN)</strong> e a <strong>Topologia de 3 Zonas Construída do Zero</strong>.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-56 h-36 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md relative group cyber-img-box">
          <img
            src="/assets/aistudio/Corporate_network_fortress_archi__20261024192219_6ed44814.jpg"
            alt="Corporate Network Fortress Architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="cyber-img-overlay" />
          <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            isLightMode ? 'bg-white/90 text-emerald-900 border-emerald-200' : 'bg-slate-950/80 text-emerald-300 border-emerald-500/30'
          }`}>
            Topologia 3 Zonas · NetSim
          </span>
        </div>
      </div>

      {/* Dois Cenários do NetSim */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cenário A: Lab 5 Oficial */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-t-4 border-t-emerald-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                Cenário 1 • Lab 5 Oficial NetSim
              </span>
              <span className="text-xs text-slate-400 font-mono">Perímetro WAN / LAN / MGMT</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Perímetro WAN (<code>inet1</code>) → Firewall (<code>fw1</code>) → LAN (<code>pc1</code>, <code>srv1</code>) + MGMT (<code>pc2</code>)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 mt-3">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono font-bold">•</span>
                <span>
                  <strong>Firewall (<code>fw1</code>):</strong> Interface <code>eth0</code> (192.168.1.1/24 - LAN), <code>eth1</code> (203.0.113.1/24 - WAN), <code>eth2</code> (192.168.30.1/24 - MGMT).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono font-bold">•</span>
                <span>
                  <strong>Problema Inicial da Topologia:</strong> Política padrão aberta (<code>ACCEPT</code>), servidor e estações no mesmo switch, e SSH porta 22 exposta para a internet.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono font-bold">•</span>
                <span>
                  <strong>Solução Aplicada:</strong> Política <code>FORWARD DROP</code>, estado <code>conntrack ESTABLISHED,RELATED</code> e liberação de SSH exclusivamente pela interface <code>eth2</code>.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Regra Central do Lab 5:</span>
              <button
                onClick={() =>
                  handleCopy(
                    'iptables -P FORWARD DROP && iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT',
                    'lab5'
                  )
                }
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedRule === 'lab5' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedRule === 'lab5' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="terminal-bg p-2.5 rounded-lg font-mono text-[11px] text-emerald-300 overflow-x-auto">
              iptables -P FORWARD DROP
              <br />
              iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
            </div>
          </div>
        </div>

        {/* Cenário B: 3 Zonas construídas do zero */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-t-4 border-t-cyan-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-400 font-bold">
                Cenário 2 • Construção do Zero
              </span>
              <span className="text-xs text-slate-400 font-mono">3 Zonas Isoladas</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Segmentação Física: Usuários (<code>.10</code>), Servidores (<code>.20</code>) e Visitantes (<code>.30</code>)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 mt-3">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-mono font-bold">•</span>
                <span>
                  <strong>Zona de Usuários (<code>eth0</code>):</strong> Sub-rede <code>192.168.10.0/24</code> através do switch <code>sw-usuarios</code>.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-mono font-bold">•</span>
                <span>
                  <strong>Zona de Servidores (<code>eth1</code>):</strong> Sub-rede <code>192.168.20.0/24</code> (Servidor Web Intranet <code>192.168.20.10</code>).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-mono font-bold">•</span>
                <span>
                  <strong>Zona de Visitantes (<code>eth2</code>):</strong> Sub-rede <code>192.168.30.0/24</code> através do switch <code>sw-visitantes</code>.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Regra de Menor Privilégio (HTTP 80):</span>
              <button
                onClick={() =>
                  handleCopy(
                    'iptables -A FORWARD -i eth0 -o eth1 -s 192.168.10.0/24 -d 192.168.20.10 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT',
                    '3zonas'
                  )
                }
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedRule === '3zonas' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedRule === '3zonas' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="terminal-bg p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 overflow-x-auto">
              iptables -A FORWARD -i eth0 -o eth1 -s 192.168.10.0/24 -d 192.168.20.10 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT
            </div>
          </div>
        </div>
      </div>

      {/* SIMULADOR INTERATIVO DE TERMINAL NETSIM */}
      <div id="sim-netsim" className="glass-card rounded-2xl p-6 border-2 border-emerald-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
              SIMULADOR DE TERMINAL INTERATIVO • NETSIM LAB
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Terminal de Teste de Tráfego: Antes vs Depois do Hardening
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Postura do Firewall:</span>
            <button
              onClick={() => {
                const nextState = !isHardened;
                setIsHardened(nextState);
                if (nextState) {
                  setTerminalOutput({
                    cmd: 'fw1:~$ iptables -P FORWARD DROP',
                    output: [
                      'Defesas do Kernel ativadas com sucesso.',
                      'Política FORWARD configurada para DROP (Default Deny).',
                      'Tabela conntrack monitorando fluxos bidirecionais autorizados.'
                    ],
                    statusColor: 'text-emerald-400'
                  });
                } else {
                  setTerminalOutput({
                    cmd: 'fw1:~$ iptables -P FORWARD ACCEPT',
                    output: [
                      'ATENÇÃO: Política configurada para ACCEPT (Default Allow).',
                      'Todos os pacotes de entrada e saída serão roteados sem filtragem.',
                      'A rede corporativa está vulnerável a varreduras externas.'
                    ],
                    statusColor: 'text-red-400'
                  });
                }
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition shadow-lg cursor-pointer flex items-center gap-2 ${
                isHardened
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
              }`}
            >
              {isHardened ? (
                <>
                  <ShieldCheck className="w-4 h-4" /> HARDENING ATIVO (DROP)
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" /> SEM HARDENING (ACCEPT)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Botões de Ações de Rede */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => runCommand('ping-lan')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              isLightMode
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">inet1 (WAN) → pc1 (LAN)</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">$ ping -c 2 192.168.1.10</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Testa se a LAN está invisível</div>
          </button>

          <button
            onClick={() => runCommand('nc-ssh')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              isLightMode
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <div className="text-[11px] font-mono text-red-600 dark:text-red-400 font-bold">inet1 (WAN) → srv1 (Porta 22)</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">$ nc -z -w 2 192.168.1.20 22</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Testa bloqueio de SSH externo</div>
          </button>

          <button
            onClick={() => runCommand('curl-web')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              isLightMode
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">pc-usuarios → srv-web</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">$ curl http://192.168.20.10</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Valida Menor Privilégio (Porta 80)</div>
          </button>

          <button
            onClick={() => runCommand('visitante-srv')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              isLightMode
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <div className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">pc-visitantes → srv-web</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">$ ping -c 2 192.168.20.10</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Testa isolamento da DMZ/Intranet</div>
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="terminal-bg rounded-xl p-5 font-mono text-xs min-h-[140px] space-y-2">
          <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
            <span>Terminal de Simulação NetSim Bash v5.2</span>
            <span>Interface eth0/eth1/eth2</span>
          </div>

          <div className="text-amber-300 font-bold pt-1">{terminalOutput.cmd}</div>

          <div className="space-y-1">
            {terminalOutput.output.map((line, idx) => (
              <div key={idx} className={terminalOutput.statusColor}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VISUALIZADOR INTERATIVO DO PIPELINE NETFILTER / CONNTRACK NO KERNEL */}
      <div className="glass-card rounded-2xl p-6 border-2 border-emerald-500/30 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
              LABORATÓRIO AVANÇADO • KERNEL NETFILTER &amp; CONNTRACK
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Rastreador Visual do Pipeline Netfilter (Fluxo do Pacote no Kernel Linux)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Pacotes Processados: <strong className="text-emerald-400 font-mono">{packetCount}</strong>
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Injete um pacote com parâmetros customizados para acompanhar seu percurso pelas tabelas e cadeias do Netfilter (<em>PREROUTING → FORWARD → POSTROUTING</em>):
        </p>

        {/* Seletores do Pacote */}
        <div className="grid sm:grid-cols-3 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Origem do Tráfego:</label>
            <select
              value={tracerSrc}
              onChange={(e) => {
                setTracerSrc(e.target.value as any);
                setPacketCount((p) => p + 1);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="inet1">inet1 (WAN - 203.0.113.66)</option>
              <option value="usuarios">pc-usuarios (LAN - 192.168.10.10)</option>
              <option value="visitantes">pc-visitantes (DMZ - 192.168.30.10)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Destino e Porta:</label>
            <select
              value={tracerDst}
              onChange={(e) => {
                setTracerDst(e.target.value as any);
                setPacketCount((p) => p + 1);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="web80">srv-web (HTTP - Porta 80)</option>
              <option value="ssh22">srv1 (SSH - Porta 22)</option>
              <option value="lan">pc-lan (Host Interno - 192.168.1.10)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Estado Conntrack:</label>
            <select
              value={tracerState}
              onChange={(e) => {
                setTracerState(e.target.value as any);
                setPacketCount((p) => p + 1);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="NEW">NEW (Tentativa de Nova Conexão)</option>
              <option value="ESTABLISHED">ESTABLISHED (Retorno de Conexão Ativa)</option>
              <option value="INVALID">INVALID (Pacote Fora de Sequência/Malformado)</option>
            </select>
          </div>
        </div>

        {/* Pipeline Visual dos Estágios */}
        {(() => {
          let outcome = 'DROP';
          let matchedRule = 'iptables -P FORWARD DROP';
          let rationale = 'Descartado pela política restritiva padrão (Default Deny).';

          if (tracerState === 'INVALID') {
            outcome = 'DROP';
            matchedRule = 'iptables -A FORWARD -m conntrack --ctstate INVALID -j DROP';
            rationale = 'Pacote inválido descartado imediatamente no filtro stateful.';
          } else if (tracerState === 'ESTABLISHED') {
            outcome = 'ACCEPT';
            matchedRule = 'iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT';
            rationale = 'Pacote de resposta de conexão já aberta e autorizada de dentro para fora.';
          } else if (!isHardened) {
            outcome = 'ACCEPT';
            matchedRule = 'iptables -P FORWARD ACCEPT';
            rationale = 'Firewall em modo permissivo sem hardening (Vulnerabilidade de rede).';
          } else if (tracerSrc === 'usuarios' && tracerDst === 'web80') {
            outcome = 'ACCEPT';
            matchedRule = 'iptables -A FORWARD -i eth0 -o eth1 -s 192.168.10.0/24 -d 192.168.20.10 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT';
            rationale = 'Permitido pela regra de Menor Privilégio para acesso HTTP na porta 80.';
          } else if (tracerSrc === 'visitantes') {
            outcome = 'DROP';
            matchedRule = 'iptables -A FORWARD -i eth2 -o eth1 -j DROP';
            rationale = 'Isolamento de segurança: visitantes não alcançam a rede de servidores internos.';
          } else if (tracerSrc === 'inet1' && tracerDst === 'ssh22') {
            outcome = 'DROP';
            matchedRule = 'iptables -P FORWARD DROP (Regra Restritiva de Gestão SSH)';
            rationale = 'SSH exposto na WAN bloqueado! Permitido apenas pela interface MGMT pc2.';
          }

          const isAccepted = outcome === 'ACCEPT';

          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500">ETAPA 1</span>
                  <span className="font-bold text-white mt-1">PREROUTING</span>
                  <span className="text-[10px] text-cyan-400 mt-1">Mangle / Conntrack</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500">ETAPA 2</span>
                  <span className="font-bold text-white mt-1">ROUTING</span>
                  <span className="text-[10px] text-purple-400 mt-1">Decisão de Rota L3</span>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                  isAccepted ? 'bg-emerald-950/40 border-emerald-500' : 'bg-red-950/40 border-red-500'
                }`}>
                  <span className="text-[10px] text-slate-500">ETAPA 3</span>
                  <span className="font-bold text-white mt-1">FORWARD CHAIN</span>
                  <span className={`text-[10px] font-bold mt-1 ${isAccepted ? 'text-emerald-300' : 'text-red-300'}`}>
                    {isAccepted ? 'REGRA MATCH (ACCEPT)' : 'REGRA MATCH (DROP)'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500">ETAPA 4</span>
                  <span className="font-bold text-white mt-1">POSTROUTING</span>
                  <span className="text-[10px] text-amber-400 mt-1">Egress / NAT</span>
                </div>
              </div>

              {/* Resultado do Rastreamento */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isAccepted ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' : 'bg-red-950/30 border-red-500/50 text-red-200'
              }`}>
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                    Veredito do Netfilter Kernel:
                  </div>
                  <div className="text-base font-extrabold flex items-center gap-2 mt-0.5">
                    {isAccepted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300">PACOTE TRANSMITIDO (ACCEPT)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">PACOTE DESCARTADO SILENCIOSAMENTE (DROP)</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{rationale}</p>
                </div>
                <div className="text-right font-mono text-[11px] text-slate-400 max-w-sm overflow-x-auto">
                  <div className="text-slate-500">Regra Aplicada:</div>
                  <div className="text-amber-300 font-bold truncate">{matchedRule}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* GUIA DE RECEITAS IPTABLES DE PRODUÇÃO (CHEAT SHEET INTERATIVO) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>Receitas e Boas Práticas IPTables para Produção (Cheat Sheet)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Comandos testados no simulador NetSim prontos para auditoria e aplicação:
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['Todas', 'Segurança Perimetral', 'Proteção de Servidor', 'Isolamento de Zonas'].map((cat) => (
              <button
                key={cat}
                onClick={() => setRecipeFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                  recipeFilter === cat
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {iptablesRecipesData
            .filter((r) => recipeFilter === 'Todas' || r.category === recipeFilter)
            .map((recipe, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{recipe.title}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {recipe.chain}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(recipe.command, `recipe-${idx}`)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedRule === `recipe-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Regra</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="terminal-bg p-2.5 rounded-lg font-mono text-[11px] text-emerald-300 overflow-x-auto select-all">
                  {recipe.command}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {recipe.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Laboratório Interativo: Detecção e Mitigação de Ataque Brute Force */}
      <BruteForceLab isLightMode={isLightMode} />

      {/* Controles Complementares: IDS vs IPS, VPN e Ataques */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" /> IDS vs IPS
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>IDS (Intrusion Detection):</strong> Monitora passivamente e gera alertas ao detectar anomalias ou assinaturas.<br />
            <strong>IPS (Intrusion Prevention):</strong> Atua em linha (inline), bloqueando ativamente pacotes maliciosos que tentem passar por portas abertas no firewall (ex.: ataque SQLi ou Exploit na porta 80).
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" /> VPN Corporativa &amp; MFA
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cria um túnel criptografado para colaboradores remotos. Como evidenciado no Caso Aurora, uma VPN não pode autenticar apenas com usuário e senha simples: é mandatário exigir <strong>MFA</strong> e segmentar o acesso após a conexão.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400" /> Sniffing, Spoofing &amp; DDoS
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Sniffing:</strong> Captura de tráfego em texto plano (mitigado por TLS/HTTPS/QUIC).<br />
            <strong>Spoofing:</strong> Falsificação de IP/MAC/DNS.<br />
            <strong>DDoS:</strong> Esgotamento volumétrico visando quebrar a <em>Disponibilidade</em>.
          </p>
        </div>
      </div>
    </div>
  );
};

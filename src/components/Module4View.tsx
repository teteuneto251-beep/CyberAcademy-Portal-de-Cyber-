import React, { useState } from 'react';
import {
  Network,
  Activity,
  Layers,
  Search,
  Lock,
  Binary,
  Radio,
  Share2,
  CheckCircle2,
  AlertCircle,
  Flame,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { wiresharkPacketsData, WiresharkPacket } from '../data/modulesData';
import { BruteForceLab } from './BruteForceLab';

interface Module4ViewProps {
  isLightMode?: boolean;
  onNavigateToLab?: (tab: string, anchor: string) => void;
}

export const Module4View: React.FC<Module4ViewProps> = ({
  isLightMode = false,
  onNavigateToLab
}) => {
  const [showInlineBruteForceLab, setShowInlineBruteForceLab] = useState<boolean>(false);
  const [selectedPacket, setSelectedPacket] = useState<WiresharkPacket>(wiresharkPacketsData[0]);
  const [displayFilter, setDisplayFilter] = useState<string>('');
  const [activeLayer, setActiveLayer] = useState<'all' | 'physical' | 'datalink' | 'network' | 'transport'>('all');

  const filteredPackets = wiresharkPacketsData.filter((pkt) => {
    const f = displayFilter.trim().toLowerCase();
    if (!f) return true;
    if (f === 'quic') return pkt.protocol === 'QUIC';
    if (f === 'icmpv6') return pkt.protocol === 'ICMPv6';
    if (f.includes('443')) return pkt.protocol === 'QUIC';
    if (f.includes('135')) return pkt.info.includes('Solicitation');
    if (f.includes('136')) return pkt.info.includes('Advertisement');
    if (f.includes('len') || f.includes('1000')) return pkt.length > 500;
    return (
      pkt.protocol.toLowerCase().includes(f) ||
      pkt.info.toLowerCase().includes(f) ||
      pkt.source.toLowerCase().includes(f) ||
      pkt.destination.toLowerCase().includes(f)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase mb-1">
          <Network className="w-4 h-4" />
          <span>Módulo 04 • Documentos #05, #14 e #15 (Aulas de Redes &amp; Laboratório Wireshark)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Fundamentos de Redes, Protocolos TCP/IP &amp; Análise com Wireshark
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Modelo OSI vs TCP/IP, Descoberta com Advanced IP Scanner, Three-Way Handshake TCP e Dissecação Real de Pacotes <strong>QUIC (HTTP/3)</strong> e <strong>ICMPv6 (NDP)</strong> mascarados.
        </p>
      </div>

      {/* Comparativo Conceitual: Camadas e Descoberta */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Descoberta IP Scanner */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-purple-400" />
            <span>Descoberta de Rede &amp; Identificadores (Advanced IP Scanner)</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400 block font-mono">
                Endereço MAC (Camada 2 - Enlace):
              </span>
              <p>
                Identificador físico de 48 bits fixado na placa de rede (NIC). Os primeiros 24 bits (OUI - Organizationally Unique Identifier) identificam o fabricante de hardware (ex.: <code>54:35:30:XX:XX:XX</code> — Hon Hai Precision; <code>10:e8:3a:XX:XX:XX</code> — Roteador FiberX). Não trafega fora da rede local.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 block font-mono">
                Endereço IP (Camada 3 - Rede):
              </span>
              <p>
                Endereço lógico e roteável (IPv4 <code>192.168.1.0/24</code> ou IPv6 <code>2804:4540:...</code>) necessário para o encaminhamento de pacotes entre sub-redes e pela internet global.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
              <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Por que a falta de resposta ao Ping NÃO prova que o host está desligado?
              </span>
              <p className="text-slate-300">
                Firewalls de Host modernos (como Windows Defender Firewall) descartam silenciosamente requisições ICMP Echo Request (política <strong>DROP</strong>). Além disso, roteadores Wi-Fi com <strong>AP Isolation (Isolamento de Clientes)</strong> impedem a comunicação direta entre dispositivos na mesma rede sem fio.
              </p>
            </div>
          </div>
        </div>

        {/* Handshake TCP vs QUIC */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span>TCP Three-Way Handshake vs Protocolo QUIC (HTTP/3)</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono space-y-1">
              <div className="text-cyan-400 font-bold mb-1">// TCP THREE-WAY HANDSHAKE TRADICIONAL</div>
              <div>
                1. Cliente → Servidor: <span className="text-amber-300 font-bold">[SYN]</span> (Seq=0)
              </div>
              <div>
                2. Servidor → Cliente: <span className="text-emerald-300 font-bold">[SYN, ACK]</span> (Seq=0, Ack=1)
              </div>
              <div>
                3. Cliente → Servidor: <span className="text-purple-300 font-bold">[ACK]</span> (Seq=1, Ack=1) Conexão Estabelecida!
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Filtro Wireshark de auditoria: <code>tcp.flags.syn == 1</code>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/30 space-y-1.5">
              <span className="font-bold text-purple-300 block">
                A Revolução do Protocolo QUIC (UDP / Porta 443):
              </span>
              <p className="text-slate-300">
                No HTTP/3, o protocolo QUIC opera sobre <strong>UDP na porta 443</strong>, unificando o handshake de transporte e a negociação criptográfica <strong>TLS 1.3</strong> em um único processo.
              </p>
              <p className="text-slate-300">
                A partir do frame de <strong>Protected Payload (KP0 - Key Phase 0)</strong>, todo o tráfego da aplicação é protegido criptograficamente contra bisbilhoteiros (sniffers) na rede local.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULADOR INTERATIVO: DISSECADOR WIRESHARK v4.6.9 */}
      <div id="sim-wireshark" className="glass-card rounded-2xl p-6 border-2 border-purple-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              LABORATÓRIO PRÁTICO • CLIQUE EM QUALQUER PACOTE PARA DISSECAR AS CAMADAS
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Dissecador Interativo Wireshark v4.6.9 (QUIC &amp; ICMPv6 NDP)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
            Anonimização Ativa: IPs e MACs Oficiais Mascarados
          </span>
        </div>

        {/* Wireshark Display Filter Toolbar */}
        <div className="bg-slate-100 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-300 dark:border-slate-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-400 font-bold whitespace-nowrap">
              Display Filter:
            </span>
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={displayFilter}
                onChange={(e) => setDisplayFilter(e.target.value)}
                placeholder="Ex: quic, icmpv6, udp.port == 443, icmpv6.type == 135"
                className="w-full bg-emerald-50 dark:bg-[#0a1810] border border-emerald-600/60 dark:border-emerald-500/60 focus:border-emerald-600 dark:focus:border-emerald-400 rounded-lg pl-3 pr-8 py-1.5 font-mono text-xs text-emerald-900 dark:text-emerald-300 placeholder-emerald-700/60 focus:outline-none"
              />
              {displayFilter && (
                <button
                  onClick={() => setDisplayFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-emerald-700 dark:text-emerald-500 hover:text-slate-950 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-400 whitespace-nowrap">
              {filteredPackets.length} de {wiresharkPacketsData.length} exibidos
            </span>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-900">
            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-500">Atalhos rápidos:</span>
            {[
              { label: 'Todos', filter: '' },
              { label: 'quic (UDP 443)', filter: 'quic' },
              { label: 'icmpv6 (NDP)', filter: 'icmpv6' },
              { label: 'Neighbor Solicitation (135)', filter: '135' },
              { label: 'Neighbor Advertisement (136)', filter: '136' },
              { label: 'frame.len > 500 (Initial)', filter: '1000' }
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setDisplayFilter(btn.filter)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer ${
                  displayFilter === btn.filter
                    ? 'bg-purple-600 text-white keep-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Pacotes do Relatório Real */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-800">
                <th className="py-2.5 px-3">No.</th>
                <th className="py-2.5 px-3">Time (s)</th>
                <th className="py-2.5 px-3">Source (Mascarado)</th>
                <th className="py-2.5 px-3">Destination (Mascarado)</th>
                <th className="py-2.5 px-3">Protocol</th>
                <th className="py-2.5 px-3">Length</th>
                <th className="py-2.5 px-3">Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
              {filteredPackets.map((pkt: WiresharkPacket) => {
                const isSelected = selectedPacket.number === pkt.number;
                return (
                  <tr
                    key={pkt.number}
                    onClick={() => {
                      setSelectedPacket(pkt);
                      setActiveLayer('all');
                    }}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-600/25 border-l-4 border-l-purple-600 dark:border-l-purple-400'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-900/80'
                    }`}
                  >
                    <td className="py-2 px-3 text-purple-700 dark:text-purple-400 font-bold">{pkt.number}</td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-400">{pkt.time}</td>
                    <td className="py-2 px-3 text-slate-900 dark:text-slate-200 truncate max-w-[190px]">{pkt.source}</td>
                    <td className="py-2 px-3 text-slate-900 dark:text-slate-200 truncate max-w-[190px]">{pkt.destination}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          pkt.protocol === 'QUIC'
                            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300'
                            : 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300'
                        }`}
                      >
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-400">{pkt.length} B</td>
                    <td className="py-2 px-3 text-slate-800 dark:text-slate-300 truncate max-w-[260px]">{pkt.info}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Painel de Dissecação de Camadas do Pacote Selecionado */}
        <div className="terminal-bg rounded-xl p-5 font-mono text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <span className="text-amber-400 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              DESMEMBRAMENTO DE CAMADAS OSI/TCP-IP — FRAME #{selectedPacket.number} ({selectedPacket.length} Bytes)
            </span>
            <span className="text-slate-400 text-[11px]">
              Protocolo: <span className="text-white font-bold">{selectedPacket.protocol}</span>
            </span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <span className="text-cyan-400 font-bold block mb-0.5">[Camada 1 - Física]:</span>
              <p className="text-slate-300">{selectedPacket.layers.physical}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <span className="text-purple-400 font-bold block mb-0.5">[Camada 2 - Enlace (Ethernet II)]:</span>
              <p className="text-slate-300">{selectedPacket.layers.datalink}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <span className="text-emerald-400 font-bold block mb-0.5">[Camada 3 - Rede (IPv6)]:</span>
              <p className="text-slate-300">{selectedPacket.layers.network}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <span className="text-amber-400 font-bold block mb-0.5">
                [Camada 4 - Transporte / Controle ({selectedPacket.protocol})]:
              </span>
              <p className="text-slate-300">{selectedPacket.layers.transport}</p>
            </div>
          </div>

          {/* Hex Snippet */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-slate-500" />
              <span>Bytes Brutos Inspecionados no Frame:</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black font-mono text-[11px] text-emerald-400 select-all overflow-x-auto">
              {selectedPacket.hexSnippet}
            </div>
          </div>
        </div>

        {/* Resumo Teórico do NDP */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <span className="font-bold text-cyan-400 block font-mono">
            Conclusão do Laboratório (ICMPv6 NDP e a Extinção do Broadcast):
          </span>
          <p>
            Os frames <strong>#221, #222 e #225</strong> comprovam que o IPv6 não utiliza o ruidoso protocolo ARP (Address Resolution Protocol). Em seu lugar, o <strong>Neighbor Discovery Protocol (NDP)</strong> opera através de mensagens ICMPv6 do tipo 135 (Neighbor Solicitation) e 136 (Neighbor Advertisement) enviadas para grupos <strong>Multicast de Nó Solicitado</strong>, poupando o processamento de todos os outros dispositivos da rede!
          </p>
        </div>
      </div>

      {/* Laboratório Interativo de Defesa: Ataque Brute Force & Mitigação */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
        <div
          className={`p-6 rounded-2xl border transition-all ${
            isLightMode
              ? 'bg-gradient-to-r from-red-50/80 via-white to-slate-50 border-red-200 shadow-sm'
              : 'glass-card border-red-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/25'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 animate-pulse text-red-500" />
                  Laboratório Prático Integrado
                </span>
                <span className="text-xs font-mono text-slate-500">Módulo 04 / 05</span>
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Simulador de Ataque Brute Force &amp; Mitigação no Firewall
              </h3>
              <p className={`text-xs max-w-2xl leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                Conecte a teoria de tráfego de redes à prática de SOC: inspecione logs do servidor sob inundação de requisições maliciosas na porta 22 (SSH) e aplique regras de bloqueio com <code>iptables DROP</code> e <code>fail2ban</code>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowInlineBruteForceLab(!showInlineBruteForceLab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                }`}
              >
                <span>{showInlineBruteForceLab ? 'Ocultar Simulador' : 'Praticar Aqui no Módulo 4'}</span>
                {showInlineBruteForceLab ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {onNavigateToLab && (
                <button
                  onClick={() => onNavigateToLab('mod5', 'sim-bruteforce')}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-md shadow-red-600/20 whitespace-nowrap"
                >
                  <span>Ir para Módulo 5 (Firewall)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {showInlineBruteForceLab && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
              <BruteForceLab isLightMode={isLightMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export interface PillarProficiency {
  module: string;
  pillar: string;
  subject: string;
  score: number;
  benchmark: number;
  fullMark: number;
  level: string;
  description: string;
  keySkills: string[];
  tabId: string;
}

interface SecurityRadarChartProps {
  isLightMode?: boolean;
  onNavigateModule?: (moduleId: string) => void;
}

export const SecurityRadarChart: React.FC<SecurityRadarChartProps> = ({
  isLightMode = false,
  onNavigateModule
}) => {
  const [data, setData] = useState<PillarProficiency[]>([
    {
      module: 'Módulo 1',
      pillar: 'Fundamentos CIA',
      subject: 'Tríade CIA & Resiliência',
      score: 95,
      benchmark: 80,
      fullMark: 100,
      level: 'Especialista',
      description: 'Domínio da Tríade CIA, dependências corporativas (Horizonte) e caso AWS.',
      keySkills: ['Classificação CIA', 'Modelo Responsabilidade Nuvem', 'NTP/DNS/DHCP'],
      tabId: 'mod1'
    },
    {
      module: 'Módulo 2',
      pillar: 'NIST CSF 2.0 & SOC',
      subject: 'Governança & Triagem',
      score: 90,
      benchmark: 85,
      fullMark: 100,
      level: 'Avançado',
      description: 'Atuação das 6 funções do NIST 2.0 e triagem automatizada ALT-042.',
      keySkills: ['Playbooks Blue Team', 'Contenção OAuth2', 'Correlação de Logs'],
      tabId: 'mod2'
    },
    {
      module: 'Módulo 3',
      pillar: 'Riscos & BIA',
      subject: 'Gestão de Riscos (Aurora)',
      score: 88,
      benchmark: 75,
      fullMark: 100,
      level: 'Avançado',
      description: 'Matriz 5x5, cálculo de risco residual, RTO (4h), RPO (1h) e gestão de terceiros.',
      keySkills: ['Cálculo 5x5 Risco', 'Inventário 8 Ativos', 'Backups WORM / NexoTI'],
      tabId: 'mod3'
    },
    {
      module: 'Módulo 4',
      pillar: 'Redes & Protocolos',
      subject: 'Inspeção Wireshark',
      score: 94,
      benchmark: 80,
      fullMark: 100,
      level: 'Especialista',
      description: 'Dissecação QUIC (HTTP/3 KP0 sobre UDP 443) e ICMPv6 Neighbor Discovery (NDP).',
      keySkills: ['Wireshark v4.6', 'Three-Way Handshake TCP', 'Neighbor Discovery IPv6'],
      tabId: 'mod4'
    },
    {
      module: 'Módulo 5',
      pillar: 'Defesa Perimetral',
      subject: 'Hardening & NetSim',
      score: 92,
      benchmark: 85,
      fullMark: 100,
      level: 'Especialista',
      description: 'Firewall stateful conntrack, política DROP padrão e isolamento em 3 zonas.',
      keySkills: ['iptables Stateful', 'Isolamento 3 Zonas', 'Auditoria SSH pc2'],
      tabId: 'mod5'
    },
    {
      module: 'Módulo 6',
      pillar: 'IAM & Autorização',
      subject: 'Motor Híbrido H1',
      score: 98,
      benchmark: 85,
      fullMark: 100,
      level: 'Sênior Homologado',
      description: 'Arquitetura XACML PEP/PDP/PIP/PAP, SoD corporativo e Modelo Híbrido RBAC+ABAC.',
      keySkills: ['Motor H1 Decisão', 'Regra A1 Ausente!=Permitido', 'FIDO2 / WebAuthn'],
      tabId: 'mod6'
    }
  ]);

  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [selectedPillar, setSelectedPillar] = useState<PillarProficiency>(data[5]);

  // Overall readiness index
  const averageScore = Math.round(
    data.reduce((acc, curr) => acc + curr.score, 0) / data.length
  );

  // Quick boost or reset simulation
  const handleBoostAll = () => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        score: Math.min(100, item.score + 5)
      }))
    );
  };

  const handleResetScores = () => {
    setData([
      { ...data[0], score: 95 },
      { ...data[1], score: 90 },
      { ...data[2], score: 88 },
      { ...data[3], score: 94 },
      { ...data[4], score: 92 },
      { ...data[5], score: 98 }
    ]);
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload as PillarProficiency;
      return (
        <div
          className={`p-3.5 rounded-xl border text-xs shadow-xl backdrop-blur-md ${
            isLightMode
              ? 'bg-white/95 border-slate-300 text-slate-800'
              : 'bg-slate-950/95 border-slate-700 text-slate-100'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-bold text-red-500 font-mono">{pData.module}</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isLightMode ? 'bg-red-100 text-red-700' : 'bg-red-500/20 text-red-300'
              }`}
            >
              {pData.level}
            </span>
          </div>
          <p className="font-bold text-sm mb-1">{pData.subject}</p>
          <p className="text-[11px] text-slate-400 mb-2">{pData.pillar}</p>
          <div className="space-y-1 font-mono text-[11px] pt-1 border-t border-slate-700/40">
            <div className="flex items-center justify-between gap-4">
              <span className="text-emerald-500 font-semibold">Proficiência Aluno:</span>
              <strong className="text-emerald-400">{pData.score}%</strong>
            </div>
            {showBenchmark && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-cyan-500">Benchmark SOC:</span>
                <strong className="text-cyan-400">{pData.benchmark}%</strong>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`glass-card rounded-3xl p-6 sm:p-7 border transition-all duration-200 ${
        isLightMode
          ? 'bg-white/95 border-slate-200 shadow-xl text-slate-800'
          : 'border-slate-800 text-slate-100'
      }`}
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-slate-800/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 font-bold">Matriz Hexagonal de Proficiência</span>
            <span className="text-slate-400">• Recharts Interativo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Nível de Competência nos 6 Módulos de Defesa
          </h3>
          <p
            className={`text-xs sm:text-sm mt-1 leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Avaliação multidimensional de prontidão operacional baseada nos laboratórios, relatórios técnicos e simulados.
          </p>
        </div>

        {/* Global Score & Toggles */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className={`px-3.5 py-2 rounded-2xl border flex items-center gap-3 ${
              isLightMode
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center">
              <Award className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <span className="text-[10px] font-mono block text-slate-400 uppercase font-semibold">
                Índice SOC Médio
              </span>
              <div className="text-lg font-extrabold font-mono text-red-500 leading-none">
                {averageScore}% <span className="text-xs text-slate-400 font-normal">/ 100%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBenchmark((prev) => !prev)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
              showBenchmark
                ? isLightMode
                  ? 'bg-cyan-50 border-cyan-300 text-cyan-800'
                  : 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300'
                : isLightMode
                ? 'bg-slate-100 border-slate-300 text-slate-600'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showBenchmark ? 'Ocultar Benchmark' : 'Comparar Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Detailed Pillar Inspector */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Radar Chart (Recharts) */}
        <div className="lg:col-span-7 h-[360px] sm:h-[400px] w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="75%">
              <PolarGrid
                stroke={isLightMode ? '#cbd5e1' : '#334155'}
                strokeDasharray="3 3"
              />
              <PolarAngleAxis
                dataKey="pillar"
                tick={{
                  fill: isLightMode ? '#1e293b' : '#cbd5e1',
                  fontSize: 11,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: isLightMode ? '#64748b' : '#94a3b8', fontSize: 10 }}
              />
              <Radar
                name="Proficiência do Aluno (%)"
                dataKey="score"
                stroke="#eb1700"
                fill="#eb1700"
                fillOpacity={0.45}
                isAnimationActive={true}
              />
              {showBenchmark && (
                <Radar
                  name="Benchmark SOC Recomendado (%)"
                  dataKey="benchmark"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.15}
                  strokeDasharray="4 4"
                  isAnimationActive={true}
                />
              )}
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Pillar Selector & Deep-Dive Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-mono font-bold uppercase ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Selecione o Módulo para Inspecionar:
            </span>
            <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 6/6 Concluídos
            </span>
          </div>

          {/* Quick Pillar Pills */}
          <div className="grid grid-cols-2 gap-2">
            {data.map((item) => {
              const isSel = selectedPillar.module === item.module;
              return (
                <button
                  key={item.module}
                  onClick={() => setSelectedPillar(item)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition cursor-pointer flex flex-col justify-between ${
                    isSel
                      ? 'border-red-500 bg-red-500/10 shadow-sm'
                      : isLightMode
                      ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className={isSel ? 'text-red-500 font-bold' : 'text-slate-400'}>
                      {item.module}
                    </span>
                    <strong className={isSel ? 'text-red-500' : 'text-emerald-500'}>
                      {item.score}%
                    </strong>
                  </div>
                  <span className="font-semibold truncate text-[11px] mt-0.5">{item.pillar}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Pillar Card */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLightMode
                ? 'bg-slate-50/90 border-slate-200'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-red-500">
                    {selectedPillar.module}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isLightMode ? 'bg-red-100 text-red-700' : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {selectedPillar.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold mt-1 text-slate-900 dark:text-white">
                  {selectedPillar.subject}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-extrabold text-emerald-500 block">
                  {selectedPillar.score}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Proficiência</span>
              </div>
            </div>

            <p
              className={`text-xs leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {selectedPillar.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Habilidades Validadas em Laboratório:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPillar.keySkills.map((sk) => (
                  <span
                    key={sk}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isLightMode
                        ? 'bg-white border-slate-200 text-slate-700'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {onNavigateModule && (
              <button
                onClick={() => onNavigateModule(selectedPillar.tabId)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
              >
                <span>Acessar Laboratórios &amp; Teoria do {selectedPillar.module}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

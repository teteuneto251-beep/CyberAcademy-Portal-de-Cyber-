import React, { useState } from 'react';
import {
  BarChart3,
  Boxes,
  Scale,
  Calculator,
  ShieldCheck,
  AlertOctagon,
  Clock,
  Building,
  CheckCircle2,
  Filter,
  Database
} from 'lucide-react';
import { auroraAssetsData, auroraRisksData, AuroraAsset, AuroraRisk } from '../data/modulesData';

interface Module3ViewProps {
  isLightMode?: boolean;
}

export const Module3View: React.FC<Module3ViewProps> = ({ isLightMode = false }) => {
  const [assetFilter, setAssetFilter] = useState<string>('Todos');
  const [heatmapMode, setHeatmapMode] = useState<'inerente' | 'residual' | 'ambos'>('inerente');
  const [selectedRiskPin, setSelectedRiskPin] = useState<string | null>('G01-RSK-03');

  // Interactive 5x5 Calculator State
  const [calcProb, setCalcProb] = useState<number>(4);
  const [calcImpact, setCalcImpact] = useState<number>(5);

  const calcScore = calcProb * calcImpact;
  let calcLevel = 'Crítico';
  let calcBadgeColor = 'bg-red-600 text-white';
  let calcAction = 'Intervenção Imediata da Diretoria e Contenção em 24 Horas.';

  if (calcScore < 5) {
    calcLevel = 'Baixo';
    calcBadgeColor = 'bg-emerald-600 text-white';
    calcAction = 'Monitoramento Contínuo e Aceitação com Registro em Ata de Risco.';
  } else if (calcScore < 10) {
    calcLevel = 'Médio';
    calcBadgeColor = 'bg-amber-600 text-white';
    calcAction = 'Plano de Ação Corretivo em até 30 Dias com Salvaguardas Compensatórias.';
  } else if (calcScore < 15) {
    calcLevel = 'Alto';
    calcBadgeColor = 'bg-orange-600 text-white';
    calcAction = 'Mitigação Prioritária em até 7 Dias com Alocação de Recursos Especializados.';
  }

  const filteredAssets = auroraAssetsData.filter((a) => {
    if (assetFilter === 'Todos') return true;
    return a.criticality === assetFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header with Risk Management Showcase */}
      <div
        className={`relative rounded-2xl overflow-hidden border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
          isLightMode
            ? 'bg-gradient-to-r from-amber-50/90 via-white to-yellow-50/70 border-amber-200 shadow-sm'
            : 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-yellow-950/30 border-amber-500/25 shadow-lg'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono uppercase">
            <BarChart3 className="w-4 h-4" />
            <span>Módulo 03 • Documentos #04, #12 e #13 (Workbook &amp; Diagnóstico Aurora)</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Gestão de Riscos &amp; Diagnóstico: Aurora Distribuição Corporativa
          </h2>
          <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Material do <strong>Prof. Rômulo Pereira de Almeida</strong> com análise de 48 colaboradores, 120 pedidos/dia, tolerância manual de até 2 horas, meta de <strong>RTO de 4h</strong>, <strong>RPO de 1h</strong> e auditoria da prestadora terceirizada NexoTI.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-56 h-36 rounded-xl overflow-hidden border border-amber-500/30 shadow-md relative group cyber-img-box">
          <img
            src="/assets/aistudio/Corporate_risk_management_execut__20261024192245_dfa047d3.jpg"
            alt="Corporate Risk Management Boardroom"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="cyber-img-overlay" />
          <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            isLightMode ? 'bg-white/90 text-amber-900 border-amber-200' : 'bg-slate-950/80 text-amber-300 border-amber-500/30'
          }`}>
            Matriz 5x5 · Aurora Dist.
          </span>
        </div>
      </div>

      {/* Parâmetros Críticos do Caso Aurora */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>RTO (Tempo Máximo)</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">4 Horas</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tempo limite para restabelecer o portal</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>RPO (Perda Tolerada)</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">1 Hora</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Janela máxima de transações perdidas</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tolerância Manual</span>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">2 Horas</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Limite sem gerar colapso logístico</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Terceirizada (TI)</span>
            <Building className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-lg font-bold font-mono text-white mt-1 truncate">NexoTI</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sem SLA e com senhas mestras</p>
        </div>
      </div>

      {/* Tabela Oficial dos 8 Ativos Mínimos (G01-ATV-01 a 08) */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-amber-400" />
              <span>1. Inventário de Ativos Mapeados (G01-ATV-01 a G01-ATV-08)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identificação técnica conforme os relatos de auditoria C01 a C07 do Caso Aurora
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-0.5 text-xs">
              {['Todos', 'Crítica', 'Alta', 'Média/Alta'].map((crit) => (
                <button
                  key={crit}
                  onClick={() => setAssetFilter(crit)}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                    assetFilter === crit
                      ? 'bg-amber-600 text-white font-bold shadow-xs keep-white'
                      : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  {crit}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-400 font-mono">
                <th className="py-3 px-3">ID Ativo</th>
                <th className="py-3 px-3">Nome do Ativo</th>
                <th className="py-3 px-3">Tipo / Ambiente</th>
                <th className="py-3 px-3">Criticidade</th>
                <th className="py-3 px-3">Vulnerabilidade Observada</th>
                <th className="py-3 px-3">Impacto no Negócio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
              {filteredAssets.map((asset: AuroraAsset) => (
                <tr key={asset.id} className="hover:bg-slate-100 dark:hover:bg-slate-900/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">
                    {asset.id}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {asset.name}
                  </td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-300 whitespace-nowrap">
                    {asset.type}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                        asset.criticality === 'Crítica'
                          ? 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
                          : asset.criticality === 'Alta'
                          ? 'bg-orange-500/20 text-orange-800 dark:text-orange-300 border border-orange-500/30'
                          : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-400 min-w-[220px]">
                    {asset.vulnerabilities}
                  </td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-300 min-w-[220px]">
                    {asset.businessImpact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz de Riscos: Inerente vs Residual */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-red-400" />
              <span>2. Matriz de Riscos 5x5: Risco Inerente vs Residual (Workbook Oficial)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cálculo baseado na fórmula metodológica: <strong>Severidade = Probabilidade (1 a 5) × Impacto (1 a 5)</strong>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-3 px-3">ID Risco</th>
                <th className="py-3 px-3">Cenário de Ameaça</th>
                <th className="py-3 px-3">Inerente (P × I)</th>
                <th className="py-3 px-3">Plano de Ação Proposto</th>
                <th className="py-3 px-3">NIST CSF</th>
                <th className="py-3 px-3">Residual (P × I)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {auroraRisksData.map((risk: AuroraRisk) => (
                <tr
                  key={risk.id}
                  className={`transition ${
                    risk.id === 'G01-RSK-03' ? 'bg-red-950/20' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="py-3.5 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                    {risk.id}
                    {risk.id === 'G01-RSK-03' && (
                      <span className="block text-[10px] text-red-400 font-bold">PRIORITÁRIO</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 min-w-[200px]">
                    <div className="font-semibold text-white">{risk.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{risk.description}</div>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded font-mono font-bold text-xs ${
                        risk.levelInherent === 'Crítico'
                          ? 'bg-red-600 text-white'
                          : risk.levelInherent === 'Alto'
                          ? 'bg-orange-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {risk.probInherent} × {risk.impactInherent} = {risk.scoreInherent} ({risk.levelInherent})
                    </span>
                  </td>
                  <td className="py-3.5 px-3 min-w-[220px] text-slate-300">
                    {risk.mitigationPlan}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-cyan-400 whitespace-nowrap">
                    {risk.nistFunction}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded font-mono font-bold text-xs ${
                        risk.levelResidual === 'Médio'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {risk.probResidual} × {risk.impactResidual} = {risk.scoreResidual} ({risk.levelResidual})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HEATMAP INTERATIVO 5x5: MATRIZ DE CALOR DOS RISCOS AURORA */}
      <div className="glass-card rounded-2xl p-6 border-2 border-amber-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              VISUALIZADOR TÉCNICO • METODOLOGIA NIST / ISO 31000
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Mapa de Calor (Heatmap 5×5) dos Riscos da Aurora Distribuição
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualize o deslocamento da severidade dos riscos após a aplicação dos controles defensivos:
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-1 text-xs font-mono">
            <button
              onClick={() => setHeatmapMode('inerente')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                heatmapMode === 'inerente'
                  ? 'bg-red-600 text-white font-bold shadow keep-white'
                  : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Risco Inerente (Antes)
            </button>
            <button
              onClick={() => setHeatmapMode('residual')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                heatmapMode === 'residual'
                  ? 'bg-emerald-600 text-white font-bold shadow keep-white'
                  : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Risco Residual (Após NIST)
            </button>
            <button
              onClick={() => setHeatmapMode('ambos')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                heatmapMode === 'ambos'
                  ? 'bg-cyan-600 text-white font-bold shadow keep-white'
                  : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Comparar Ambos
            </button>
          </div>
        </div>

        {/* Grade Visual 5x5 */}
        <div className="grid lg:grid-cols-3 gap-6 pt-2">
          {/* Matriz 5x5 */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pb-1">
              <span>Eixo Vertical: Probabilidade (1 a 5)</span>
              <span>Eixo Horizontal: Impacto no Negócio (1 a 5)</span>
            </div>

            <div className="grid grid-rows-5 gap-1.5 bg-slate-100 dark:bg-slate-950 p-3 rounded-2xl border border-slate-300 dark:border-slate-800">
              {[5, 4, 3, 2, 1].map((prob) => (
                <div key={prob} className="grid grid-cols-6 gap-1.5 items-center">
                  <div className="text-[11px] font-mono text-slate-800 dark:text-slate-400 font-bold text-center">
                    P{prob}
                  </div>
                  {[1, 2, 3, 4, 5].map((impact) => {
                    const score = prob * impact;
                    let cellBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-300';
                    if (score >= 15) {
                      cellBg = 'bg-red-50 dark:bg-red-950/70 border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-300';
                    } else if (score >= 10) {
                      cellBg = 'bg-orange-50 dark:bg-orange-950/70 border-orange-300 dark:border-orange-500/50 text-orange-900 dark:text-orange-300';
                    } else if (score >= 5) {
                      cellBg = 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-300';
                    }

                    // Encontrar riscos nesta célula
                    const matchingInherent = auroraRisksData.filter(
                      (r) => r.probInherent === prob && r.impactInherent === impact
                    );
                    const matchingResidual = auroraRisksData.filter(
                      (r) => r.probResidual === prob && r.impactResidual === impact
                    );

                    return (
                      <div
                        key={impact}
                        className={`h-14 rounded-xl border p-1 flex flex-col justify-between font-mono text-[10px] transition ${cellBg}`}
                      >
                        <div className="flex justify-between items-center text-[9px] font-semibold">
                          <span>{score}</span>
                          <span>{prob}×{impact}</span>
                        </div>

                        {/* Pins dos Riscos */}
                        <div className="flex flex-wrap gap-1">
                          {(heatmapMode === 'inerente' || heatmapMode === 'ambos') &&
                            matchingInherent.map((r) => (
                              <button
                                key={`inh-${r.id}`}
                                onClick={() => setSelectedRiskPin(r.id)}
                                className={`px-1 py-0.5 rounded text-[9px] font-bold transition cursor-pointer keep-white ${
                                  selectedRiskPin === r.id
                                    ? 'bg-red-600 text-white ring-2 ring-slate-900 dark:ring-white'
                                    : 'bg-red-600 text-white hover:bg-red-500'
                                }`}
                                title={`Inerente: ${r.name}`}
                              >
                                {r.id.replace('G01-RSK-', 'R')}
                              </button>
                            ))}

                          {(heatmapMode === 'residual' || heatmapMode === 'ambos') &&
                            matchingResidual.map((r) => (
                              <button
                                key={`res-${r.id}`}
                                onClick={() => setSelectedRiskPin(r.id)}
                                className={`px-1 py-0.5 rounded text-[9px] font-bold transition cursor-pointer keep-white ${
                                  selectedRiskPin === r.id
                                    ? 'bg-emerald-600 text-white ring-2 ring-slate-900 dark:ring-white'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                                }`}
                                title={`Residual: ${r.name}`}
                              >
                                {r.id.replace('G01-RSK-', 'R')}*
                              </button>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Baixo (1-4)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Médio (5-9)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-orange-500" /> Alto (10-14)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-red-600" /> Crítico (15-25)
              </span>
              <span className="text-slate-500">* Sufixo * = Risco Residual Tratado</span>
            </div>
          </div>

          {/* Painel do Risco Selecionado */}
          {(() => {
            const risk = auroraRisksData.find((r) => r.id === selectedRiskPin) || auroraRisksData[0];
            return (
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-amber-400">{risk.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {risk.nistFunction}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                    {risk.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {risk.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-red-400">Inerente: {risk.scoreInherent} ({risk.levelInherent})</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400 font-bold">Residual: {risk.scoreResidual} ({risk.levelResidual})</span>
                  </div>
                  <div className="text-[11px] text-slate-300 border-t border-slate-800/80 pt-2">
                    <strong className="text-cyan-300 block mb-0.5">Tratamento Aplicado:</strong>
                    {risk.mitigationPlan}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* CALCULADORA INTERATIVA DE RISCO 5x5 */}
      <div className="glass-card rounded-2xl p-6 border-2 border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Calculadora Didática Interativa de Severidade de Risco (5x5)
              </h3>
              <p className="text-xs text-slate-400">
                Ajuste a Probabilidade e o Impacto para simular o score de qualquer cenário corporativo:
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {/* Sliders */}
          <div className="space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Probabilidade de Ocorrência:</span>
                <span className="text-amber-400 font-bold">{calcProb} de 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={calcProb}
                onChange={(e) => setCalcProb(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 (Rara)</span>
                <span>2 (Pouco Provável)</span>
                <span>3 (Moderada)</span>
                <span>4 (Alta)</span>
                <span>5 (Quase Certa)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Impacto no Negócio:</span>
                <span className="text-red-400 font-bold">{calcImpact} de 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={calcImpact}
                onChange={(e) => setCalcImpact(parseInt(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 (Insignificante)</span>
                <span>2 (Menor)</span>
                <span>3 (Moderado)</span>
                <span>4 (Maior)</span>
                <span>5 (Catastrófico)</span>
              </div>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-mono text-slate-400">Resultado do Cálculo:</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl font-extrabold font-mono text-white">
                  {calcScore} <span className="text-xs font-normal text-slate-400">/ 25</span>
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${calcBadgeColor}`}>
                  Nível: {calcLevel}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block mb-1">
                Diretriz de Tratamento (NIST CSF 2.0):
              </span>
              <p className="text-slate-200 font-medium">{calcAction}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

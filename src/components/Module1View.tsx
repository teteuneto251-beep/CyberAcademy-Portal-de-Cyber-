import React, { useState } from 'react';
import {
  Compass,
  Shield,
  EyeOff,
  FileCheck,
  Server,
  Cloud,
  Network,
  Users,
  Award,
  Layers,
  Wrench,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { careersData, Career } from '../data/modulesData';

interface CiaScenario {
  id: number;
  incident: string;
  correctPillar: 'C' | 'I' | 'A';
  explanation: string;
}

const ciaScenariosData: CiaScenario[] = [
  {
    id: 1,
    incident: "Vazamento não autorizado de tabela confidencial de salários e bônus executivos enviada por engano para a lista de e-mails geral.",
    correctPillar: 'C',
    explanation: "Confidencialidade (C): A informação sensível foi visualizada por indivíduos sem privilégios autorizados para tal dado."
  },
  {
    id: 2,
    incident: "Invasor intercepta e altera o código de barras e a chave PIX de boletos de cobrança emitidos pelo ERP antes da entrega aos clientes.",
    correctPillar: 'I',
    explanation: "Integridade (I): Os dados foram modificados de forma não autorizada e maliciosa, comprometendo a autenticidade e precisão da cobrança."
  },
  {
    id: 3,
    incident: "Ataque DDoS volumétrico satura a largura de banda do firewall de borda e impede colaboradores e clientes de acessarem o portal corporativo.",
    correctPillar: 'A',
    explanation: "Disponibilidade (A): Os serviços e recursos legítimos tornaram-se inacessíveis para os usuários no momento necessário à operação."
  },
  {
    id: 4,
    incident: "Colaborador desligado da empresa mantém sua chave SSH ativa no servidor e consulta arquivos estratégicos do RH sem necessidade de trabalho.",
    correctPillar: 'C',
    explanation: "Confidencialidade (C): Falha no processo de desligamento (Leaver) permitiu que ex-funcionário sem relação ativa acessasse informações sigilosas."
  },
  {
    id: 5,
    incident: "Ransomware criptografa os volumes de armazenamento do banco de dados operacional, impedindo a expedição de 120 pedidos diários.",
    correctPillar: 'A',
    explanation: "Disponibilidade (A): A indisponibilidade forçada dos registros e sistemas paralisou a cadeia produtiva além do limite de tolerância operacional."
  },
  {
    id: 6,
    incident: "Script malicioso adultera silenciosamente o arquivo /etc/shadow e o histórico de auditoria do Linux para ocultar a criação de uma conta backdoor.",
    correctPillar: 'I',
    explanation: "Integridade (I): Houve quebra da integridade dos arquivos essenciais do sistema operacional e do log forense de segurança."
  }
];

interface Module1ViewProps {
  isLightMode?: boolean;
}

export const Module1View: React.FC<Module1ViewProps> = ({ isLightMode = false }) => {
  const [selectedCareer, setSelectedCareer] = useState<Career>(careersData[0]);
  const [ciaAnswers, setCiaAnswers] = useState<Record<number, 'C' | 'I' | 'A'>>({});

  const handleCiaSelect = (scenarioId: number, pillar: 'C' | 'I' | 'A') => {
    if (ciaAnswers[scenarioId]) return;
    setCiaAnswers((prev) => ({ ...prev, [scenarioId]: pillar }));
  };

  const handleCiaReset = () => {
    setCiaAnswers({});
  };

  const totalCia = ciaScenariosData.length;
  const answeredCia = Object.keys(ciaAnswers).length;
  const correctCiaCount = Object.entries(ciaAnswers).filter(([id, ans]) => {
    const sc = ciaScenariosData.find((s) => s.id === parseInt(id));
    return sc && sc.correctPillar === ans;
  }).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header with Image Showcase */}
      <div
        className={`relative rounded-2xl overflow-hidden border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
          isLightMode
            ? 'bg-gradient-to-r from-blue-50/90 via-white to-cyan-50/70 border-blue-200 shadow-sm'
            : 'bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 border-blue-500/25 shadow-lg'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 text-xs font-mono uppercase">
            <Compass className="w-4 h-4" />
            <span>Módulo 01 • Documentos #01 e #02</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Introdução à Cybersecurity, Carreiras &amp; Ambientes Corporativos
          </h2>
          <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
            Material didático do <strong>Prof. Rômulo Pereira de Almeida</strong> consolidando os guias fundamentais: <em>Panorama e Carreiras</em> e <em>Ambientes Corporativos (Caso Horizonte Serviços)</em>.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-56 h-36 rounded-xl overflow-hidden border border-blue-500/30 shadow-md relative group cyber-img-box">
          <img
            src="/assets/aistudio/Cybersecurity_shield_emblem_bann__20261024192254_8674da8a.jpg"
            alt="Cybersecurity Shield Emblem"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="cyber-img-overlay" />
          <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            isLightMode ? 'bg-white/90 text-blue-900 border-blue-200' : 'bg-slate-950/80 text-cyan-300 border-cyan-500/30'
          }`}>
            Tríade CIA &amp; Fundamentos
          </span>
        </div>
      </div>

      {/* Tríade CIA */}
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>Os Três Pilares da Segurança da Informação: Tríade CIA</span>
        </h3>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Confidencialidade */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-l-blue-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-base">Confidencialidade (C)</h4>
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <EyeOff className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Garantir que a informação seja acessível <strong>exclusivamente</strong> a indivíduos, processos ou sistemas devidamente autorizados, impedindo visualização indevida.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-blue-400 block">Cenários Práticos de Violação:</span>
              <p>• Planilha de folha de pagamento enviada por engano a um canal público.</p>
              <p>• Funcionário sem autorização consultando prontuários médicos ou dados bancários de clientes.</p>
            </div>
          </div>

          {/* Integridade */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-l-emerald-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-base">Integridade (I)</h4>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assegurar a exatidão, precisão e completeza dos dados, arquivos e configurações, prevenindo alterações não autorizadas, corrupção ou fraudes.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-emerald-400 block">Cenários Práticos de Violação:</span>
              <p>• Invasor adultera o código de barras ou a chave PIX de um boleto de cobrança em trânsito.</p>
              <p>• Alteração fraudulenta de histórico acadêmico ou modificação de arquivos de configuração do firewall.</p>
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-base">Disponibilidade (D / A)</h4>
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <Server className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Garantir que os serviços essenciais, dados críticos e sistemas corporativos estejam operacionais e acessíveis para os usuários sempre que necessários ao negócio.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-amber-400 block">Cenários Práticos de Violação:</span>
              <p>• Ataque de Ransomware que criptografa os discos do servidor de pedidos.</p>
              <p>• Queda de servidores DNS ou saturação de banda por ataque DDoS que derruba o portal de e-commerce.</p>
            </div>
          </div>
        </div>

        {/* Laboratório Interativo: Classificador de Incidentes CIA */}
        <div id="sim-cia" className="mt-6 glass-card rounded-2xl p-6 border border-blue-500/40 bg-gradient-to-b from-slate-900/90 to-blue-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Laboratório Interativo: Classificador de Incidentes da Tríade CIA</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
                    Prática Ativa
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Analise cada cenário real e classifique qual pilar da tríade foi primordialmente violado.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300">
                Progresso: <strong className="text-cyan-400">{answeredCia}/{totalCia}</strong> ({correctCiaCount} acertos)
              </span>
              <button
                onClick={handleCiaReset}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ciaScenariosData.map((sc) => {
              const userAns = ciaAnswers[sc.id];
              const isAnswered = !!userAns;
              const isCorrect = userAns === sc.correctPillar;

              return (
                <div
                  key={sc.id}
                  className={`p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/50'
                        : 'bg-red-950/20 border-red-500/50'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Cenário #{sc.id}</span>
                      {isAnswered && (
                        <span className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Correto' : 'Incorreto'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      &ldquo;{sc.incident}&rdquo;
                    </p>
                  </div>

                  {!isAnswered ? (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Qual pilar violado?</span>
                      <div className="flex-1 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCiaSelect(sc.id, 'C')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white dark:bg-blue-900/40 dark:hover:bg-blue-600/50 border border-blue-300 dark:border-blue-500/40 text-[11px] font-mono text-blue-700 dark:text-blue-300 font-semibold cursor-pointer transition shadow-xs"
                        >
                          [C] Confidencialidade
                        </button>
                        <button
                          onClick={() => handleCiaSelect(sc.id, 'I')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/40 dark:hover:bg-emerald-600/50 border border-emerald-300 dark:border-emerald-500/40 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold cursor-pointer transition shadow-xs"
                        >
                          [I] Integridade
                        </button>
                        <button
                          onClick={() => handleCiaSelect(sc.id, 'A')}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-600 hover:text-white dark:bg-amber-900/40 dark:hover:bg-amber-600/50 border border-amber-300 dark:border-amber-500/40 text-[11px] font-mono text-amber-800 dark:text-amber-300 font-semibold cursor-pointer transition shadow-xs"
                        >
                          [A] Disponibilidade
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] leading-relaxed space-y-1">
                      <div className="font-mono text-slate-300">
                        Sua resposta: <strong className="text-white">[{userAns}]</strong> | Resposta correta: <strong className="text-emerald-400">[{sc.correctPillar}]</strong>
                      </div>
                      <p className="text-slate-400 font-sans">{sc.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estudo de Caso Real: Incidente AWS Oriente Médio */}
      <div className="glass-card rounded-2xl p-6 border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold">
            ESTUDO DE CASO TÉCNICO • RESILIÊNCIA E NUVEM
          </span>
          <span className="text-xs font-mono text-slate-400">Setembro de 2026</span>
        </div>

        <h3 className="text-lg font-bold text-white">
          Caso AWS Oriente Médio: Resiliência Físico-Lógica e o Modelo de Responsabilidade Compartilhada
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          O caso analisado demonstra a ocorrência de danos físicos extremos que afetaram infraestruturas de telecomunicações no Bahrein e uma Zona de Disponibilidade (Availability Zone) nos Emirados Árabes Unidos.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-amber-300">
            Lição Central para Arquitetos de Segurança e Engenheiros:
          </p>
          <p>
            A contratação de serviços em nuvem <strong>não terceiriza a responsabilidade estratégica do cliente</strong>. Embora o provedor responda pela segurança física dos datacenters (Segurança <em>DA</em> Nuvem), cabe à empresa cliente projetar arquiteturas com redundância multi-região, rotinas independentes de backup fora da região primária, políticas de identidade rígidas e planos testados de continuidade de negócios (DRP - Disaster Recovery Plan).
          </p>
        </div>
      </div>

      {/* A Empresa como Conjunto de Dependências (Caso Horizonte Serviços) */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <span>Arquitetura de Dependências Corporativas (Caso Horizonte Serviços)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Guia de Estudos #02</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <em>&ldquo;O ativo mais caro não é necessariamente o mais crítico. Um pequeno serviço de resolução de nomes ou sincronização de relógio pode derrubar a cadeia inteira de autenticação.&rdquo;</em>
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs">
                <th className="py-3 px-4">Camada Corporativa</th>
                <th className="py-3 px-4">Exemplo Prático</th>
                <th className="py-3 px-4">Dependência Direta</th>
                <th className="py-3 px-4">Serviços Base Fundamentais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-blue-400 flex items-center gap-2">
                  <Users className="w-4 h-4" /> 1. Pessoas &amp; Identidade
                </td>
                <td className="py-3.5 px-4">Analista financeiro e conta corporativa</td>
                <td className="py-3.5 px-4">Autenticação (MFA / SSO) e permissões de acesso</td>
                <td className="py-3.5 px-4 font-mono text-slate-300">Active Directory / IdP / IAM / PAM</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-emerald-400 flex items-center gap-2">
                  <Network className="w-4 h-4" /> 2. Dispositivos &amp; Rede
                </td>
                <td className="py-3.5 px-4">Endpoints (Notebooks corporativos), Wi-Fi e Switches</td>
                <td className="py-3.5 px-4">Energia ininterrupta, links de fibra, SO e patches</td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="text-amber-300 font-bold">DHCP</span> (IPs),{' '}
                  <span className="text-amber-300 font-bold">DNS</span> (Nomes),{' '}
                  <span className="text-amber-300 font-bold">NTP</span> (Relógio e Logs)
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-purple-400 flex items-center gap-2">
                  <Server className="w-4 h-4" /> 3. Aplicações &amp; Serviços
                </td>
                <td className="py-3.5 px-4">Sistema Web de Pedidos / ERP corporativo</td>
                <td className="py-3.5 px-4">Servidores de aplicação, contêineres e APIs seguras</td>
                <td className="py-3.5 px-4 font-mono text-slate-300">HTTPS, Certificados TLS, WAF, Firewalls</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-rose-400 flex items-center gap-2">
                  <Cloud className="w-4 h-4" /> 4. Dados &amp; Continuidade
                </td>
                <td className="py-3.5 px-4">Banco de dados de clientes e rotinas de backup</td>
                <td className="py-3.5 px-4">Armazenamento íntegro, criptografia e testes de restore</td>
                <td className="py-3.5 px-4 font-mono text-slate-300">Backup Imutável (WORM), DLP, SIEM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Explorador Interativo das 8 Carreiras de Cybersecurity */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span>Mapeamento Interativo das 8 Áreas de Atuação em Cybersecurity</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Selecione uma área abaixo para explorar o perfil técnico, ferramentas e certificações recomendadas pelo mercado:
          </p>
        </div>

        {/* Career selection tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {careersData.map((career) => {
            const isSelected = selectedCareer.id === career.id;
            return (
              <button
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 keep-white'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`truncate ${isSelected ? 'text-white keep-white font-bold' : 'text-slate-800 dark:text-slate-300'}`}>
                  {career.title.split('(')[0].trim()}
                </span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-white keep-white flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Selected career detail box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/15 text-blue-400 font-bold">
                {selectedCareer.tag}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                {selectedCareer.title}
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedCareer.description}
          </p>

          <div className="grid md:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-xs font-bold text-slate-400 font-mono block mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" /> Competências-Chave:
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                {selectedCareer.keySkills.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 font-mono block mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" /> Ferramentas Utilizadas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCareer.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 font-mono block mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Certificações de Destaque:
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                {selectedCareer.certifications.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-semibold text-amber-300">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

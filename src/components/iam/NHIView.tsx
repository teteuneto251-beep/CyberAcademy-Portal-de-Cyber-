import React, { useState } from 'react';
import {
  Cpu,
  KeyRound,
  Shield,
  Download,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  GitBranch,
  Terminal,
  Server,
  Zap,
  Lock,
  RotateCw,
  Eye,
  FileText,
  Sparkles
} from 'lucide-react';

interface NHIViewProps {
  isLightMode?: boolean;
}

export const NHIView: React.FC<NHIViewProps> = ({ isLightMode = false }) => {
  const [activeTab, setActiveTab] = useState<'wif' | 'microtarefas' | 'inventario'>('wif');
  const [wifArchitecture, setWifArchitecture] = useState<'static_keys' | 'wif_zerotrust'>('wif_zerotrust');
  const [activeMicrotask, setActiveMicrotask] = useState<number>(1);

  const microtasks = [
    {
      id: 1,
      title: 'Microtarefa 1: Descoberta e Inventário Automatizado de NHIs',
      problem: 'Ambientes corporativos acumulam dezenas de service accounts, tokens de acesso pessoal (PATs) e chaves de API sem documentação nem dono (órfãs).',
      solucao: 'Implementação de esteira de descoberta contínua varrendo repositórios Git, clusters Kubernetes e instâncias cloud. Criação de tags obrigatórias: Owner, Workload, Environment e ExpirationDate.',
      comando: `# Varredura de credenciais órfãs via CLI em Cloud
aws iam list-access-keys --user-name svc-payment-backend
# Identificação de chaves não utilizadas nos últimos 30 dias:
# Output: KeyId: AKIA... Status: Inactive / LastUsedDate: 45 dias atrás -> [REVOGAÇÃO PROGRAMADA]`,
      metric: 'Redução de 78% em credenciais órfãs em 30 dias.'
    },
    {
      id: 2,
      title: 'Microtarefa 2: Delimitação de Blast Radius (Escopo & Restrição de IP)',
      problem: 'Uma credencial de automação vazada possuía permissões de Administrador (*:*) e podia ser utilizada a partir de qualquer IP da internet.',
      solucao: 'Modelagem rigorosa de menor privilégio (Princípio do Menor Privilégio). Condição de IP de origem (aws:SourceIp) obrigando uso de VPN corporativa ou VPC endpoints privados.',
      comando: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::empresa-financeiro-prod/*",
    "Condition": {
      "IpAddress": { "aws:SourceIp": ["10.0.0.0/16", "200.180.10.5/32"] }
    }
  }]
}`,
      metric: 'Redução do raio de explosão para 1 único bucket com restrição de rede.'
    },
    {
      id: 3,
      title: 'Microtarefa 3: Criptografia em Trânsito & Autenticação mTLS (SPIFFE/SPIRE)',
      problem: 'Microsserviços comunicavam-se internamente sem criptografia ou usando autenticação básica com senhas compartilhadas.',
      solucao: 'Adoção de Mutual TLS (mTLS) com identidades criptográficas SPIFFE (SPIFFE ID: spiffe://empresa.com/ns/prod/sa/order-service). Os certificados X.509 de curta duração (SVID) expiram em 1 hora e são renovados automaticamente.',
      comando: `# Verificação da identidade criptográfica SVID emitida pelo agente SPIRE:
spire-agent api fetch x509 -socketPath /tmp/spire-agent/public/api.sock
# Subject: CN=order-service, URI: spiffe://empresa.com/ns/prod/sa/order-service
# Validade: 1 hora (Rotação contínua e sem intervenção humana)`,
      metric: '100% do tráfego leste-oeste cifrado com validação mTLS mútua.'
    },
    {
      id: 4,
      title: 'Microtarefa 4: Integração Multinuvem com Federação Cross-Cloud',
      problem: 'Aplicações hospedadas na Azure precisavam acessar recursos na AWS e GCP, exigindo sincronização de dezenas de pares de chaves estáticas.',
      solucao: 'Uso de Workload Identity Federation (WIF) trans-nuvem: A Azure Managed Identity emite um token OIDC que é trocado diretamente por um papel STS na AWS via sts:AssumeRoleWithWebIdentity.',
      comando: `# Troca de token OIDC da Azure por credenciais temporárias na AWS:
aws sts assume-role-with-web-identity \\
  --role-arn arn:aws:iam::123456789012:role/AzureCrossCloudRole \\
  --role-session-name azure-workload-session \\
  --web-identity-token $AZURE_FEDERATED_TOKEN \\
  --duration-seconds 900`,
      metric: 'Eliminação de 100% das chaves estáticas entre provedores de nuvem.'
    },
    {
      id: 5,
      title: 'Microtarefa 5: Automação do Ciclo de Vida & Rotação Contínua',
      problem: 'Chaves de API permaneciam ativas por anos, sem expiração ou procedimento de rotação documentado.',
      solucao: 'Automação via Esteira CI/CD e Cofre de Segredos com modelo "Blue/Green Credential Rotation". Nova chave gerada, período de sobreposição de 24h para atualização de pods, e desativação programada da chave anterior.',
      comando: `# Pipeline de Rotação Automática Zero-Downtime:
vault write -f aws/creds/workload-role
# Output: access_key: AKIA... secret_key: **** lease_duration: 3600s
# O cofre revoga automaticamente o lease após 1 hora se não houver renovação.`,
      metric: 'Zero credenciais com idade superior a 90 dias no ecossistema.'
    }
  ];

  const currentTask = microtasks.find((m) => m.id === activeMicrotask) || microtasks[0];

  return (
    <div className="space-y-6">
      {/* Official Docs Header */}
      <div
        className={`p-6 rounded-2xl border shadow-lg transition-colors ${
          isLightMode
            ? 'bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/70 border-emerald-200'
            : 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border-emerald-900/60'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                DOCUMENTOS OFICIAIS #21, #22 E #23
              </span>
              <span className="text-xs font-mono text-slate-500">
                67 páginas / slides de arquitetura &amp; resolução
              </span>
            </div>
            <h3
              className={`text-xl font-extrabold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Identidades Não Humanas (NHI): Serviços, Chaves &amp; Tokens
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Material didático oficial elaborado pelo{' '}
              <strong>Prof. Rômulo Pereira de Almeida</strong>. Foco na governança de Service Accounts, Workload Identity Federation (WIF), eliminação de segredos hardcoded e resolução das 5 microtarefas práticas de arquitetura.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="/assets/aistudio/Material_Didatico_IAM_Identidades_Nao_Humanas_JJ_c94eac27.pdf"
              download
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Apostila (27p)</span>
            </a>
            <a
              href="/assets/aistudio/Blueprint_de_Identidades_N_o_Humanas__1__ff4d6dd2.pdf"
              download
              className={`px-3.5 py-2 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition ${
                isLightMode
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Blueprint (15s)</span>
            </a>
            <a
              href="/assets/aistudio/organized_fac73fe4.pdf"
              download
              className={`px-3.5 py-2 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition ${
                isLightMode
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Casos Práticos (25s)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Internal Navigation Subtabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('wif')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'wif'
              ? 'bg-emerald-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Workload Identity Federation (Zero-Static Keys)</span>
        </button>

        <button
          onClick={() => setActiveTab('microtarefas')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'microtarefas'
              ? 'bg-emerald-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>5 Microtarefas Práticas Resolvidas (Doc #23)</span>
        </button>

        <button
          onClick={() => setActiveTab('inventario')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'inventario'
              ? 'bg-emerald-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tipologia &amp; Risco das NHIs</span>
        </button>
      </div>

      {/* VIEW 1: WORKLOAD IDENTITY FEDERATION SIMULATOR */}
      {activeTab === 'wif' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h4
                className={`font-bold text-base ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                Simulador Arquitetural: Chaves Estáticas vs Workload Identity Federation (WIF)
              </h4>
              <p
                className={`text-xs ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Veja a evolução da autenticação de microsserviços e esteiras CI/CD para o paradigma Zero Trust.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setWifArchitecture('static_keys')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  wifArchitecture === 'static_keys'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Legado: Chaves Estáticas (Vulnerável)
              </button>
              <button
                onClick={() => setWifArchitecture('wif_zerotrust')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  wifArchitecture === 'wif_zerotrust'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Padrão Zero Trust: WIF (Recomendado)
              </button>
            </div>
          </div>

          {wifArchitecture === 'static_keys' ? (
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/40 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>Arquitetura de Alto Risco: Segredos Estáticos Long-Lived</span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-[10px] text-slate-500 font-bold block">1. GERAÇÃO DE CHAVE JSON</span>
                  <div className="text-white font-bold">Arquivo key.json Baixado</div>
                  <p className="text-slate-400 text-[11px]">
                    Um desenvolvedor cria uma chave de Service Account no console cloud. O arquivo JSON é gravado no disco local.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1.5">
                  <span className="font-mono text-[10px] text-red-400 font-bold block">2. ARMAZENAMENTO ESTÁTICO</span>
                  <div className="text-white font-bold">Gravado em Variável de Ambiente</div>
                  <p className="text-slate-400 text-[11px]">
                    A chave privada RSA é colada nas secrets do GitHub Actions ou no .env da aplicação sem rotação programada.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-red-500/50 space-y-1.5">
                  <span className="font-mono text-[10px] text-red-400 font-bold block">3. VETOR DE VULNERABILIDADE</span>
                  <div className="text-red-300 font-bold">Vazamento em Repositório / Build</div>
                  <p className="text-slate-400 text-[11px]">
                    Se o repositório for clonado ou o log de build expuser a chave, adversários têm acesso ilimitado sem expiração.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-xs text-red-300">
                <strong>Vulnerabilidade Crítica:</strong> A credencial é estática (nunca expira automaticamente) e pode ser usada de qualquer local do mundo sem restrição de contexto.
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Arquitetura Homologada: Workload Identity Federation (Zero Static Keys)</span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold block">1. EMISSÃO OIDC EFÊMERO</span>
                  <div className="text-white font-bold">Runner CI/CD ou Pod K8s</div>
                  <p className="text-slate-400 text-[11px]">
                    O GitHub Actions gera um token OIDC assinado criptograficamente contendo claims do repositório, branch e ambiente.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold block">2. TROCA DE CONFIANÇA (STS)</span>
                  <div className="text-white font-bold">Validação de Claims via WIF</div>
                  <p className="text-slate-400 text-[11px]">
                    O Cloud Provider valida a assinatura do OIDC sem precisar de senha ou chave estática: <code>sub: repo:org/app:ref:main</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold block">3. TOKEN TEMPORÁRIO (15 MIN)</span>
                  <div className="text-emerald-300 font-bold">Acesso de Menor Privilégio</div>
                  <p className="text-slate-400 text-[11px]">
                    Um token de sessão temporário (ex: 15 minutos) é concedido exclusivamente para executar o deploy e se auto-destrói.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                <span>
                  <strong>Postura Zero Trust:</strong> Zero segredos gravados em disco ou repositório. O token expira em minutos e não pode ser reutilizado.
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  100% Zero Static Secrets
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: 5 MICROTASKS RESOLVED */}
      {activeTab === 'microtarefas' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="mb-4">
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              As 5 Microtarefas Práticas Resolvidas de NHI (Documento #23)
            </h4>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Guia operacional e código executivo das tarefas elaboradas pelo <strong>Prof. Rômulo Pereira de Almeida</strong>.
            </p>
          </div>

          {/* Microtask Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            {microtasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setActiveMicrotask(task.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeMicrotask === task.id
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : isLightMode
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-mono font-bold text-xs">TAREFA {task.id}</div>
                <div className="text-[10px] truncate mt-0.5 font-medium">
                  {task.title.split(':')[1]?.trim() || task.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Microtask Details */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                Enunciado Oficial
              </span>
              <h5
                className={`text-base font-bold mt-0.5 ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                {currentTask.title}
              </h5>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">
                  Cenário de Risco / Problema
                </span>
                <p
                  className={`leading-relaxed ${
                    isLightMode ? 'text-amber-950' : 'text-amber-200'
                  }`}
                >
                  {currentTask.problem}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                  Resolução Arquitetural Homologada
                </span>
                <p
                  className={`leading-relaxed ${
                    isLightMode ? 'text-emerald-950' : 'text-emerald-200'
                  }`}
                >
                  {currentTask.solucao}
                </p>
              </div>
            </div>

            {/* Code / Command Example */}
            <div>
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase block mb-1.5">
                Implementação Técnica / Política IAM / CLI:
              </span>
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {currentTask.comando}
              </pre>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Métrica de Sucesso:
              </span>
              <span className="font-bold">{currentTask.metric}</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: TYPOLOGY & RISKS */}
      {activeTab === 'inventario' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="mb-4">
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Matriz de Classificação das Identidades Não Humanas (NHI)
            </h4>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Panorama completo dos 5 tipos de credenciais não humanas e seus controles de mitigação.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">1. Service Accounts (Nuvem)</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">Cloud IAM</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Contas do IAM usadas por VMs, Lambdas e pods para autenticação interna em serviços gerenciados (S3, RDS, DynamoDB).
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: IAM Roles e Managed Identities (Sem chaves JSON estáticas).
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">2. API Keys &amp; Webhooks</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">APIs SaaS</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Tokens estáticos utilizados para integração com gateways de pagamento, envio de SMS, SendGrid e parceiros externos.
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: Rotação programada via Secrets Manager e restrição de IP.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">3. Personal Access Tokens (PAT)</span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[10px]">Dev / Git</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Tokens gerados por desenvolvedores para acesso a repositórios GitHub, GitLab e esteiras CI/CD locais.
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: TTL máximo de 30 dias e bloqueio de criação sem aprovação.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">4. Certificados mTLS (X.509)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">East-West</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Identidades criptográficas emitidas por uma Autoridade Certificadora privada (ex: HashiCorp Vault PKI / SPIRE) para comunicação inter-serviços.
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: Auto-renovação de certificados de curtíssima duração (horas).
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">5. Credenciais de Banco (DB Users)</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">Database</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Usuários e senhas de banco de dados gravados em arquivos de configuração de microsserviços.
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: Dynamic Secrets gerados sob demanda pelo Vault com TTL.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">6. Tokens OAuth M2M (Client Credentials)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">RFC 6749</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Fluxo Client Credentials Grant onde um microsserviço autentica-se diretamente contra o IdP corporativo.
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                Mitigação: Escopos restritos e validação de JWTs no API Gateway.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

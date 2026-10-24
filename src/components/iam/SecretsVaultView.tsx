import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  Shield,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  RefreshCw,
  Server,
  Layers,
  Database,
  ArrowRight,
  Eye,
  Sliders,
  Sparkles,
  FileText
} from 'lucide-react';

interface SecretsVaultViewProps {
  isLightMode?: boolean;
}

export const SecretsVaultView: React.FC<SecretsVaultViewProps> = ({ isLightMode = false }) => {
  const [activeTab, setActiveTab] = useState<'envelope' | 'rotation' | 'vaults'>('envelope');
  const [rotationStep, setRotationStep] = useState<number>(1);
  const [secretText, setSecretText] = useState<string>('db_prod_pass_2026!#ultra$secure');
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  // Dynamic Secret Generator Simulator
  const [generatedSecret, setGeneratedSecret] = useState<{
    username: string;
    leaseId: string;
    ttl: number;
    expiresAt: string;
  } | null>(null);

  const handleGenerateDynamicSecret = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setGeneratedSecret({
      username: `v-token-app-${randomSuffix}`,
      leaseId: `database/creds/readonly-app/${randomSuffix}x9a`,
      ttl: 3600,
      expiresAt: new Date(Date.now() + 3600 * 1000).toLocaleTimeString()
    });
  };

  const rotationSteps = [
    {
      step: 1,
      title: 'Passo 1: Geração da Nova Credencial (Versão 2)',
      desc: 'O cofre de segredos gera uma nova credencial criptografada (v2) e a provisiona no banco de dados com os mesmos privilégios da versão anterior.',
      dbState: 'Banco de Dados aceita: [Versão 1 (Ativa)] E [Versão 2 (Nova)]',
      appState: 'Aplicações ainda utilizam a Versão 1 em cache local.',
      statusColor: 'text-blue-500'
    },
    {
      step: 2,
      title: 'Passo 2: Período de Graça com Suporte Duplo (Grace Period)',
      desc: 'Ambas as credenciais permanecem válidas simultaneamente. O cofre emite um webhook ou o agente de segredos injeta a nova credencial nos pods.',
      dbState: 'Banco de Dados aceita: v1 (Legada) e v2 (Em migração)',
      appState: 'Workloads recarregam a configuração sem reiniciar pods (Zero Downtime).',
      statusColor: 'text-amber-500'
    },
    {
      step: 3,
      title: 'Passo 3: Verificação de Telemetria & Conexões Ativas',
      desc: 'O monitoramento de banco verifica que 100% das novas conexões estão utilizando a Versão 2 e nenhuma sessão ativa permanece na Versão 1.',
      dbState: 'Conexões v1: 0 ativas | Conexões v2: 48 ativas',
      appState: 'Todos os microsserviços autenticando exclusivamente com v2.',
      statusColor: 'text-cyan-500'
    },
    {
      step: 4,
      title: 'Passo 4: Revogação Segura e Expiração da Versão 1',
      desc: 'A credencial v1 é desativada e excluída permanentemente do banco de dados e do cofre. A rotação foi concluída com zero perda de pacotes.',
      dbState: 'Banco de Dados aceita SOMENTE: [Versão 2 (Oficial)]',
      appState: 'Ciclo concluído com sucesso. Próxima rotação programada em 30 dias.',
      statusColor: 'text-emerald-500'
    }
  ];

  const currentRotation = rotationSteps[rotationStep - 1] || rotationSteps[0];

  return (
    <div className="space-y-6">
      {/* Official Docs Header */}
      <div
        className={`p-6 rounded-2xl border shadow-lg transition-colors ${
          isLightMode
            ? 'bg-gradient-to-r from-rose-50/90 via-white to-amber-50/70 border-rose-200'
            : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border-rose-900/60'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                DOCUMENTOS OFICIAIS #24 E #25
              </span>
              <span className="text-xs font-mono text-slate-500">
                46 páginas de teoria, arquitetura &amp; blueprint
              </span>
            </div>
            <h3
              className={`text-xl font-extrabold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Gestão de Credenciais, Cofres de Segredos &amp; Envelope Crypto
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Material didático oficial elaborado pelo{' '}
              <strong>Prof. Rômulo Pereira de Almeida</strong>. Cobre a arquitetura de cofres corporativos (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager), Dynamic Secrets, rotação sem indisponibilidade (Zero-Downtime) e Criptografia Envelope (DEK/KEK).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="/assets/aistudio/Material_Didatico_IAM_Gestao_Credenciais_Cofres_Segredos_JJ_9d93122d.pdf"
              download
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Apostila (31p)</span>
            </a>
            <a
              href="/assets/aistudio/Gest_o_de_Credenciais_e_Segredos_7539a3c4.pdf"
              download
              className={`px-3.5 py-2 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition ${
                isLightMode
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Blueprint (15s)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Internal Navigation Subtabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('envelope')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'envelope'
              ? 'bg-rose-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Criptografia Envelope (DEK / KEK)</span>
        </button>

        <button
          onClick={() => setActiveTab('rotation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'rotation'
              ? 'bg-rose-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <RotateCw className="w-4 h-4" />
          <span>Rotação Zero-Downtime &amp; Grace Period</span>
        </button>

        <button
          onClick={() => setActiveTab('vaults')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'vaults'
              ? 'bg-rose-600 text-white shadow'
              : isLightMode
              ? 'bg-white border border-slate-300 text-slate-700'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Dynamic Secrets &amp; Comparativo de Cofres</span>
        </button>
      </div>

      {/* VIEW 1: ENVELOPE ENCRYPTION */}
      {activeTab === 'envelope' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="mb-5">
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Mecanismo de Criptografia Envelope (NIST SP 800-57)
            </h4>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Proteção de dados em larga escala combinando a performance da criptografia simétrica com a segurança de um Hardware Security Module (HSM/KMS).
            </p>
          </div>

          {/* Interactive Envelope Diagram */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Step 1: Plaintext + DEK */}
            <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/40 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-blue-400 font-bold uppercase">
                  1. DADO &amp; DEK LOCAL
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[9px]">
                  AES-256-GCM
                </span>
              </div>
              <div className="text-white font-bold text-sm">Dado Plano (Plaintext)</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                O dado sensível (segredo ou registro de banco) é cifrado diretamente na aplicação usando uma <strong>DEK (Data Encryption Key)</strong> simétrica recém-gerada.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-blue-300 truncate">
                Plaintext: &quot;{secretText}&quot;
              </div>
            </div>

            {/* Step 2: KEK no HSM/KMS */}
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-purple-400 font-bold uppercase">
                  2. KEK NO COFRE / HSM
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[9px]">
                  FIPS 140-2 Level 3
                </span>
              </div>
              <div className="text-white font-bold text-sm">Chave Mestra (KEK)</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                A DEK é enviada ao cofre KMS/HSM para ser cifrada pela <strong>KEK (Key Encryption Key)</strong>. A KEK <strong>nunca sai</strong> do módulo de segurança de hardware.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-purple-300 truncate">
                KEK: arn:aws:kms:sa-east-1:root-kek-vault
              </div>
            </div>

            {/* Step 3: Envelope Stored */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">
                  3. ENVELOPE ARMAZENADO
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px]">
                  Storage Seguro
                </span>
              </div>
              <div className="text-white font-bold text-sm">Ciphertext + Encrypted DEK</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                O banco armazena o dado cifrado junto com a DEK cifrada. Se o banco for vazado, os atacantes não conseguem abrir o envelope sem autorização de chamada ao cofre KMS.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-emerald-300 truncate">
                Envelope: [Enc_DEK_v2.Cipher_89f1a]
              </div>
            </div>
          </div>

          {/* Interactive Live Envelope Playground */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="font-bold text-xs uppercase font-mono text-slate-400">
                Playground do Envelope Criptográfico:
              </div>
              <button
                onClick={() => setIsEncrypted((prev) => !prev)}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 self-start"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isEncrypted ? 'Simular Acesso Decifrado' : 'Cifrar no Envelope'}</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Estado em Repouso no Banco de Dados:
                </span>
                <div className="text-emerald-400 break-all text-[11px]">
                  {isEncrypted
                    ? '0x7F4B2A89C1D0EF9901BA82E71C80234FF208E7711209BBAE019854'
                    : `Plaintext decifrado em memória: "${secretText}"`}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Status de Auditoria no HSM/KMS:
                </span>
                <div className="text-cyan-300 text-[11px]">
                  {isEncrypted
                    ? 'Envelope fechado. Nenhuma chamada de API ao KMS no momento.'
                    : 'kms:Decrypt autorizado via IAM Role svc-app -> DEK devolvida em RAM.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ZERO-DOWNTIME ROTATION */}
      {activeTab === 'rotation' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="mb-5">
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Simulador de Rotação Zero-Downtime com Grace Period
            </h4>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Como rotacionar credenciais críticas de banco de dados sem derrubar microsserviços ou causar erros 500 para usuários.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {rotationSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setRotationStep(s.step)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  rotationStep === s.step
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                    : isLightMode
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-mono font-bold text-xs">PASSO {s.step}</div>
                <div className="text-[10px] truncate mt-0.5 font-medium">
                  {s.title.split(':')[1]?.trim() || s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Current Rotation Step Card */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <h5
                className={`font-bold text-base ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                {currentRotation.title}
              </h5>
              <span className="font-mono text-xs text-rose-500 font-bold">
                Passo {rotationStep} de 4
              </span>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {currentRotation.desc}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">
                  Estado do Banco de Dados:
                </span>
                <p className="text-slate-200 font-mono text-[11px]">
                  {currentRotation.dbState}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block">
                  Comportamento dos Workloads / Microsserviços:
                </span>
                <p className="text-slate-200 font-mono text-[11px]">
                  {currentRotation.appState}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setRotationStep((prev) => Math.max(1, prev - 1))}
                disabled={rotationStep === 1}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  rotationStep === 1
                    ? 'opacity-40 cursor-not-allowed'
                    : isLightMode
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                Passo Anterior
              </button>

              <button
                onClick={() => setRotationStep((prev) => Math.min(4, prev + 1))}
                disabled={rotationStep === 4}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  rotationStep === 4
                    ? 'opacity-40 cursor-not-allowed bg-slate-700 text-slate-400'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                }`}
              >
                <span>Próximo Passo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DYNAMIC SECRETS & COMPARATIVE */}
      {activeTab === 'vaults' && (
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-800 shadow-md'
          }`}
        >
          <div className="mb-5">
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Dynamic Secrets: Credenciais Efêmeras Sob Demanda
            </h4>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Em vez de senhas fixas compartilhadas, o cofre cria um usuário único no banco com validade limitada (TTL) que é destruído automaticamente.
            </p>
          </div>

          {/* Dynamic Secret Simulator Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-950 to-slate-950 border border-purple-500/40 space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-purple-400 font-bold uppercase block">
                  Simulação de Chamada ao HashiCorp Vault API
                </span>
                <div className="text-white font-bold text-sm">
                  POST /v1/database/creds/readonly-app
                </div>
              </div>

              <button
                onClick={handleGenerateDynamicSecret}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 transition shadow cursor-pointer self-start"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gerar Credencial Efêmera</span>
              </button>
            </div>

            {generatedSecret ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>STATUS: 200 OK (CREDENCIAL GERADA COM SUCESSO)</span>
                  <span className="text-[10px] text-slate-400">Expira às: {generatedSecret.expiresAt}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-300 text-[11px] pt-1">
                  <div><strong>Username:</strong> {generatedSecret.username}</div>
                  <div><strong>Password:</strong> v-sec-9a4f81c900e!#</div>
                  <div><strong>Lease ID:</strong> {generatedSecret.leaseId}</div>
                  <div><strong>TTL:</strong> {generatedSecret.ttl} segundos (1 hora)</div>
                </div>
                <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800">
                  Ao expirar o TTL, o Vault executa <code>DROP USER {generatedSecret.username}</code> automaticamente no banco.
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Clique no botão acima para simular a criação de uma credencial temporária em tempo real.
              </p>
            )}
          </div>

          {/* Vaults Comparison Matrix */}
          <div className="space-y-3">
            <h5
              className={`font-bold text-sm ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Matriz Comparativa dos Principais Cofres de Segredos Corporativos
            </h5>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                <span className="font-bold text-white block">HashiCorp Vault</span>
                <span className="text-[10px] text-purple-400 font-mono block">Multinuvem &amp; On-Premises</span>
                <p className="text-slate-400 text-[11px]">
                  Líder de mercado. Suporte nativo a Dynamic Secrets, PKI sob demanda, criptografia como serviço (Transit Engine) e alta portabilidade.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                <span className="font-bold text-white block">AWS Secrets Manager</span>
                <span className="text-[10px] text-amber-400 font-mono block">AWS Nativo</span>
                <p className="text-slate-400 text-[11px]">
                  Integração profunda com RDS, Redshift e Lambdas. Rotação automática pré-configurada com funções Lambda sem código extra.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                <span className="font-bold text-white block">Azure Key Vault</span>
                <span className="text-[10px] text-blue-400 font-mono block">Microsoft Cloud</span>
                <p className="text-slate-400 text-[11px]">
                  Módulos HSM dedicados certificados FIPS 140-2 Level 3. Perfeita interoperabilidade com Azure Managed Identities e Entra ID.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                <span className="font-bold text-white block">GCP Secret Manager</span>
                <span className="text-[10px] text-emerald-400 font-mono block">Google Cloud</span>
                <p className="text-slate-400 text-[11px]">
                  Replicação global automática de segredos, controle granular via Cloud IAM e integração nativa com Cloud Run e GKE.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

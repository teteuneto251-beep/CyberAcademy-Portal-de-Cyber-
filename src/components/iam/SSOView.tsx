import React, { useState } from 'react';
import {
  Network,
  Shield,
  KeyRound,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Lock,
  Globe,
  RefreshCw,
  Eye,
  Sliders,
  Cpu
} from 'lucide-react';

interface SSOViewProps {
  isLightMode?: boolean;
}

export const SSOView: React.FC<SSOViewProps> = ({ isLightMode = false }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<'saml' | 'oidc' | 'scim' | 'oauth'>('saml');
  const [flowStep, setFlowStep] = useState<number>(1);
  const [activeFlowType, setActiveFlowType] = useState<'saml_sp' | 'oidc_pkce'>('saml_sp');
  const [decodedTokenView, setDecodedTokenView] = useState<'jwt' | 'saml_xml'>('jwt');

  const protocolsInfo = {
    saml: {
      name: 'SAML 2.0 (Security Assertion Markup Language)',
      badge: 'Padrão Corporativo & Enterprise',
      format: 'XML Assinado Digitalmente (XML DSig)',
      purpose: 'Autenticação Federada e Single Sign-On (SSO)',
      roles: 'Identity Provider (IdP) e Service Provider (SP)',
      useCase: 'Aplicações corporativas legadas, ERPs, ServiceNow, Salesforce, portais internos de grande porte.',
      pros: 'Ampla maturidade, suporte corporativo rigoroso, atributos ricos na própria asserção.',
      cons: 'Payloads XML pesados, parse complexo em dispositivos móveis e APIs REST.'
    },
    oidc: {
      name: 'OpenID Connect (OIDC 1.0 sobre OAuth 2.0)',
      badge: 'Padrão Moderno Cloud & Mobile',
      format: 'JSON Web Tokens (JWT: Header.Payload.Signature)',
      purpose: 'Camada de Identidade sobre o OAuth 2.0 (Autenticação do Usuário)',
      roles: 'OpenID Provider (OP) e Relying Party (RP)',
      useCase: 'Aplicações Web SPA, Apps Mobile, Microsserviços e APIs modernas em nuvem.',
      pros: 'Tokens leves em JSON (JWS/JWE), compatibilidade nativa com JavaScript e REST, descoberta via /.well-known/openid-configuration.',
      cons: 'Necessita validação estrita de assinatura de chave pública (JWKS) e tempos de expiração curtos.'
    },
    scim: {
      name: 'SCIM 2.0 (System for Cross-domain Identity Management)',
      badge: 'Provisionamento Automatizado',
      format: 'JSON RESTful Schema (RFC 7643 / 7644)',
      purpose: 'Sincronização e ciclo de vida de identidades entre sistemas (JML)',
      roles: 'SCIM Client (IdP/HR) e SCIM Service Provider (App SaaS)',
      useCase: 'Criação, atualização e desativação automática de contas quando o colaborador entra ou sai da empresa.',
      pros: 'Elimina o provisionamento manual, revoga acessos instantaneamente no desligamento (Leaver), reduz riscos de contas órfãs.',
      cons: 'Nem todos os softwares SaaS suportam todos os endpoints de atributos complexos.'
    },
    oauth: {
      name: 'OAuth 2.0 (Open Authorization Framework)',
      badge: 'Delegação de Autorização',
      format: 'Bearer Access Tokens (Opaque ou JWT)',
      purpose: 'Autorização e concessão de acesso delegado a recursos (APIs)',
      roles: 'Resource Owner, Client, Authorization Server, Resource Server',
      useCase: 'Permitir que uma aplicação acesse recursos em nome do usuário sem conhecer a senha.',
      pros: 'Desacopla credenciais de acesso, escopos granulares (read, write, admin).',
      cons: 'Não é um protocolo de autenticação por si só — para autenticar deve ser usado em conjunto com OIDC.'
    }
  };

  const samlSteps = [
    {
      num: 1,
      title: 'Acesso do Usuário ao Service Provider (SP)',
      desc: 'O colaborador tenta acessar um sistema corporativo (ex: Portal SAP/ServiceNow). O SP detecta que não há sessão ativa.',
      payload: 'GET /dashboard HTTP/1.1 -> 302 Redirect to IdP com SAMLRequest'
    },
    {
      num: 2,
      title: 'Envio do SAML AuthnRequest',
      desc: 'O SP gera uma requisição de autenticação XML codificada em Base64 e redireciona o navegador para o Identity Provider.',
      payload: '<samlp:AuthnRequest ID="_abc123" IssueInstant="2026-10-22T14:00:00Z" Destination="https://idp.empresa.com/sso" />'
    },
    {
      num: 3,
      title: 'Autenticação & Desafio MFA no IdP',
      desc: 'O IdP (ex: Entra ID / Okta) desafia o usuário com credenciais e segundo fator forte resistente a phishing (FIDO2 / WebAuthn).',
      payload: 'Validação FIDO2 Passkey -> Autenticação com Sucesso (MFA Level: High)'
    },
    {
      num: 4,
      title: 'Emissão da Asserção SAML Assinada (XML DSig)',
      desc: 'O IdP gera a asserção contendo as claims de identidade, assina digitalmente com sua chave privada X.509 e devolve ao browser.',
      payload: '<saml:Assertion><saml:Subject><saml:NameID>colaborador@empresa.com</saml:NameID></saml:Subject></saml:Assertion>'
    },
    {
      num: 5,
      title: 'POST no Assertion Consumer Service (ACS)',
      desc: 'O navegador envia a SAMLResponse assinada via HTTP POST para a URL do ACS configurada no SP.',
      payload: 'POST /saml/acs HTTP/1.1 Content-Type: application/x-www-form-urlencoded'
    },
    {
      num: 6,
      title: 'Validação da Assinatura e Sessão Criada',
      desc: 'O SP valida a assinatura usando o certificado público do IdP, checa o prazo de validade (NotOnOrAfter) e cria o cookie de sessão.',
      payload: 'Status: 200 OK -> Set-Cookie: SESSIONID=sess_98319f; Secure; HttpOnly; SameSite=Lax'
    }
  ];

  const oidcSteps = [
    {
      num: 1,
      title: 'Requisição com PKCE para o Endpoint /authorize',
      desc: 'A aplicação SPA/Mobile gera um code_verifier criptográfico, calcula o code_challenge (SHA-256) e redireciona para o OpenID Provider.',
      payload: 'GET /authorize?client_id=portal_app&response_type=code&scope=openid profile email&code_challenge=xyz...&code_challenge_method=S256'
    },
    {
      num: 2,
      title: 'Autenticação e Consentimento no Provedor',
      desc: 'O usuário realiza login seguro no IdP. O IdP valida as políticas de acesso condicional (geolocalização, dispositivo gerenciado).',
      payload: 'Políticas de Acesso Condicional avaliadas com sucesso -> Consentimento aprovado.'
    },
    {
      num: 3,
      title: 'Retorno do Authorization Code',
      desc: 'O IdP redireciona de volta para a redirect_uri da aplicação com um código de autorização efêmero de uso único.',
      payload: '302 Redirect -> https://app.empresa.com/callback?code=spl_993418&state=sec_token'
    },
    {
      num: 4,
      title: 'Troca de Código por Tokens (/token)',
      desc: 'A aplicação envia o authorization code + code_verifier diretamente para o backend do IdP via canal seguro TLS.',
      payload: 'POST /token Content-Type: application/x-www-form-urlencoded (code=spl_993418&code_verifier=xyz...)'
    },
    {
      num: 5,
      title: 'Recebimento de ID Token (JWT) e Access Token',
      desc: 'O IdP valida o PKCE e devolve o ID Token (com prova de identidade) e o Access Token (para consultar APIs).',
      payload: '{"id_token": "eyJhbGciOiJSUzI1NiIs...", "access_token": "eyJhbG...", "expires_in": 3600}'
    },
    {
      num: 6,
      title: 'Validação de Assinatura via JWKS e Sessão Ativa',
      desc: 'A aplicação valida a assinatura do JWT contra as chaves públicas obtidas em /.well-known/jwks.json e consome os dados.',
      payload: 'Assinatura válida. Claims: sub=usr_840, email=colaborador@empresa.com, role=Engenheiro'
    }
  ];

  const activeSteps = activeFlowType === 'saml_sp' ? samlSteps : oidcSteps;
  const currentStepData = activeSteps[flowStep - 1] || activeSteps[0];

  return (
    <div className="space-y-6">
      {/* Official Docs Banner with Federation Image */}
      <div
        className={`p-6 rounded-2xl border shadow-lg transition-colors ${
          isLightMode
            ? 'bg-gradient-to-r from-blue-50/90 via-white to-cyan-50/70 border-blue-200'
            : 'bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/30 border-blue-900/60'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-500/30">
                DOCUMENTOS OFICIAIS #19 E #20
              </span>
              <span className="text-xs font-mono text-slate-500">
                42 páginas de teoria &amp; blueprint
              </span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Federação de Identidades, Single Sign-On (SSO) &amp; SCIM
            </h3>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Material didático oficial elaborado pelo{' '}
              <strong>Prof. Rômulo Pereira de Almeida</strong>. Compreende os fundamentos de federação corporativa, arquitetura IdP vs SP, tokens JWT, asserções XML DSig, SCIM 2.0 e Single Log-Out (SLO).
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="/assets/aistudio/Material_Didatico_IAM_Federacao_SSO_JJ_eb59222b.pdf"
                download
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Apostila (27p)</span>
              </a>
              <a
                href="/assets/aistudio/Blueprint_de_Federa__o_e_SSO_0396ad34.pdf"
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

          <div className="shrink-0 w-full lg:w-56 h-36 rounded-xl overflow-hidden border border-blue-500/30 shadow-md relative group cyber-img-box">
            <img
              src="/assets/aistudio/Digital_identity_federation_arch__20261024192228_da215ae9.jpg"
              alt="Digital identity federation architecture SAML and OIDC"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
            <div className="cyber-img-overlay" />
            <span className={`absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
              isLightMode ? 'bg-white/90 text-blue-900 border-blue-200' : 'bg-slate-950/80 text-cyan-300 border-cyan-500/30'
            }`}>
              SAML 2.0 · OIDC · SCIM
            </span>
          </div>
        </div>
      </div>

      {/* Protocol Comparator */}
      <div
        className={`p-6 rounded-2xl border transition-colors ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/90 border-slate-800 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Comparativo Oficial dos 4 Protocolos de Federação &amp; Acesso
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            NIST SP 800-63C &amp; RFCs IETF
          </span>
        </div>

        {/* Buttons to select protocol */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {(['saml', 'oidc', 'scim', 'oauth'] as const).map((key) => {
            const p = protocolsInfo[key];
            const isSelected = selectedProtocol === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedProtocol(key)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : isLightMode
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs">{p.name.split(' ')[0]}</div>
                <div
                  className={`text-[10px] truncate mt-0.5 ${
                    isSelected
                      ? 'text-blue-100'
                      : isLightMode
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  {p.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Protocol Details */}
        {(() => {
          const p = protocolsInfo[selectedProtocol];
          return (
            <div
              className={`p-5 rounded-xl border grid sm:grid-cols-2 gap-4 text-xs ${
                isLightMode
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">
                    Protocolo &amp; Escopo
                  </span>
                  <div
                    className={`font-bold text-sm mt-0.5 ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {p.name}
                  </div>
                  <p
                    className={`mt-1 ${
                      isLightMode ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {p.purpose}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">
                    Formato de Dados &amp; Assinatura
                  </span>
                  <div
                    className={`font-mono text-xs mt-0.5 ${
                      isLightMode ? 'text-slate-800 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    {p.format}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">
                    Papéis Arquiteturais (Atores)
                  </span>
                  <div
                    className={`font-semibold mt-0.5 ${
                      isLightMode ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {p.roles}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">
                    Caso de Uso Primário no Mundo Real
                  </span>
                  <p
                    className={`mt-0.5 ${
                      isLightMode ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {p.useCase}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                    Vantagem Principal
                  </span>
                  <p
                    className={`mt-0.5 ${
                      isLightMode ? 'text-emerald-900' : 'text-emerald-300'
                    }`}
                  >
                    {p.pros}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">
                    Atenção de Segurança
                  </span>
                  <p
                    className={`mt-0.5 ${
                      isLightMode ? 'text-amber-900' : 'text-amber-300'
                    }`}
                  >
                    {p.cons}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Step-by-Step Flow Simulator */}
      <div
        className={`p-6 rounded-2xl border transition-colors ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/90 border-slate-800 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500" />
            <div>
              <h4
                className={`font-bold text-base ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                Simulador Interativo do Fluxo de Autenticação Federada
              </h4>
              <p
                className={`text-xs ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Inspecione cada requisição HTTP, redirecionamento e troca de tokens etapa por etapa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveFlowType('saml_sp');
                setFlowStep(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFlowType === 'saml_sp'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SAML 2.0 (SP-Initiated)
            </button>
            <button
              onClick={() => {
                setActiveFlowType('oidc_pkce');
                setFlowStep(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFlowType === 'oidc_pkce'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              OIDC + PKCE (OAuth 2.0)
            </button>
          </div>
        </div>

        {/* Step Indicator Progress */}
        <div className="grid grid-cols-6 gap-1.5 mb-5">
          {activeSteps.map((step) => {
            const isDone = step.num < flowStep;
            const isCurrent = step.num === flowStep;
            return (
              <button
                key={step.num}
                onClick={() => setFlowStep(step.num)}
                className={`p-2 rounded-xl text-center border transition cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30'
                    : isDone
                    ? isLightMode
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-blue-950/60 border-blue-800 text-blue-300'
                    : isLightMode
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono font-bold">ETAPA {step.num}</div>
                <div className="text-[11px] font-semibold truncate hidden md:block mt-0.5">
                  {step.title.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Step Card */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLightMode
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                {currentStepData.num}
              </span>
              <h5
                className={`font-bold text-sm sm:text-base ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                {currentStepData.title}
              </h5>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Passo {flowStep} de {activeSteps.length}
            </span>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLightMode ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {currentStepData.desc}
          </p>

          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Telemetria de Rede &amp; Carga Útil (Payload):</span>
              <span className="text-emerald-500 font-bold">TLS 1.3 Criptografado</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-cyan-300 text-xs font-mono overflow-x-auto border border-slate-800">
              {currentStepData.payload}
            </pre>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setFlowStep((prev) => Math.max(1, prev - 1))}
              disabled={flowStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                flowStep === 1
                  ? 'opacity-40 cursor-not-allowed border-slate-300 text-slate-400'
                  : isLightMode
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              Etapa Anterior
            </button>

            <button
              onClick={() => setFlowStep((prev) => Math.min(activeSteps.length, prev + 1))}
              disabled={flowStep === activeSteps.length}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                flowStep === activeSteps.length
                  ? 'opacity-40 cursor-not-allowed bg-slate-700 text-slate-400'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
              }`}
            >
              <span>Próxima Etapa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Token Decrypter & Claims Inspector */}
      <div
        className={`p-6 rounded-2xl border transition-colors ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/90 border-slate-800 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-500" />
            <h4
              className={`font-bold text-base ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Dissecador de Tokens: JWT OIDC vs Asserção SAML 2.0
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDecodedTokenView('jwt')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                decodedTokenView === 'jwt'
                  ? 'bg-emerald-600 text-white'
                  : isLightMode
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              JSON Web Token (JWT)
            </button>
            <button
              onClick={() => setDecodedTokenView('saml_xml')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                decodedTokenView === 'saml_xml'
                  ? 'bg-blue-600 text-white'
                  : isLightMode
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Asserção SAML (XML)
            </button>
          </div>
        </div>

        {decodedTokenView === 'jwt' ? (
          <div className="space-y-3">
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Estrutura tripartida de um <strong>ID Token OIDC</strong> assinado com RSA SHA-256 (RS256):
            </p>
            <div className="grid md:grid-cols-3 gap-3 font-mono text-xs">
              {/* Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-red-500/40 space-y-2">
                <span className="text-red-400 font-bold block text-[10px] uppercase">
                  1. HEADER (Algoritmo &amp; Key ID)
                </span>
                <pre className="text-red-300 text-[11px] leading-relaxed whitespace-pre-wrap">
{`{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key_2026_oct"
}`}
                </pre>
              </div>

              {/* Payload */}
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2">
                <span className="text-purple-400 font-bold block text-[10px] uppercase">
                  2. PAYLOAD (Claims &amp; Identidade)
                </span>
                <pre className="text-purple-300 text-[11px] leading-relaxed whitespace-pre-wrap">
{`{
  "iss": "https://idp.empresa.com",
  "sub": "usr_9934812",
  "aud": "cyber_portal_app",
  "exp": 1792684800,
  "iat": 1792681200,
  "email": "romulo.prof@escola.br",
  "name": "Prof. Rômulo Pereira de Almeida",
  "roles": ["Instrutor", "AdminIAM"],
  "amr": ["fido2", "mfa_pwd"]
}`}
                </pre>
              </div>

              {/* Signature */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <span className="text-cyan-400 font-bold block text-[10px] uppercase">
                  3. SIGNATURE (Validação Criptográfica)
                </span>
                <pre className="text-cyan-300 text-[11px] leading-relaxed whitespace-pre-wrap">
{`RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  idp_private_key
)
[Status: ASSINATURA VÁLIDA VIA JWKS]`}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Estrutura XML assinada com <strong>XML Signature (XML-DSig)</strong> contendo afirmações sobre o sujeito:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs border border-slate-800 overflow-x-auto leading-relaxed">
{`<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  ID="_a94f1c-7721-4f81-9b12" IssueInstant="2026-10-22T14:30:00Z" Version="2.0">
  <saml:Issuer>https://sts.empresa.com/saml</saml:Issuer>
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <!-- Assinatura Digital do Identity Provider -->
    <ds:SignedInfo>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
    </ds:SignedInfo>
    <ds:SignatureValue>iVBO...[X.509 RSA Sign]...</ds:SignatureValue>
  </ds:Signature>
  <saml:Subject>
    <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
      romulo.prof@escola.br
    </saml:NameID>
    <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
      <saml:SubjectConfirmationData NotOnOrAfter="2026-10-22T14:45:00Z"
        Recipient="https://portal.empresa.com/saml/acs"/>
    </saml:SubjectConfirmation>
  </saml:Subject>
  <saml:AttributeStatement>
    <saml:Attribute Name="DisplayName" Value="Prof. Rômulo Pereira de Almeida" />
    <saml:Attribute Name="Department" Value="Defesa Cibernética" />
    <saml:Attribute Name="SecurityClearance" Value="Nível 5 - Executivo" />
  </saml:AttributeStatement>
</saml:Assertion>`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

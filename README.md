# 🛡️ Portal Executivo de Engenharia & Operações de Cybersecurity (SOC)

[![Autor do Portal](https://img.shields.io/badge/Autor%20do%20Portal-Jos%C3%A9%20Matheus%20dos%20Santos%20Neto-dc2626?style=for-the-badge)](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
[![Material Didático](https://img.shields.io/badge/Material%20de%20Estudos-Prof.%20R%C3%B4mulo%20Pereira%20de%20Almeida-0891b2?style=for-the-badge)]()
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
[![Data de Criação](https://img.shields.io/badge/Criado%20em-19%2F10%2F2026-0f172a?style=for-the-badge)]()
[![Frameworks](https://img.shields.io/badge/Frameworks-NIST%20CSF%202.0%20%7C%20ISO%2027001%20%7C%20Zero%20Trust-10b981?style=for-the-badge)]()

> **Plataforma executiva e interativa de Engenharia de Defesa Cibernética, Operações SOC, Análise de Tráfego (Wireshark), Hardening Perimetral (`iptables`) e Governança de Identidades (IAM, SSO, NHI & Cofres de Segredos).**  
> Consolida **100% do conteúdo técnico dos 25 documentos oficiais da formação**, com materiais de estudos, apostilas, guias práticos e blueprints elaborados pelo **Prof. Rômulo Pereira de Almeida**, e plataforma interativa e relatórios técnicos desenvolvidos por **José Matheus dos Santos Neto**.

---

## 👨‍💻 Autoria & Créditos Acadêmicos

- **Desenvolvedor do Portal & Relatórios Técnicos:** José Matheus dos Santos Neto
- **LinkedIn:** [linkedin.com/in/jose-matheus-dos-santos-neto-a37974384](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
- **Autor do Material de Estudos & Professor Responsável:** Prof. Rômulo Pereira de Almeida
- **Data de Criação do Portal:** 19 de Outubro de 2026 (`19/10/2026`)
- **Atualização Oficial do Acervo:** Outubro de 2026 (Inclusão de 7 novos materiais de Federação, SSO, NHI e Cofres de Segredos)

---

## 🎯 Visão Geral do Projeto

O **Portal Executivo de Cybersecurity & SOC** foi projetado como um centro unificado de consulta, auditoria e simulação técnica. A aplicação estrutura todo o ciclo de vida da segurança da informação — desde os pilares clássicos e governança corporativa até a dissecação de pacotes criptografados na camada de transporte, regras de filtragem de pacotes *stateful* no kernel Linux, e a gestão avançada de identidades humanas e não-humanas.

### Destaques da Aplicação
- 📚 **Acervo Completo (25 Documentos Catalogados):** 20 materiais didáticos e blueprints do **Prof. Rômulo Pereira de Almeida** + 5 relatórios técnicos e diagnósticos de **José Matheus dos Santos Neto**.
- 📄 **Leitor & Download de PDFs Oficiais Integrados:** Acesso direto aos 7 PDFs originais na íntegra em `/assets/aistudio/`.
- 🧪 **Laboratórios & Simuladores Interativos Integrados:**
  - Simulador de Triagem SOC de Incidentes (`ALT-042`) com contenção de credenciais.
  - Motor de Decisão Híbrido H1 (`RBAC + ABAC`) com arquitetura PEP/PDP/PIP/PAP e matriz de testes T1 a T10.
  - Simulador de Fluxo de Federação e SSO (SAML 2.0 vs OIDC com PKCE).
  - Simulador de Workload Identity Federation (WIF) vs Chaves Estáticas Vulneráveis.
  - Simulador de Criptografia Envelope (DEK/KEK) e Rotação Zero-Downtime de Credenciais.
  - Dissecador de Tráfego Wireshark v4.6 (Inspeção de pacotes QUIC HTTP/3 e ICMPv6 NDP).
  - Terminal de Firewall NetSim (Filtragem `iptables` stateful conntrack em 3 zonas isoladas).
  - Calculadora Dinâmica de Riscos 5x5 (Caso Aurora Distribuição).
- 🌓 **Modo Claro (Branco) & Modo Escuro (SOC Dark):** Interface adaptativa com suporte a alto contraste, garantindo legibilidade perfeita de textos em qualquer tema.
- 🎓 **Simulado Técnico & Certificado Auditável:** Avaliação interativa de conhecimentos com justificativas detalhadas e emissão de Certificado de Qualificação Técnica com hash SHA-256 e assinatura dos autores.

---

## 🗂️ Arquitetura de Conteúdo (6 Módulos Técnicos)

### 1. Fundamentos, CIAAD & Frameworks (`Módulo 1`)
- **Pentágono CIAAD:** Confidencialidade, Integridade, Disponibilidade, Autenticidade e Irretratabilidade (Não-Repúdio).
- **Tríade PPT:** Pessoas, Processos e Tecnologias alinhados à defesa em profundidade.
- **NIST CSF 2.0:** As 6 funções centrais (*Govern, Identify, Protect, Detect, Respond, Recover*) com a função **GOVERN (GV)** no centro estratégico.
- **Mapeamento de 8 Carreiras Corporativas:** Blue Team, SOC, Red Team, GRC, IAM, Cloud Security, AppSec e DFIR.
- **Caso Horizonte Serviços:** Sustentação do negócio em 4 camadas e dependências críticas (DNS, DHCP, NTP).

### 2. Ciclo de Defesa & Operações SOC (`Módulo 2`)
- **Arquitetura de SOC & Telemetria:** SIEM, EDR, NDR e correlação de eventos de segurança.
- **Playbook de Triagem SOC (`ALT-042`):** Investigação do alerta crítico de *Credential Stuffing / Brute Force* contra o portal de autenticação corporativo a partir de IP malicioso (850 falhas seguidas de 1 sucesso).

### 3. Gestão de Riscos: Caso Aurora Distribuição (`Módulo 3`)
- **Inventário Crítico (`G01-ATV-01` a `G01-ATV-08`):** Mapeamento completo dos 8 ativos vitais (ERP Central, WMS Logístico, Banco PostgreSQL, AD/IdP, Portal B2B, Servidor de Backups, Gateway Firewall VPN e Coletores RF).
- **Matriz de Risco 5x5 ($R = P \times I$):** Identificação de vulnerabilidades críticas, como backups na mesma VLAN sem imutabilidade e acesso de terceiros (**NexoTI**) com privilégios de *Domain Admin* sem MFA.
- **Plano de Tratamento em 3 Horizontes & Continuidade:** Ações Imediatas (0–30 dias), Curto Prazo (30–90 dias) e Médio Prazo (90–180 dias), além de metas **RTO (4h)**, **RPO (1h)** e regra de backup **3-2-1-1-0 (WORM)**.

### 4. Redes, TCP/IP & Dissecação Wireshark (`Módulo 4`)
- **Descoberta de Rede & OUI:** Mapeamento de sub-rede com *Advanced IP Scanner*, correlação de endereços MAC/OUI e identificação de superfícies expostas.
- **Dissecação Wireshark — QUIC (`HTTP/3`) vs. ICMPv6 (`NDP`):**
  - Inspeção dos pacotes `#210` a `#225` (`UDP 443`, *Short Header*, bit `KP0=0`, *Connection ID* e criptografia TLS 1.3 nativa).
  - Análise do protocolo **ICMPv6 Tipo 135/136** (*Neighbor Solicitation / Neighbor Advertisement*) e mitigação de *NDP Spoofing* via **RA Guard** e **DHCPv6 Shield**.

### 5. Arquitetura Defensiva, Firewalls & NetSim (`Módulo 5`)
- **Topologia Segmentada em 3 Zonas (NetSim):**
  - **Rede Externa (`172.16.0.0/24`):** Simulação de tráfego externo / atacante (`pc1`).
  - **DMZ (`192.168.2.0/24`):** Servidores públicos HTTP/HTTPS e DNS (`servWeb`, `servDNS`).
  - **Rede Interna (`192.168.1.0/24`):** Estações restritas e gerência exclusiva (`pc2 - 192.168.1.20` e `pc3`).
- **Hardening com `iptables` Stateful:** Política padrão restritiva (`DROP` em `INPUT` e `FORWARD`), inspeção de estado (`conntrack ESTABLISHED,RELATED`), isolamento de gerência SSH (`TCP/22`) exclusivo para `pc2` e mitigação de spoofing/flood.

### 6. IAM, Federação SSO, NHI & Cofres de Segredos (`Módulo 6`)
- **Ciclo AAA & JML:** Autenticação (MFA resistente a phishing / FIDO2 / Passkeys), Autorização e *Accounting* nos eventos Joiner, Mover e Leaver.
- **Modelagem de Controle de Acesso:** Matriz RBAC, Dicionário de Atributos ABAC, Segregação de Funções (SoD) e Regra de Ouro (Ausente != Permitido).
- **Arquitetura Desacoplada XACML / Zero Trust:** Fluxo PEP, PDP, PIP e PAP com o Motor Híbrido H1.
- **Federação de Identidades & SSO (Docs #19 e #20):**
  - Protocolos SAML 2.0 (Asserções XML DSig, IdP vs SP) e OpenID Connect (OIDC com PKCE e tokens JWT).
  - Provisionamento automatizado com SCIM 2.0 e gestão de sessões globais (SLO).
- **Identidades Não Humanas - NHI (Docs #21, #22 e #23):**
  - Governança de Service Accounts, chaves de API, PATs e tokens de microsserviços.
  - Workload Identity Federation (WIF) para eliminação de credenciais estáticas.
  - Resolução completa das 5 microtarefas práticas de NHI (Doc #23).
- **Gestão de Credenciais & Cofres de Segredos (Docs #24 e #25):**
  - Arquitetura de cofres corporativos (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager).
  - Criptografia Envelope (DEK / KEK) conforme NIST SP 800-57.
  - Procedimento de rotação Zero-Downtime com Grace Period e Dynamic Secrets efêmeros.

---

## 📑 Catálogo Oficial dos 25 Documentos Técnicos

| Doc # | Título Oficial | Tipo | Autor | Arquivo PDF Original |
|:---:|:---|:---:|:---:|:---:|
| **01** | Guia de Aula: Introdução à Cybersecurity, Panorama e Carreiras Corporativas | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **02** | Guia de Estudos: Fundamentos de Ambientes Corporativos e Dependências | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **03** | Introdução ao Ciclo de Defesa, SOC e NIST CSF 2.0 | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **04** | Atividade Prática: Ameaças, Vulnerabilidades e Riscos (Caso Aurora) | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **05** | Laboratório Prático: Advanced IP Scanner e Análise com Wireshark | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **06** | Lab Hardening de Rede NetSim: Roteiro Passo a Passo | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **07** | Lab Hardening de Rede NetSim: Guia Visual de Topologia | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **08** | Guia Prático: Hardening de Rede em 3 Segmentos Criada do Zero | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **09** | Material Didático: Fundamentos de Identidade e Controle de Acesso (IAM) | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **10** | Material Didático: Autenticação, Autorização, MFA, SoD e Resistência a Phishing | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **11** | Blueprint de Arquitetura de Acesso e Governança IAM | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **12** | Workbook Técnico: Avaliação de Riscos e Ativos - Aurora Distribuição | Diagnóstico / Risco | José Matheus dos Santos Neto | Integrado no Portal |
| **13** | Diagnóstico Executivo de Cybersecurity: Aurora Distribuição Corporativa | Diagnóstico / Risco | José Matheus dos Santos Neto | Integrado no Portal |
| **14** | Relatório Técnico: Análise de Tráfego Wireshark (Protocolos QUIC e ICMPv6) | Relatório de Lab | José Matheus dos Santos Neto | Integrado no Portal |
| **15** | Relatório Integrado de Descoberta de Rede e Auditoria de Tráfego | Relatório de Lab | José Matheus dos Santos Neto | Integrado no Portal |
| **16** | Relatório Técnico: Hardening de Rede Perimetral e Controle de Acesso (NetSim) | Relatório de Lab | José Matheus dos Santos Neto | Integrado no Portal |
| **17** | IAM Blueprint: Modelando o Controle de Acesso com RBAC e ABAC | Apostila | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **18** | Guia de Estudos Avançado: Controles de Acesso RBAC e ABAC na Prática | Guia Prático | Prof. Rômulo Pereira de Almeida | Integrado no Portal |
| **19** | Material Didático: Federação e Single Sign-On (SSO) (27p) | Apostila | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Material_Didatico_IAM_Federacao_SSO_JJ_eb59222b.pdf` |
| **20** | Blueprint de Federação e SSO: O Blueprint de Identidade (15s) | Guia Prático | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Blueprint_de_Federa__o_e_SSO_0396ad34.pdf` |
| **21** | Material Didático: Identidades Não Humanas (Serviços, Chaves e Tokens) (27p) | Apostila | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Material_Didatico_IAM_Identidades_Nao_Humanas_JJ_c94eac27.pdf` |
| **22** | Blueprint de Identidades Não Humanas (NHI): Guia Operacional e Arquitetural (15s) | Guia Prático | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Blueprint_de_Identidades_N_o_Humanas__1__ff4d6dd2.pdf` |
| **23** | Identidades Não Humanas (NHI): Casos Práticos e Resoluções (25s) | Guia Prático | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/organized_fac73fe4.pdf` |
| **24** | Material Didático: Gestão de Credenciais e Cofres de Segredos (31p) | Apostila | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Material_Didatico_IAM_Gestao_Credenciais_Cofres_Segredos_JJ_9d93122d.pdf` |
| **25** | Gestão de Credenciais e Cofres de Segredos: Arquitetura e Defesa em Profundidade (15s) | Guia Prático | Prof. Rômulo Pereira de Almeida | `/assets/aistudio/Gest_o_de_Credenciais_e_Segredos_7539a3c4.pdf` |

---

## 🛠️ Stack Tecnológica

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Design System responsivo com suporte nativo a *Light Mode* e *Dark Mode*)
- **Ícones & Visualização:** [Lucide React](https://lucide.dev/)
- **Gráficos:** [Recharts](https://recharts.org/) (Radar Chart de Maturidade NIST CSF 2.0)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   cd NOME-DO-REPOSITORIO
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

### Build para Produção (Deploy no Netlify, Vercel ou Cloudflare Pages)

Para gerar os arquivos otimizados de produção na pasta `dist/`:

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura de Diretórios

```text
├── public/
│   └── assets/
│       └── aistudio/                 # PDFs oficiais originais dos novos materiais de estudo
├── src/
│   ├── components/
│   │   ├── iam/
│   │   │   ├── SSOView.tsx           # Federação SAML 2.0, OIDC, SCIM & Dissecador de Tokens (Docs 19 e 20)
│   │   │   ├── NHIView.tsx           # Identidades Não Humanas, WIF & 5 Microtarefas Resolvidas (Docs 21 a 23)
│   │   │   └── SecretsVaultView.tsx  # Cofres de Segredos, Criptografia Envelope & Rotação (Docs 24 e 25)
│   │   ├── BruteForceLab.tsx         # Simulador SOC de Brute Force & Triagem (ALT-042)
│   │   ├── CertificateModal.tsx      # Modal de Certificado Auditável com impressão PDF
│   │   ├── DashboardView.tsx         # Visão Executiva, telemetria, showcase dos novos materiais e métricas
│   │   ├── GlossaryModal.tsx         # Glossário Técnico RFC / NIST / ISO interativo
│   │   ├── Header.tsx                # Barra superior executiva, busca global e alternador de tema
│   │   ├── ModalAcervo.tsx           # Leitor integral e visualizador de PDFs dos 25 documentos técnicos
│   │   ├── Module1View.tsx           # Módulo 1: CIAAD, PPT, NIST CSF 2.0 e Alerta ALT-042
│   │   ├── Module2View.tsx           # Módulo 2: AAA, RBAC/ABAC, PEP/PDP e Simulador IAM
│   │   ├── Module3View.tsx           # Módulo 3: Caso Aurora, Ativos, Matriz 5x5 e RTO/RPO
│   │   ├── Module4View.tsx           # Módulo 4: Reconhecimento OUI e Inspetor Wireshark
│   │   ├── Module5View.tsx           # Módulo 5: Topologia 3 Zonas, DMZ e Hardening iptables
│   │   ├── Module6View.tsx           # Módulo 6: Trilha Completa de IAM, SSO, NHI e Cofres de Segredos
│   │   ├── QuizView.tsx              # Simulado Técnico de Certificação com feedback detalhado
│   │   ├── SecurityRadarChart.tsx    # Gráfico Radar de Maturidade Cibernética (NIST CSF 2.0)
│   │   └── Sidebar.tsx               # Navegação lateral de módulos, laboratórios e perfil do autor
│   ├── data/
│   │   ├── documents.ts              # Catálogo completo com os 25 documentos técnicos e relatórios
│   │   └── modulesData.ts            # Dados estruturados de módulos, matriz de risco e simulado
│   ├── App.tsx                       # Orquestração principal da aplicação, rotas de abas e tema
│   ├── index.css                     # Estilos globais e regras de alto contraste Light/Dark
│   └── main.tsx                      # Ponto de entrada da aplicação React
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📬 Contato & Créditos

- **Desenvolvimento do Portal & Relatórios Técnicos:** **José Matheus dos Santos Neto** (Criado em **19 de Outubro de 2026**)
- **Autoria do Material de Estudos & Docência:** **Prof. Rômulo Pereira de Almeida**
- 🔗 **LinkedIn:** [https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)

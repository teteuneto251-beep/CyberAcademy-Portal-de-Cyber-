# 🛡️ Portal Executivo de Engenharia & Operações de Cybersecurity (SOC)

[![Autor](https://img.shields.io/badge/Autor-Jos%C3%A9%20Matheus%20dos%20Santos%20Neto-dc2626?style=for-the-badge)](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
[![Data de Criação](https://img.shields.io/badge/Criado%20em-19%2F10%2F2026-0f172a?style=for-the-badge)]()
[![Frameworks](https://img.shields.io/badge/Frameworks-NIST%20CSF%202.0%20%7C%20ISO%2027001%20%7C%20Zero%20Trust-10b981?style=for-the-badge)]()

> **Plataforma interativa de Engenharia de Defesa Cibernética, Operações SOC, Análise de Tráfego (Wireshark), Hardening Perimetral (`iptables`) e Governança de Identidades (IAM).**  
> Consolida **100% do conteúdo técnico dos 18 documentos oficiais da formação**, combinando enciclopédia teórica aprofundada com **6 simuladores e laboratórios práticos em tempo real**.

---

## 👨‍💻 Autor & Responsável Técnico

- **Nome:** José Matheus dos Santos Neto
- **LinkedIn:** [linkedin.com/in/jose-matheus-dos-santos-neto-a37974384](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)
- **Data de Criação:** 19 de Outubro de 2026 (`19/10/2026`)

---

## 🎯 Visão Geral do Projeto

O **Portal Executivo de Cybersecurity & SOC** foi projetado como um centro unificado de consulta, auditoria e simulação técnica. A aplicação estrutura todo o ciclo de vida da segurança da informação — desde os pilares clássicos e governança corporativa até a dissecação de pacotes criptografados na camada de transporte e regras de filtragem de pacotes *stateful* no kernel Linux.

### Destaques da Aplicação
- 📚 **Acervo Completo (18/18 Documentos Homologados):** Todo o conteúdo técnico, tabelas comparativas, matrizes de risco e relatórios de laboratório preservados integralmente.
- 🧪 **6 Laboratórios Interativos Integrados:** Simuladores funcionais para triagem de incidentes SOC, avaliação de políticas IAM (RBAC/ABAC), inspeção de pacotes Wireshark, hardening de firewall `iptables` e cálculo dinâmico de risco corporativo.
- 🌓 **Modo Claro (Branco) & Modo Escuro (SOC Dark):** Interface adaptativa de alto contraste otimizada para leitura executiva e operação técnica.
- 🎓 **Simulado Técnico & Certificado Auditável:** Avaliação interativa de conhecimentos com justificativas detalhadas e emissão de Certificado de Qualificação Técnica pronto para impressão/PDF.

---

## 🗂️ Arquitetura de Conteúdo (6 Módulos Técnicos)

### 1. Fundamentos, CIAAD & Frameworks (`Módulo 1`)
- **Pentágono CIAAD:** Confidencialidade, Integridade, Disponibilidade, Autenticidade e Irretratabilidade (Não-Repúdio).
- **Tríade PPT:** Pessoas, Processos e Tecnologias alinhados à defesa em profundidade.
- **NIST CSF 2.0:** As 6 funções centrais (*Govern, Identify, Protect, Detect, Respond, Recover*) com a função **GOVERN (GV)** no centro estratégico.
- **Blue Team, Red Team & Purple Team:** Papéis táticos e sinergia em operações de segurança.
- **Playbook de Triagem SOC (`ALT-042`):** Investigação do alerta crítico de *Credential Stuffing / Brute Force* contra o ` portal-rh-autenticacao` a partir do IP `185.220.101.42` (850 falhas seguidas de 1 sucesso).

### 2. Governança de Acesso & IAM (`Módulo 2`)
- **Ciclo AAA:** Autenticação (MFA/FIDO2), Autorização (Menor Privilégio) e *Accounting* (Trilhas de Auditoria Imutáveis).
- **Modelos de Controle de Acesso:** Comparativo técnico entre **DAC**, **MAC**, **RBAC** e **ABAC**.
- **Arquitetura XACML / Zero Trust:** Fluxo completo entre **PEP** (*Policy Enforcement Point*), **PDP** (*Policy Decision Point*), **PIP** (*Policy Information Point*) e **PAP** (*Policy Administration Point*).
- **Estudo de Caso — Motor Híbrido H1:** Segregação de Funções (*SoD - Separation of Duties*), controle contextual de horário/geolocalização e credenciais *Just-In-Time (JIT)*.

### 3. Gestão de Riscos: Caso Aurora Distribuição (`Módulo 3`)
- **Inventário Crítico (`G01-ATV-01` a `G01-ATV-08`):** Mapeamento completo dos 8 ativos vitais (ERP Central, WMS Logístico, Banco PostgreSQL, AD/IdP, Portal B2B, Servidor de Backups, Gateway Firewall VPN e Coletores RF).
- **Matriz de Risco 5x5 ($R = P \times I$):** Identificação de vulnerabilidades críticas, como backups na mesma VLAN sem imutabilidade (Score 25/25) e acesso de terceiros (**NexoTI**) com privilégios de *Domain Admin* sem MFA (Score 20/25).
- **Plano de Tratamento em 3 Horizontes & Continuidade:** Ações Imediatas (0–30 dias), Curto Prazo (30–90 dias) e Médio Prazo (90–180 dias), além de metas **RTO (4h)**, **RPO (1h)** e regra de backup **3-2-1-1-0 (WORM)**.

### 4. Reconhecimento & Análise de Tráfego (`Módulo 4`)
- **Descoberta de Rede & OUI:** Mapeamento de sub-rede com *Advanced IP Scanner*, correlação de endereços MAC/OUI e identificação de superfícies expostas.
- **Dissecação Wireshark — QUIC (`HTTP/3`) vs. ICMPv6 (`NDP`):**
  - Inspeção dos pacotes `#210` a `#225` (`UDP 443`, *Short Header*, bit `KP0=0`, *Connection ID* e criptografia TLS 1.3 nativa).
  - Análise do protocolo **ICMPv6 Tipo 135/136** (*Neighbor Solicitation / Neighbor Advertisement*) e mitigação de *NDP Spoofing* via **RA Guard** e **DHCPv6 Shield**.

### 5. Arquitetura Defensiva & Hardening (`Módulo 5`)
- **Topologia Segmentada em 3 Zonas (NetSim):**
  - **Rede Externa (`172.16.0.0/24`):** Simulação de tráfego externo / atacante (`pc1`).
  - **DMZ (`192.168.2.0/24`):** Servidores públicos HTTP/HTTPS e DNS (`servWeb`, `servDNS`).
  - **Rede Interna (`192.168.1.0/24`):** Estações restritas e gerência exclusiva (`pc2 - 192.168.1.20` e `pc3`).
- **Hardening com `iptables` Stateful:** Política padrão restritiva (`DROP` em `INPUT` e `FORWARD`), inspeção de estado (`conntrack ESTABLISHED,RELATED`), isolamento de gerência SSH (`TCP/22`) exclusivo para `pc2` e mitigação de spoofing/flood.

### 6. Laboratórios Práticos, Acervo & Simulado (`Módulo 6`)
- **Simulador de Firewall NetSim & Gerador de Scripts `iptables`:** Teste interativo de pacotes entre zonas e validação de regras de *hardening*.
- **Motor de Decisão IAM (PEP/PDP):** Simulação de requisições de acesso avaliando papéis RBAC, atributos ABAC e conflitos de *Separation of Duties (SoD)*.
- **Inspetor de Pacotes Wireshark Interativo:** Visualização de camadas L2/L3/L4/L7 e *Hex Dump* real dos pacotes QUIC e ICMPv6.
- **Calculadora Dinâmica de Risco 5x5:** Simulação de impacto residual pré e pós-controles na Aurora Distribuição.

---

## 🛠️ Stack Tecnológica

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Design System responsivo com suporte nativo a *Light Mode* e *Dark Mode*)
- **Ícones & Visualização:** [Lucide React](https://lucide.dev/)

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

### Build para Produção

Para gerar os arquivos otimizados de produção na pasta `dist/`:

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura de Diretórios

```text
├── src/
│   ├── components/
│   │   ├── BruteForceLab.tsx        # Simulador SOC de Brute Force & Triagem (ALT-042)
│   │   ├── CertificateModal.tsx     # Modal de Certificado Auditável com impressão PDF
│   │   ├── DashboardView.tsx        # Visão Executiva, telemetria, matriz e acesso rápido
│   │   ├── GlossaryModal.tsx        # Glossário Técnico RFC / NIST / ISO interativo
│   │   ├── Header.tsx               # Barra superior executiva, busca global e alternador de tema
│   │   ├── ModalAcervo.tsx          # Leitor integral dos 18 documentos técnicos homologados
│   │   ├── Module1View.tsx          # Módulo 1: CIAAD, PPT, NIST CSF 2.0 e Alerta ALT-042
│   │   ├── Module2View.tsx          # Módulo 2: AAA, RBAC/ABAC, PEP/PDP e Simulador IAM
│   │   ├── Module3View.tsx          # Módulo 3: Caso Aurora, Ativos, Matriz 5x5 e RTO/RPO
│   │   ├── Module4View.tsx          # Módulo 4: Reconhecimento OUI e Inspetor Wireshark
│   │   ├── Module5View.tsx          # Módulo 5: Topologia 3 Zonas, DMZ e Hardening iptables
│   │   ├── Module6View.tsx          # Módulo 6: Defesa Ativa, Governança e Checklist Executivo
│   │   ├── QuizView.tsx             # Simulado Técnico de Certificação com feedback detalhado
│   │   ├── SecurityRadarChart.tsx   # Gráfico Radar de Maturidade Cibernética (NIST CSF 2.0)
│   │   └── Sidebar.tsx              # Navegação lateral de módulos, laboratórios e perfil do autor
│   ├── data/
│   │   ├── documents.ts             # Acervo completo com os 18 documentos técnicos e relatórios
│   │   └── modulesData.ts           # Dados estruturados de módulos, matriz de risco e simulado
│   ├── App.tsx                      # Orquestração principal da aplicação, rotas de abas e tema
│   ├── index.css                    # Estilos globais e regras de alto contraste Light/Dark
│   └── main.tsx                     # Ponto de entrada da aplicação React
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📬 Contato

Desenvolvido por **José Matheus dos Santos Neto** em **19 de Outubro de 2026**.

- 🔗 **LinkedIn:** [https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384](https://www.linkedin.com/in/jose-matheus-dos-santos-neto-a37974384)

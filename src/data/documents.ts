export interface TechDoc {
  num: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'Apostila' | 'Guia Prático' | 'Diagnóstico / Risco' | 'Relatório de Lab';
  autor: string;
  modulo: 'mod1' | 'mod2' | 'mod3' | 'mod4' | 'mod5' | 'mod6';
  resumo: string;
  tags: string[];
  pdfUrl?: string;
  paginas?: string;
  dataPublicacao?: string;
}

export const acervo25Docs: TechDoc[] = [
  {
    num: "01",
    titulo: "Guia de Aula: Introdução à Cybersecurity, Panorama e Carreiras Corporativas",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod1",
    resumo: "Tríade CIA (Confidencialidade, Integridade, Disponibilidade), Estudo de caso AWS Oriente Médio e Mapeamento de 8 Carreiras Técnicas.",
    tags: ["CIA", "AWS", "Carreiras", "Blue Team", "SOC", "Nuvem"]
  },
  {
    num: "02",
    titulo: "Guia de Estudos: Fundamentos de Ambientes Corporativos e Dependências",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod1",
    resumo: "Caso Horizonte Serviços: Análise das 4 camadas de sustentação do negócio, Endpoints, DNS, DHCP, NTP e Serviços Críticos.",
    tags: ["Horizonte", "DNS", "DHCP", "NTP", "Dependências", "Ativos"]
  },
  {
    num: "03",
    titulo: "Introdução ao Ciclo de Defesa, SOC e NIST CSF 2.0",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod2",
    resumo: "As 6 Funções do NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), NIST SP 800-61r3, Fontes de Logs e Triagem ALT-042.",
    tags: ["NIST", "CSF 2.0", "SOC", "Blue Team", "ALT-042", "Logs"]
  },
  {
    num: "04",
    titulo: "Atividade Prática: Ameaças, Vulnerabilidades e Riscos (Caso Aurora)",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod3",
    resumo: "Enunciado oficial e diagnóstico do Caso Aurora Distribuição Corporativa (Relatos C01 a C10, limites de RTO/RPO e fornecedor NexoTI).",
    tags: ["Aurora", "Ameaças", "Vulnerabilidades", "RTO", "RPO", "NexoTI"]
  },
  {
    num: "05",
    titulo: "Laboratório Prático: Advanced IP Scanner e Análise com Wireshark",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod4",
    resumo: "Roteiro técnico de varredura de sub-redes locais, identificação de MAC OUI, consultas DNS e Three-Way Handshake TCP.",
    tags: ["IP Scanner", "Wireshark", "MAC", "Handshake", "TCP", "DNS"]
  },
  {
    num: "06",
    titulo: "Lab Hardening de Rede NetSim: Roteiro Passo a Passo",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod5",
    resumo: "Roteiro de execução do Lab 5 no simulador NetSim com comandos iptables stateful conntrack e bloqueio padrão DROP.",
    tags: ["NetSim", "iptables", "Firewall", "DROP", "Conntrack", "Hardening"]
  },
  {
    num: "07",
    titulo: "Lab Hardening de Rede NetSim: Guia Visual de Topologia",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod5",
    resumo: "Edição com diagramas de rede, fluxos de pacotes WAN/LAN e topologia de referência antes e depois da blindagem.",
    tags: ["NetSim", "Topologia", "Perímetro", "Diagramas", "Interfaces"]
  },
  {
    num: "08",
    titulo: "Guia Prático: Hardening de Rede em 3 Segmentos Criada do Zero",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod5",
    resumo: "Construção arquitetural isolada: Sub-rede Usuários (192.168.10.0), Servidores (192.168.20.0) e Visitantes (192.168.30.0).",
    tags: ["3 Zonas", "Segmentação", "DMZ", "Visitantes", "Zero Trust"]
  },
  {
    num: "09",
    titulo: "Material Didático: Fundamentos de Identidade e Controle de Acesso (IAM)",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Conceituação precisa de Identidade Digital, Conta, Credencial, Autenticador, Modelo RBAC, Princípio do Menor Privilégio e Ciclo JML.",
    tags: ["IAM", "Identidade", "Credencial", "RBAC", "JML", "Menor Privilégio"]
  },
  {
    num: "10",
    titulo: "Material Didático: Autenticação, Autorização, MFA, SoD e Resistência a Phishing",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Distinção entre Authn e Authz, matriz de avaliação de fatores MFA, FIDO2/Passkey vs SMS/TOTP, e Segregação de Funções (SoD).",
    tags: ["MFA", "FIDO2", "Passkey", "Phishing", "Authn", "Authz", "SoD"]
  },
  {
    num: "11",
    titulo: "Blueprint de Arquitetura de Acesso e Governança IAM",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Diagnóstico visual AAA, catálogo de papéis operacionais, microtarefas de mudança (Mover) e desligamento seguro (Leaver).",
    tags: ["Blueprint", "AAA", "Mover", "Leaver", "Auditoria", "Accounting"]
  },
  {
    num: "12",
    titulo: "Workbook Técnico: Avaliação de Riscos e Ativos - Aurora Distribuição",
    categoria: "Diagnóstico / Risco",
    autor: "José Matheus dos Santos Neto",
    modulo: "mod3",
    resumo: "Inventário completo dos 8 ativos críticos (G01-ATV-01 a 08) e matriz de cálculo de risco 5x5 (Probabilidade x Impacto).",
    tags: ["Workbook", "Matriz 5x5", "Severidade", "Ativos", "Aurora"]
  },
  {
    num: "13",
    titulo: "Diagnóstico Executivo de Cybersecurity: Aurora Distribuição Corporativa",
    categoria: "Diagnóstico / Risco",
    autor: "José Matheus dos Santos Neto",
    modulo: "mod3",
    resumo: "Relatório executivo com plano de tratamento em 3 horizontes, metas RTO (4h), RPO (1h), isolamento de backups e auditoria NexoTI.",
    tags: ["Diagnóstico", "Plano de Ação", "RTO", "RPO", "NexoTI", "Backups"]
  },
  {
    num: "14",
    titulo: "Relatório Técnico: Análise de Tráfego Wireshark (Protocolos QUIC e ICMPv6)",
    categoria: "Relatório de Lab",
    autor: "José Matheus dos Santos Neto",
    modulo: "mod4",
    resumo: "Dissecação detalhada dos pacotes reais 210 a 225: QUIC KP0 sobre UDP 443 com TLS 1.3 e ICMPv6 Neighbor Discovery Protocol.",
    tags: ["QUIC", "KP0", "UDP 443", "ICMPv6", "NDP", "Wireshark"]
  },
  {
    num: "15",
    titulo: "Relatório Integrado de Descoberta de Rede e Auditoria de Tráfego",
    categoria: "Relatório de Lab",
    autor: "José Matheus dos Santos Neto",
    modulo: "mod4",
    resumo: "Varredura completa com Advanced IP Scanner, correlação de roteadores de borda, placas de rede locais e isolamento de hosts.",
    tags: ["Varredura", "OUI", "Advanced IP Scanner", "Sub-rede", "Roteamento"]
  },
  {
    num: "16",
    titulo: "Relatório Técnico: Hardening de Rede Perimetral e Controle de Acesso (NetSim)",
    categoria: "Relatório de Lab",
    autor: "José Matheus dos Santos Neto",
    modulo: "mod5",
    resumo: "Evidências de auditoria pré e pós-hardening, isolamento da gestão SSH para pc2 e validação de tráfego entre 3 zonas isoladas.",
    tags: ["NetSim", "Relatório", "SSH", "DROP", "Stateful", "Zero Trust"]
  },
  {
    num: "17",
    titulo: "IAM Blueprint: Modelando o Controle de Acesso com RBAC e ABAC",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Arquitetura XACML/NIST SP 800-162: Fronteira da Autorização, Anatomia da Decisão, Hierarquia de Papéis, Risco de Explosão de Papéis e o Modelo Híbrido H1.",
    tags: ["IAM", "RBAC", "ABAC", "PEP", "PDP", "PIP", "PAP", "Modelo Híbrido", "SoD"]
  },
  {
    num: "18",
    titulo: "Guia de Estudos Avançado: Controles de Acesso RBAC e ABAC na Prática",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Metodologia de 8 etapas, Dicionário de Atributos, Sintaxe da Regra A1, Matriz de Testes T1-T10, Regra de Ouro (Ausente != Permitido) e Resolução de Conflitos.",
    tags: ["RBAC", "ABAC", "Dicionário", "Matriz de Testes", "Horizonte", "NIST SP 800-205"]
  },
  {
    num: "19",
    titulo: "Material Didático: Federação e Single Sign-On (SSO)",
    subtitulo: "Identity and Access Management (IAM) - Material Didático do Aluno",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Fundamentos de Federação e SSO, Provedores de Identidade (IdP) vs Provedores de Serviço (SP), Trust Relationships, Protocolo SAML 2.0 (Assertions, Bindings, Metadados XML), OpenID Connect (OIDC) e OAuth 2.0 (Tokens JWT, UserInfo, Discovery Endpoint), Provisionamento Automático com SCIM 2.0 e Gestão de Sessões Globais (SLO).",
    tags: ["IAM", "Federação", "SSO", "SAML 2.0", "OIDC", "SCIM", "IdP", "SP", "Tokens JWT"],
    pdfUrl: "/assets/aistudio/Material_Didatico_IAM_Federacao_SSO_JJ_eb59222b.pdf",
    paginas: "27 páginas (Carga Horária: 40h)",
    dataPublicacao: "22 de Outubro de 2026"
  },
  {
    num: "20",
    titulo: "Blueprint de Federação e SSO: O Blueprint de Identidade",
    subtitulo: "Arquitetura, Protocolos e Operações em Access Management (IAM)",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Blueprint visual de arquitetura de SSO: fluxos SP-Initiated vs IdP-Initiated, asserções assinadas digitalmente (XML DSig), políticas de Acesso Condicional adaptativo, federação multinuvem e interoperabilidade com FIDO2 / WebAuthn.",
    tags: ["Blueprint", "SSO", "SAML", "OIDC", "Acesso Condicional", "FIDO2", "Arquitetura"],
    pdfUrl: "/assets/aistudio/Blueprint_de_Federa__o_e_SSO_0396ad34.pdf",
    paginas: "15 slides executivos",
    dataPublicacao: "Outubro de 2026"
  },
  {
    num: "21",
    titulo: "Material Didático: Identidades Não Humanas (Serviços, Chaves e Tokens)",
    subtitulo: "Identity and Access Management (IAM) - Material Didático do Aluno",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Gestão abrangente de Identidades Não Humanas (NHI): contas de serviço, chaves de API, tokens OAuth/PAT, pipelines CI/CD, Workload Identity Federation (WIF) para eliminação de credenciais estáticas, monitoramento de segredos hardcoded e auditoria de tráfego Machine-to-Machine.",
    tags: ["NHI", "Service Accounts", "Workload Identity", "Tokens", "API Keys", "CI/CD", "Machine-to-Machine"],
    pdfUrl: "/assets/aistudio/Material_Didatico_IAM_Identidades_Nao_Humanas_JJ_c94eac27.pdf",
    paginas: "27 páginas (Carga Horária: 40h)",
    dataPublicacao: "Outubro de 2026"
  },
  {
    num: "22",
    titulo: "Blueprint de Identidades Não Humanas (NHI): Guia Operacional e Arquitetural",
    subtitulo: "Serviços, Chaves e Tokens - Do Inventário à Automação de Governança",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Blueprint visual com topologia de Workload Identity Federation, esteira de detecção de segredos em código-fonte (Git hooks, scanners SAST), arquitetura de menor privilégio para microsserviços e matriz de ciclo de vida NHI.",
    tags: ["Blueprint", "NHI", "WIF", "DevSecOps", "Zero Static Secrets", "Governança"],
    pdfUrl: "/assets/aistudio/Blueprint_de_Identidades_N_o_Humanas__1__ff4d6dd2.pdf",
    paginas: "15 slides executivos",
    dataPublicacao: "Outubro de 2026"
  },
  {
    num: "23",
    titulo: "Identidades Não Humanas (NHI): Casos Práticos e Resoluções",
    subtitulo: "Um guia de arquitetura focando nas microtarefas de descoberta, limites, criptografia, nuvem e ciclo de vida",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Resolução técnica de 5 microtarefas práticas de NHI: Descoberta de credenciais órfãs, delimitação de escopo e blast radius, criptografia de dados em trânsito e repouso, integração multinuvem e automação do ciclo de vida com rotação programada.",
    tags: ["NHI", "Casos Práticos", "Blast Radius", "Criptografia", "Multinuvem", "Ciclo de Vida"],
    pdfUrl: "/assets/aistudio/organized_fac73fe4.pdf",
    paginas: "25 slides de casos práticos",
    dataPublicacao: "Outubro de 2026"
  },
  {
    num: "24",
    titulo: "Material Didático: Gestão de Credenciais e Cofres de Segredos",
    subtitulo: "Identity and Access Management (IAM) - Material Didático do Aluno",
    categoria: "Apostila",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Fundamentos e implementação de Secrets Management: Cofres de segredos (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, Google Cloud Secret Manager), Dynamic Secrets (credenciais efêmeras), Criptografia Envelope (DEK - Data Encryption Key / KEK - Key Encryption Key), Rotação automatizada sem indisponibilidade (Zero-Downtime) e auditoria de acesso a segredos.",
    tags: ["Cofres de Segredos", "HashiCorp Vault", "AWS Secrets Manager", "Envelope Encryption", "DEK/KEK", "Zero-Downtime", "Rotação"],
    pdfUrl: "/assets/aistudio/Material_Didatico_IAM_Gestao_Credenciais_Cofres_Segredos_JJ_9d93122d.pdf",
    paginas: "31 páginas (Carga Horária: 40h)",
    dataPublicacao: "Outubro de 2026"
  },
  {
    num: "25",
    titulo: "Gestão de Credenciais e Cofres de Segredos: Arquitetura e Defesa em Profundidade",
    subtitulo: "IAM para Workloads e Identidades Não Humanas [Arquitetura, Ciclo de Vida e Defesa em Profundidade]",
    categoria: "Guia Prático",
    autor: "Prof. Rômulo Pereira de Almeida",
    modulo: "mod6",
    resumo: "Guia arquitetural de implementação de cofres de segredos corporativos, Just-In-Time (JIT) access para microsserviços, estratégia de contenção contra vazamento de credenciais e compliance com NIST SP 800-57 e CIS Benchmarks.",
    tags: ["Blueprint", "Secrets Vault", "Just-In-Time", "Defesa em Profundidade", "NIST SP 800-57", "CIS"],
    pdfUrl: "/assets/aistudio/Gest_o_de_Credenciais_e_Segredos_7539a3c4.pdf",
    paginas: "15 slides executivos",
    dataPublicacao: "Outubro de 2026"
  }
];

export const acervoDocs = acervo25Docs;

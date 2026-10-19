export interface TechDoc {
  num: string;
  titulo: string;
  categoria: 'Apostila' | 'Guia Prático' | 'Diagnóstico / Risco' | 'Relatório de Lab';
  autor: string;
  modulo: 'mod1' | 'mod2' | 'mod3' | 'mod4' | 'mod5' | 'mod6';
  resumo: string;
  tags: string[];
}

export const acervo16Docs: TechDoc[] = [
  {
    num: "01",
    titulo: "Guia de Aula: Introdução à Cybersecurity, Panorama e Carreiras Corporativas",
    categoria: "Apostila",
    autor: "Coordenação de Cybersecurity & Defesa",
    modulo: "mod1",
    resumo: "Tríade CIA (Confidencialidade, Integridade, Disponibilidade), Estudo de caso AWS Oriente Médio e Mapeamento de 8 Carreiras Técnicas.",
    tags: ["CIA", "AWS", "Carreiras", "Blue Team", "SOC", "Nuvem"]
  },
  {
    num: "02",
    titulo: "Guia de Estudos: Fundamentos de Ambientes Corporativos e Dependências",
    categoria: "Apostila",
    autor: "Coordenação de Cybersecurity & Defesa",
    modulo: "mod1",
    resumo: "Caso Horizonte Serviços: Análise das 4 camadas de sustentação do negócio, Endpoints, DNS, DHCP, NTP e Serviços Críticos.",
    tags: ["Horizonte", "DNS", "DHCP", "NTP", "Dependências", "Ativos"]
  },
  {
    num: "03",
    titulo: "Introdução ao Ciclo de Defesa, SOC e NIST CSF 2.0",
    categoria: "Apostila",
    autor: "Coordenação de Cybersecurity & Defesa",
    modulo: "mod2",
    resumo: "As 6 Funções do NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), NIST SP 800-61r3, Fontes de Logs e Triagem ALT-042.",
    tags: ["NIST", "CSF 2.0", "SOC", "Blue Team", "ALT-042", "Logs"]
  },
  {
    num: "04",
    titulo: "Atividade Prática: Ameaças, Vulnerabilidades e Riscos (Caso Aurora)",
    categoria: "Guia Prático",
    autor: "Coordenação de Cybersecurity & Defesa",
    modulo: "mod3",
    resumo: "Enunciado oficial e diagnóstico do Caso Aurora Distribuição Corporativa (Relatos C01 a C10, limites de RTO/RPO e fornecedor NexoTI).",
    tags: ["Aurora", "Ameaças", "Vulnerabilidades", "RTO", "RPO", "NexoTI"]
  },
  {
    num: "05",
    titulo: "Laboratório Prático: Advanced IP Scanner e Análise com Wireshark",
    categoria: "Guia Prático",
    autor: "Coordenação de Redes & Telecomunicações",
    modulo: "mod4",
    resumo: "Roteiro técnico de varredura de sub-redes locais, identificação de MAC OUI, consultas DNS e Three-Way Handshake TCP.",
    tags: ["IP Scanner", "Wireshark", "MAC", "Handshake", "TCP", "DNS"]
  },
  {
    num: "06",
    titulo: "Lab Hardening de Rede NetSim: Roteiro Passo a Passo",
    categoria: "Guia Prático",
    autor: "Coordenação de Redes & Telecomunicações",
    modulo: "mod5",
    resumo: "Roteiro de execução do Lab 5 no simulador NetSim com comandos iptables stateful conntrack e bloqueio padrão DROP.",
    tags: ["NetSim", "iptables", "Firewall", "DROP", "Conntrack", "Hardening"]
  },
  {
    num: "07",
    titulo: "Lab Hardening de Rede NetSim: Guia Visual de Topologia",
    categoria: "Guia Prático",
    autor: "Coordenação de Redes & Telecomunicações",
    modulo: "mod5",
    resumo: "Edição com diagramas de rede, fluxos de pacotes WAN/LAN e topologia de referência antes e depois da blindagem.",
    tags: ["NetSim", "Topologia", "Perímetro", "Diagramas", "Interfaces"]
  },
  {
    num: "08",
    titulo: "Guia Prático: Hardening de Rede em 3 Segmentos Criada do Zero",
    categoria: "Guia Prático",
    autor: "Coordenação de Redes & Telecomunicações",
    modulo: "mod5",
    resumo: "Construção arquitetural isolada: Sub-rede Usuários (192.168.10.0), Servidores (192.168.20.0) e Visitantes (192.168.30.0).",
    tags: ["3 Zonas", "Segmentação", "DMZ", "Visitantes", "Zero Trust"]
  },
  {
    num: "09",
    titulo: "Material Didático: Fundamentos de Identidade e Controle de Acesso (IAM)",
    categoria: "Apostila",
    autor: "Coordenação de Governança & IAM",
    modulo: "mod6",
    resumo: "Conceituação precisa de Identidade Digital, Conta, Credencial, Autenticador, Modelo RBAC, Princípio do Menor Privilégio e Ciclo JML.",
    tags: ["IAM", "Identidade", "Credencial", "RBAC", "JML", "Menor Privilégio"]
  },
  {
    num: "10",
    titulo: "Material Didático: Autenticação, Autorização, MFA, SoD e Resistência a Phishing",
    categoria: "Apostila",
    autor: "Coordenação de Governança & IAM",
    modulo: "mod6",
    resumo: "Distinção entre Authn e Authz, matriz de avaliação de fatores MFA, FIDO2/Passkey vs SMS/TOTP, e Segregação de Funções (SoD).",
    tags: ["MFA", "FIDO2", "Passkey", "Phishing", "Authn", "Authz", "SoD"]
  },
  {
    num: "11",
    titulo: "Blueprint de Arquitetura de Acesso e Governança IAM",
    categoria: "Apostila",
    autor: "Coordenação de Governança & IAM",
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
    autor: "Coordenação de Governança & IAM",
    modulo: "mod6",
    resumo: "Arquitetura XACML/NIST SP 800-162: Fronteira da Autorização, Anatomia da Decisão, Hierarquia de Papéis, Risco de Explosão de Papéis e o Modelo Híbrido H1.",
    tags: ["IAM", "RBAC", "ABAC", "PEP", "PDP", "PIP", "PAP", "Modelo Híbrido", "SoD"]
  },
  {
    num: "18",
    titulo: "Guia de Estudos Avançado: Controles de Acesso RBAC e ABAC na Prática",
    categoria: "Guia Prático",
    autor: "Coordenação de Governança & IAM",
    modulo: "mod6",
    resumo: "Metodologia de 8 etapas, Dicionário de Atributos, Sintaxe da Regra A1, Matriz de Testes T1-T10, Regra de Ouro (Ausente != Permitido) e Resolução de Conflitos.",
    tags: ["RBAC", "ABAC", "Dicionário", "Matriz de Testes", "Horizonte", "NIST SP 800-205"]
  }
];

export const acervoDocs = acervo16Docs;


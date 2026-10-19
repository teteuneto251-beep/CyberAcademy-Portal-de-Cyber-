export interface Career {
  id: string;
  title: string;
  tag: string;
  color: string;
  description: string;
  keySkills: string[];
  tools: string[];
  certifications: string[];
}

export const careersData: Career[] = [
  {
    id: "blue-team",
    title: "Blue Team (Defesa & Segurança Defensiva)",
    tag: "Defesa Ativa",
    color: "blue",
    description: "Atuação defensiva contínua para proteger os ativos da organização, aplicar hardening de sistemas, fechar brechas, monitorar controles de segurança e mitigar riscos.",
    keySkills: ["Hardening de Sistemas e Redes", "Gestão de Vulnerabilidades", "Arquitetura Segura", "Controles CIS"],
    tools: ["OpenVAS / Nessus", "Sysinternals", "Suricata", "Auditd / GPO"],
    certifications: ["CompTIA Security+", "BTL1 (Blue Team Level 1)", "GIAC GSEC"]
  },
  {
    id: "soc",
    title: "SOC (Security Operations Center / SecOps)",
    tag: "Operações 24/7",
    color: "cyan",
    description: "Central estruturada de monitoramento contínuo em tempo real. Responsável por triagem de alertas, análise de telemetria de SIEM/EDR, identificação de anomalias e escalonamento de incidentes.",
    keySkills: ["Triagem de Alertas", "Correlação de Logs", "Análise de Falsos Positivos", "Playbooks de Resposta"],
    tools: ["Splunk / Elastic SIEM", "Wazuh", "Microsoft Sentinel", "CrowdStrike / Defender"],
    certifications: ["CompTIA CySA+", "Cisco CyberOps Associate", "GIAC GSOC"]
  },
  {
    id: "red-team",
    title: "Red Team & Pentest (Segurança Ofensiva)",
    tag: "Simulação de Ataque",
    color: "red",
    description: "Simulação controlada e autorizada de ataques adversários do mundo real. Identifica falhas lógicas e tecnológicas antes que agentes maliciosos as explorem.",
    keySkills: ["Engenharia Social", "Evasão de Defesas", "Exploração de Falhas", "Movimentação Lateral"],
    tools: ["Metasploit", "Burp Suite Pro", "Cobalt Strike / Sliver", "Nmap / BloodHound"],
    certifications: ["OSCP (OffSec Certified Professional)", "eJPT", "CRTO"]
  },
  {
    id: "grc",
    title: "GRC (Governança, Riscos & Conformidade)",
    tag: "Estratégia & Normas",
    color: "amber",
    description: "Alinha a segurança aos objetivos de negócio, gerenciando matrizes de risco, conformidade regulatória (LGPD, GDPR, SOX) e auditoria técnica de fornecedores.",
    keySkills: ["Avaliação de Riscos (PxI)", "Políticas de Segurança", "Auditoria de Fornecedores", "Frameworks (ISO 27001, NIST)"],
    tools: ["OneTrust", "ServiceNow GRC", "Excel / Workbooks de Risco", "Archer"],
    certifications: ["CRISC", "CISM", "ISO 27001 Lead Auditor"]
  },
  {
    id: "iam",
    title: "IAM (Identity & Access Management)",
    tag: "Gestão de Identidade",
    color: "rose",
    description: "Gestão completa do ciclo de vida da identidade (JML), arquitetura de autenticação segura (MFA resistente a phishing, SSO, Passkeys), modelo RBAC e Segregação de Funções.",
    keySkills: ["Federação SAML / OIDC", "Modelagem RBAC / ABAC", "Gestão de Privilégios (PAM)", "Segregação de Funções (SoD)"],
    tools: ["Microsoft Entra ID (Azure AD)", "Okta", "CyberArk", "Ping Identity"],
    certifications: ["Microsoft SC-300 (Identity & Access)", "Certified Identity and Access Manager (CIAM)"]
  },
  {
    id: "cloud-security",
    title: "Cloud Security (Segurança em Nuvem)",
    tag: "Infraestrutura Cloud",
    color: "purple",
    description: "Proteção de arquiteturas multinuvem (AWS, Azure, Google Cloud). Monitoramento de postura (CSPM), segurança de contêineres e modelos de responsabilidade compartilhada.",
    keySkills: ["Modelo de Responsabilidade Compartilhada", "Políticas IAM em Nuvem", "Segurança em Kubernetes / Docker", "CSPM"],
    tools: ["AWS GuardDuty / Security Hub", "Prisma Cloud", "Wiz", "Trivy / Falco"],
    certifications: ["AWS Certified Security - Specialty", "Microsoft SC-100", "CCSP (ISC2)"]
  },
  {
    id: "appsec",
    title: "AppSec & DevSecOps",
    tag: "Desenvolvimento Seguro",
    color: "emerald",
    description: "Integração da segurança em todas as fases do ciclo de desenvolvimento de software (SDLC). Análise de código estático (SAST), dinâmico (DAST) e segurança em APIs.",
    keySkills: ["OWASP Top 10", "Pipelines CI/CD Seguras", "Revisão Segura de Código", "Segurança de APIs REST/GraphQL"],
    tools: ["SonarQube", "Snyk", "GitHub Advanced Security", "OWASP ZAP / Postman"],
    certifications: ["CASE (Certified Application Security Engineer)", "CSSLP", "DevSecOps Certified Professional"]
  },
  {
    id: "dfir",
    title: "DFIR (Forense Digital & Resposta a Incidentes)",
    tag: "Investigação Forense",
    color: "orange",
    description: "Investigação minuciosa de ataques cibernéticos consumados. Coleta e preservação de evidências com cadeia de custódia, análise de memória RAM, reconstituição de timeline e erradicação.",
    keySkills: ["Preservação de Evidências", "Forense de Memória e Disco", "Timeline Reconstruction", "Engenharia Reversa de Malware"],
    tools: ["Volatility", "Autopsy", "FTK Imager", "KAPE / Plaso"],
    certifications: ["GCIH (Incident Handler)", "GCFA (Forensic Analyst)", "CHFI"]
  }
];

export interface NISTFunction {
  code: string;
  namePt: string;
  color: string;
  question: string;
  description: string;
  practicalExamples: string[];
}

export const nistFunctionsData: NISTFunction[] = [
  {
    code: "GOVERN (GV)",
    namePt: "Governar",
    color: "amber",
    question: "Quem decide, quais são as políticas e as prioridades do negócio?",
    description: "A função GOVERN estabelece e monitora a estratégia de gestão de riscos, políticas organizacionais, papéis de autoridade (ex.: quem pode autorizar suspensão imediata de contas críticas) e a governança com terceiros.",
    practicalExamples: [
      "Definição formal de SLA de segurança em contrato com a prestadora de TI.",
      "Política de Segregação de Funções (SoD) entre compras e pagamentos.",
      "Matriz de alçadas para aprovação de exceções temporárias de firewall."
    ]
  },
  {
    code: "IDENTIFY (ID)",
    namePt: "Identificar",
    color: "blue",
    question: "O que nós temos e quais riscos realmente importam?",
    description: "Compreensão aprofundada do ecossistema corporativo: inventário detalhado de ativos físicos, softwares, serviços em nuvem, fluxos de dados sensíveis e avaliação de cenários de risco.",
    practicalExamples: [
      "Mapeamento dos 8 ativos críticos da Aurora Distribuição.",
      "Identificação de dados de 6 mil clientes sujeitos a multas da LGPD.",
      "Cálculo de RTO (4 horas) e RPO (1 hora) para operações de pedidos."
    ]
  },
  {
    code: "PROTECT (PR)",
    namePt: "Proteger",
    color: "emerald",
    question: "Que salvaguardas reduzem a probabilidade e o impacto de incidentes?",
    description: "Implementação de controles preventivos essenciais para blindar ativos: autenticação forte resistente a phishing, menor privilégio, segmentação de rede, criptografia e backups imutáveis.",
    practicalExamples: [
      "Habilitação de MFA com FIDO2 / Passkey em 100% dos usuários.",
      "Isolamento do servidor web e da gestão SSH por regras de firewall.",
      "Ativação do BitLocker em 100% dos notebooks corporativos."
    ]
  },
  {
    code: "DETECT (DE)",
    namePt: "Detectar",
    color: "purple",
    question: "Quais sinais indicam atividade maliciosa ou anomalia operacional?",
    description: "Desenvolvimento e operação de mecanismos contínuos de monitoramento para identificar eventos anômalos através da correlação de múltiplas fontes de telemetria e logs.",
    practicalExamples: [
      "Geração do Alerta ALT-042 após login incomum e regra de encaminhamento.",
      "Monitoramento de varreduras de portas ou conexões externas não autorizadas.",
      "Auditoria de logs de autenticação do Microsoft 365 e VPN corporativa."
    ]
  },
  {
    code: "RESPOND (RS)",
    namePt: "Responder",
    color: "red",
    question: "Como conter, limitar o estrago e erradicar o incidente ativo?",
    description: "Execução coordenada de ações assim que um incidente é confirmado: contenção rápida, erradicação da ameaça, comunicação com partes interessadas e preservação de evidências.",
    practicalExamples: [
      "Suspensão imediata da conta comprometida e revogação de tokens ativos.",
      "Exclusão da regra de encaminhamento maliciosa da caixa postal.",
      "Isolamento de host infectado da rede local (quarentena L2/L3)."
    ]
  },
  {
    code: "RECOVER (RC)",
    namePt: "Recuperar",
    color: "cyan",
    question: "Como retomar a operação normal com integridade e segurança?",
    description: "Planos de restauração de recursos e serviços impactados, validação de integridade dos dados antes da reabertura e atualização contínua de lições aprendidas nos playbooks.",
    practicalExamples: [
      "Restauração do banco de dados a partir do backup imutável isolado.",
      "Auditoria dos lotes de boletos financeiros gerados durante a janela do incidente.",
      "Revisão pós-incidente e refinamento dos playbooks de resposta do SOC."
    ]
  }
];

export interface AuroraAsset {
  id: string;
  name: string;
  type: string;
  criticality: 'Crítica' | 'Alta' | 'Média/Alta';
  vulnerabilities: string;
  businessImpact: string;
}

export const auroraAssetsData: AuroraAsset[] = [
  {
    id: "G01-ATV-01",
    name: "Portal Aurora Pedidos (Web Application)",
    type: "Aplicação / Cloud Pública",
    criticality: "Crítica",
    vulnerabilities: "Componente desatualizado sem patch há 14 meses; console administrativa exposta diretamente à internet pública (Relatos C01, C03).",
    businessImpact: "Interrupção do faturamento de 120 pedidos diários; indisponibilidade compromete o limite máximo de tolerância de 2 horas."
  },
  {
    id: "G01-ATV-02",
    name: "Banco de Dados Central de Clientes",
    type: "Banco de Dados / Cloud",
    criticality: "Crítica",
    vulnerabilities: "Compartilha ambiente com aplicações expostas; permissões excessivas; dados cadastrais em texto claro (Relato C03).",
    businessImpact: "Exposição de ~6 mil registros comerciais e contatos de clientes, sujeitando a empresa a sanções da LGPD e perda de confiança."
  },
  {
    id: "G01-ATV-03",
    name: "Microsoft 365 (E-mail Corporativo & Teams)",
    type: "SaaS / Nuvem Corporativa",
    criticality: "Alta",
    vulnerabilities: "17 das 48 contas sem MFA habilitado; conta de ex-colaborador de compras permaneceu ativa 20 dias após desligamento (Relato C02).",
    businessImpact: "Vetor para ataques de Business Email Compromise (BEC), espionagem comercial e fraudes em faturas com fornecedores."
  },
  {
    id: "G01-ATV-04",
    name: "Parque de 48 Notebooks Corporativos",
    type: "Endpoints / Híbrido",
    criticality: "Alta",
    vulnerabilities: "11 máquinas atrasadas em patches >60 dias; usuários com privilégios de administrador local; 13 notebooks sem confirmação de BitLocker (Relato C04).",
    businessImpact: "Risco de instalação de malwares, furto de dados confidenciais em caso de perda/furto do equipamento físico e comprometimento lateral."
  },
  {
    id: "G01-ATV-05",
    name: "Rede Local e Wi-Fi do Escritório Central",
    type: "Infraestrutura / On-Premises",
    criticality: "Média/Alta",
    vulnerabilities: "Inexistência de separação comprovada entre a rede corporativa e a rede de visitantes; ausência de segmentação L2/L3 (Relato C05).",
    businessImpact: "Dispositivos externos não homologados podem inspecionar pacotes corporativos ou infectar servidores internos na mesma rede."
  },
  {
    id: "G01-ATV-06",
    name: "Serviço de VPN para Acesso Remoto",
    type: "Serviço de Borda / Híbrido",
    criticality: "Alta",
    vulnerabilities: "26 colaboradores remotos autenticando apenas com usuário e senha estática, sem MFA obrigatório (Relato C04).",
    businessImpact: "Entrada direta de invasores na LAN corporativa através de credenciais vazadas ou ataques de força bruta/spray."
  },
  {
    id: "G01-ATV-07",
    name: "Rotina de Backups em Nuvem do Banco de Dados",
    type: "Repositório de Backup / Cloud",
    criticality: "Crítica",
    vulnerabilities: "Backups armazenados na mesma conta cloud da produção, sem imutabilidade (Object Lock) e sem testes periódicos de restauração (Relato C07).",
    businessImpact: "Se um invasor obtiver acesso administrativo à conta de produção, apagará o banco e os backups, tornando impossível cumprir o RTO de 4h."
  },
  {
    id: "G01-ATV-08",
    name: "Exportações Comerciais e Console de Armazenamento",
    type: "Armazenamento em Nuvem (Object Storage)",
    criticality: "Alta",
    vulnerabilities: "Planilhas com base de dados de clientes exportadas e compartilhadas via link público sem autenticação e sem data de expiração (Relato C06).",
    businessImpact: "Vazamento em massa de dados comerciais sem rastreabilidade de quem baixou o arquivo."
  }
];

export interface AuroraRisk {
  id: string;
  name: string;
  description: string;
  probInherent: number;
  impactInherent: number;
  scoreInherent: number;
  levelInherent: 'Crítico' | 'Alto' | 'Médio';
  nistFunction: string;
  mitigationPlan: string;
  probResidual: number;
  impactResidual: number;
  scoreResidual: number;
  levelResidual: 'Médio' | 'Baixo';
}

export const auroraRisksData: AuroraRisk[] = [
  {
    id: "G01-RSK-03",
    name: "Ransomware ou Sabotagem nos Backups em Nuvem (PRIORITÁRIO)",
    description: "Um invasor compromete a console de produção e apaga os backups ou sequestra dados sem cópias imutáveis, inviabilizando o RTO de 4h e paralisando a empresa.",
    probInherent: 4,
    impactInherent: 5,
    scoreInherent: 20,
    levelInherent: "Crítico",
    nistFunction: "RECOVER / PROTECT",
    mitigationPlan: "Isolar repositório de backup em conta cloud segregada com MFA dedicado, retenção imutável (Object Lock / WORM) e teste trimestral de restore.",
    probResidual: 2,
    impactResidual: 4,
    scoreResidual: 8,
    levelResidual: "Médio"
  },
  {
    id: "G01-RSK-02",
    name: "Invasão e Comprometimento do Portal Aurora Pedidos",
    description: "Exploração de vulnerabilidade conhecida no componente desatualizado há 14 meses ou ataque de força bruta contra a console administrativa exposta publicamente.",
    probInherent: 4,
    impactInherent: 5,
    scoreInherent: 20,
    levelInherent: "Crítico",
    nistFunction: "PROTECT / IDENTIFY",
    mitigationPlan: "Restringir console administrativa para acesso exclusivo via VPN ou IP estático, aplicar patches homologados e exigir MFA para todos os operadores.",
    probResidual: 2,
    impactResidual: 4,
    scoreResidual: 8,
    levelResidual: "Médio"
  },
  {
    id: "G01-RSK-01",
    name: "Comprometimento de Identidade Microsoft 365 e VPN",
    description: "Ataque de phishing colhe senhas das 17 contas sem MFA ou utiliza a credencial ativa do colaborador de compras demitido há 20 dias para entrar na rede corporativa.",
    probInherent: 4,
    impactInherent: 4,
    scoreInherent: 16,
    levelInherent: "Alto",
    nistFunction: "PROTECT (PR.AA)",
    mitigationPlan: "Exigir MFA moderno em 100% dos usuários (M365 e VPN), integrar o processo de RH ao IAM para desprovisionamento no mesmo dia (Leaver) e extinguir contas compartilhadas.",
    probResidual: 2,
    impactResidual: 3,
    scoreResidual: 6,
    levelResidual: "Médio"
  },
  {
    id: "G01-RSK-04",
    name: "Vazamento Massivo de Dados de Clientes (Sanções LGPD)",
    description: "Acesso externo não autorizado a relatórios com links públicos anônimos sem senha ou acesso aos dados de notebook furtado que não possui BitLocker ativado.",
    probInherent: 4,
    impactInherent: 4,
    scoreInherent: 16,
    levelInherent: "Alto",
    nistFunction: "PROTECT / GOVERN",
    mitigationPlan: "Bloquear geração de links anônimos na nuvem, habilitar BitLocker em 100% dos 48 notebooks via MDM, revogar privilégios de administrador local e aplicar patches.",
    probResidual: 2,
    impactResidual: 3,
    scoreResidual: 6,
    levelResidual: "Médio"
  },
  {
    id: "G01-RSK-05",
    name: "Falhas de Governança e Contrato com Terceirizada (NexoTI)",
    description: "Ausência de SLA para resposta a incidentes críticos, uso de senhas mestras compartilhadas por técnicos terceirizados e falta de auditoria nas configurações de rede.",
    probInherent: 3,
    impactInherent: 4,
    scoreInherent: 12,
    levelInherent: "Alto",
    nistFunction: "GOVERN (GV.SC)",
    mitigationPlan: "Formalizar aditivo contratual estabelecendo SLAs de segurança, exigir credenciais nominais auditáveis para terceiros e implantar segmentação física/VLAN para visitantes.",
    probResidual: 1,
    impactResidual: 3,
    scoreResidual: 3,
    levelResidual: "Baixo"
  }
];

export interface WiresharkPacket {
  number: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'QUIC' | 'ICMPv6';
  length: number;
  info: string;
  badgeColor: string;
  layers: {
    physical: string;
    datalink: string;
    network: string;
    transport: string;
  };
  hexSnippet: string;
}

export const wiresharkPacketsData: WiresharkPacket[] = [
  {
    number: 210,
    time: "117.483",
    source: "2800:3f0:4001:808::[REDACTED_CDN]",
    destination: "2804:4540:1908:7200:[REDACTED_CLIENT]",
    protocol: "QUIC",
    length: 84,
    info: "Protected Payload (KP0)",
    badgeColor: "purple",
    layers: {
      physical: "Frame 210: 84 bytes capturados na interface Wi-Fi 802.11 (Windows 10).",
      datalink: "Ethernet II: MAC Origem (Roteador FiberX 10:e8:3a:XX:XX:XX) -> MAC Destino (Host Local 54:35:30:XX:XX:XX).",
      network: "IPv6 Header: Origem CDN -> Destino Cliente. Next Header: UDP (17). Hop Limit: 118.",
      transport: "UDP Porta 443 -> QUIC 1-RTT Protected Payload. Criptografado com chaves derivadas do TLS 1.3 (Key Phase 0). Protegido contra sniffing em trânsito."
    },
    hexSnippet: "40 00 00 00 01 db 52 4b 3f e9 21 8c a4 f0 2b e1 ... [ENCRYPTED PAYLOAD]"
  },
  {
    number: 211,
    time: "117.546",
    source: "2804:4540:1908:7200:[REDACTED_CLIENT]",
    destination: "2800:3f0:4001:808::[REDACTED_CDN]",
    protocol: "QUIC",
    length: 1292,
    info: "Initial, DCID=[DCID-PROTEGIDO], PKN: 8, ACK, PADDING",
    badgeColor: "purple",
    layers: {
      physical: "Frame 211: 1292 bytes na interface sem fio. Tamanho preenchido até atingir MTU recomendado.",
      datalink: "Ethernet II: MAC Origem Host Local (54:35:30:XX:XX:XX) -> MAC Gateway (10:e8:3a:XX:XX:XX).",
      network: "IPv6 Header: Tráfego de subida do cliente para o servidor da CDN.",
      transport: "QUIC Long Header (Initial): DCID protegido, Packet Number 8. Contém frames ACK e PADDING intencional para mitigar amplificação de pacotes UDP."
    },
    hexSnippet: "c0 00 00 01 08 4d 7e 82 19 0a 00 00 ... 00 00 00 [PADDING TO 1292 BYTES]"
  },
  {
    number: 212,
    time: "117.548",
    source: "2804:4540:1908:7200:[REDACTED_CLIENT]",
    destination: "2800:3f0:4001:808::[REDACTED_CDN]",
    protocol: "QUIC",
    length: 102,
    info: "Handshake, DCID=[DCID-PROTEGIDO]",
    badgeColor: "purple",
    layers: {
      physical: "Frame 212: 102 bytes capturados no adaptador Wi-Fi.",
      datalink: "Ethernet II: Entrega local no enlace de Camada 2 concluída com sucesso.",
      network: "IPv6 Header: Continuidade do fluxo bidirecional de transporte.",
      transport: "QUIC Handshake: Troca criptográfica nativa TLS 1.3 sobre UDP sem a sobrecarga de um handshake TCP tradicional de 3 vias separado."
    },
    hexSnippet: "e0 00 00 01 08 2b 4c 11 9f 02 a3 89 22 ... [TLS 1.3 CRYPTO PARAMETERS]"
  },
  {
    number: 221,
    time: "122.091",
    source: "fe80::1 (Link-Local Gateway)",
    destination: "fe80::[REDACTED_CLIENT]",
    protocol: "ICMPv6",
    length: 90,
    info: "Neighbor Solicitation (NDP)",
    badgeColor: "cyan",
    layers: {
      physical: "Frame 221: 90 bytes recebidos via Wi-Fi do Gateway.",
      datalink: "Ethernet II: Roteador de borda consulta a máquina local no mesmo segmento físico.",
      network: "IPv6 Link-Local: fe80::1 -> fe80::local. Next Header: 58 (ICMPv6). Hop Limit: 255 (exigência de segurança do RFC 4861).",
      transport: "ICMPv6 Tipo 135: Neighbor Solicitation (NDP). O substituto moderno do ARP para IPv6, verificando conectividade e endereço MAC."
    },
    hexSnippet: "60 00 00 00 00 28 3a ff fe 80 00 00 00 00 00 00 ... 87 00 [ICMPv6 TYPE 135]"
  },
  {
    number: 222,
    time: "122.094",
    source: "fe80::[REDACTED_CLIENT]",
    destination: "fe80::1 (Link-Local Gateway)",
    protocol: "ICMPv6",
    length: 86,
    info: "Neighbor Advertisement (NDP)",
    badgeColor: "cyan",
    layers: {
      physical: "Frame 222: 86 bytes transmitidos em resposta imediata.",
      datalink: "Ethernet II: Host local envia seu endereço físico MAC para a tabela de vizinhança do roteador.",
      network: "IPv6 Link-Local: Origem Host -> Destino Gateway.",
      transport: "ICMPv6 Tipo 136: Neighbor Advertisement (NDP). Confirma a posse do endereço IPv6 e informa os parâmetros de Camada 2."
    },
    hexSnippet: "60 00 00 00 00 24 3a ff fe 80 00 00 00 ... 88 00 [ICMPv6 TYPE 136]"
  },
  {
    number: 225,
    time: "124.082",
    source: "2804:4540:1908:7200:[REDACTED_CLIENT]",
    destination: "ff02::1:ffd3:5d92 (Solicited-Node Multicast)",
    protocol: "ICMPv6",
    length: 90,
    info: "Neighbor Solicitation (Multicast Solicited-Node)",
    badgeColor: "amber",
    layers: {
      physical: "Frame 225: 90 bytes capturados na interface Wi-Fi.",
      datalink: "Ethernet II com Tag VLAN 802.1Q (Priority: 0, DEI: 0, ID: 0). Destino MAC Multicast IPv6 (33:33:ff:d3:5d:92).",
      network: "IPv6 Header: Envio para grupo Multicast de Nó Solicitado ff02::1:ffd3:5d92.",
      transport: "ICMPv6 Tipo 135: Demonstração prática de como o IPv6 extinguiu completamente o tráfego de Broadcast, poupando CPU e largura de banda."
    },
    hexSnippet: "33 33 ff d3 5d 92 54 35 30 xx xx xx 81 00 00 00 86 dd ... [NO BROADCAST]"
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  module: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    question: "No incidente ALT-042 (comprometimento de conta em nuvem com criação de regra de encaminhamento de e-mails), o antivírus local do computador não acusou malware. Qual a análise correta pelo ciclo de defesa?",
    module: "Módulo 2 (Ciclo de Defesa)",
    options: [
      "Como o antivírus não detectou nenhum artefato, trata-se de um falso positivo comprovado.",
      "O comprometimento de credenciais em nuvem (ex.: via phishing) ocorre independentemente de infecção no endpoint local; a contenção exige revogação imediata de sessões/tokens e exclusão da regra.",
      "Basta bloquear o endereço IP de origem no firewall perimetral local que a sessão ativa na nuvem será desconectada.",
      "A função RECOVER deve ser acionada antes de DETECT e RESPOND."
    ],
    correctIndex: 1,
    explanation: "Em ambientes modernos de SaaS e computação em nuvem, ataques baseados em roubo de credencial (phishing, spray, token theft) exploram a identidade diretamente na nuvem sem precisar executar código malicioso no computador do usuário. Apenas alterar a senha ou bloquear o IP não invalida tokens de acesso OAuth2 ativos!"
  },
  {
    id: 2,
    question: "Segundo as diretrizes modernas de IAM e o NIST, qual dos métodos de autenticação abaixo é classificado como resistente a phishing?",
    module: "Módulo 6 (IAM & Identidade)",
    options: [
      "Senha complexa acompanhada de código de verificação enviado por SMS.",
      "Senha corporativa e código PIN digitados no mesmo formulário de login.",
      "FIDO2 / WebAuthn (Passkeys / chaves criptográficas com vinculação de origem e validação local).",
      "Senha e validação por geolocalização ou IP da rede interna da empresa."
    ],
    correctIndex: 2,
    explanation: "O FIDO2/WebAuthn vincula a assinatura criptográfica ao domínio exato (origin-binding) exibido no navegador. Mesmo que o usuário seja enganado por um site clonado de phishing ou proxy reverso (ex: Evilginx), a chave privada só assina o desafio emitido pelo domínio real da aplicação."
  },
  {
    id: 3,
    question: "No laboratório de Hardening NetSim (Lab 5), por que a regra 'iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT' é crucial ao aplicar a política padrão DROP?",
    module: "Módulo 5 (Hardening de Rede)",
    options: [
      "Ela autoriza a abertura indiscriminada de qualquer nova porta da internet para a LAN.",
      "Ela permite que os pacotes de resposta legítima de conexões já iniciadas por nós sejam aceitos de volta (inspeção de estado), evitando ter que abrir portas de entrada fixas.",
      "Ela desativa o protocolo de resolução de endereços na camada de enlace.",
      "Ela criptografa todo o tráfego da rede local através de um túnel VPN automático."
    ],
    correctIndex: 1,
    explanation: "A inspeção stateful (com conntrack) mantém uma tabela na memória do kernel do Linux que reconhece pacotes pertencentes a fluxos bidirecionais autorizados (ESTABLISHED) ou conexões correlatas (RELATED), permitindo navegação de dentro para fora sem expor a rede a ataques de fora para dentro."
  },
  {
    id: 4,
    question: "Na dissecação de pacotes com Wireshark, qual é a principal característica do protocolo QUIC (HTTP/3) comparado ao tráfego HTTP tradicional sobre TCP?",
    module: "Módulo 4 (Redes & Wireshark)",
    options: [
      "Opera sobre TCP porta 80 transmitindo dados em texto claro para facilitar auditoria perimetral.",
      "Opera sobre UDP na porta 443 integrando o handshake e criptografia TLS 1.3 nativa, protegendo o payload (KP0) contra interceptação.",
      "Utiliza exclusivamente pacotes de broadcast na camada 2 para descobrir servidores.",
      "É um protocolo proprietário incompatível com a pilha IPv6."
    ],
    correctIndex: 1,
    explanation: "O QUIC substitui a combinação legada TCP + TLS por uma camada de transporte moderna sobre UDP 443. Ele reduz a latência (0-RTT), unifica o handshake criptográfico com TLS 1.3 e impede ataques de sniffing e manipulação de tráfego por intermediários não autorizados."
  },
  {
    id: 5,
    question: "Um colaborador foi transferido do setor de Compras para o Marketing há 5 meses, mas ainda consegue aprovar solicitações de compras de fornecedores. Qual falha fundamental de IAM ocorreu?",
    module: "Módulo 6 (IAM & Identidade)",
    options: [
      "Falha no processo Mover do ciclo JML (Privilege Creep): concessão do novo papel sem desprovisionamento dos acessos da função anterior.",
      "Falha no algoritmo de criptografia do banco de dados.",
      "Comportamento correto pelo princípio do menor privilégio.",
      "Ausência de backup imutável com retenção WORM."
    ],
    correctIndex: 0,
    explanation: "O fenômeno do acúmulo gradual de privilégios (Privilege Creep) ocorre quando colaboradores mudam de setor ou projeto e novos perfis são adicionados sem que os acessos anteriores sejam formalmente revogados. O processo Mover deve exigir alinhamento entre o gestor anterior, novo gestor e TI."
  },
  {
    id: 6,
    question: "No diagnóstico de riscos do Caso Aurora Distribuição, por que o cenário de Ransomware nos Backups (G01-RSK-03) foi classificado como Crítico e Prioritário?",
    module: "Módulo 3 (Gestão de Riscos)",
    options: [
      "Porque backups não precisam de nenhuma proteção caso a empresa use antivírus nos notebooks.",
      "Porque as cópias de backup estavam na mesma conta de nuvem da produção, sem imutabilidade e sem testes de restauração, inviabilizando a meta de RTO de 4 horas.",
      "Porque a empresa não possuía rede Wi-Fi para visitantes.",
      "Porque o custo de armazenamento de nuvem excedia o orçamento anual."
    ],
    correctIndex: 1,
    explanation: "Se os backups compartilham a mesma conta com credenciais de produção e não possuem retenção imutável (Object Lock), um invasor com credenciais administrativas pode apagar tanto a produção quanto as cópias de segurança. Sem backups íntegros, a restauração da empresa em 4 horas (RTO) se torna impossível."
  },
  {
    id: 7,
    question: "No IPv6, por que a ausência de resposta ao comando ping não significa necessariamente que o computador de destino está desconectado?",
    module: "Módulo 4 (Redes & Wireshark)",
    options: [
      "Porque o IPv6 não possui protocolo ICMP.",
      "Porque firewalls de host (como o Windows Defender Firewall) descartam requisições ICMP Echo Request por padrão e redes Wi-Fi com AP Isolation impedem comunicação direta entre clientes.",
      "Porque cabos de rede de fibra óptica não transmitem pacotes com endereçamento hexadecimal.",
      "Porque todo tráfego IPv6 é obrigatoriamente roteado por proxy reverso."
    ],
    correctIndex: 1,
    explanation: "Firewalls locais modernos utilizam política restritiva (DROP) para pacotes ICMP não solicitados oriundos da rede. Além disso, tecnologias como isolamento de clientes sem fio (AP Isolation) impedem que um computador descubra ou envie pacotes diretamente a outro dispositivo na mesma antena Wi-Fi."
  },
  {
    id: 8,
    question: "O que preconiza o princípio de Segregação de Funções (SoD - Separation of Duties) em sistemas corporativos?",
    module: "Módulo 6 (IAM & Identidade)",
    options: [
      "Que todos os funcionários de uma equipe devem compartilhar a mesma senha de administrador para garantir disponibilidade.",
      "Que processos críticos de negócio (ex.: cadastrar fornecedor, solicitar compra e aprovar pagamento) não devem poder ser executados integralmente por um único indivíduo.",
      "Que os servidores de banco de dados devem ficar no mesmo switch que a rede de visitantes.",
      "Que a autenticação deve ser realizada apenas uma vez por ano."
    ],
    correctIndex: 1,
    explanation: "A Segregação de Funções (SoD) previne fraudes e erros deliberados ao dividir etapas de um fluxo sensível entre diferentes papéis/identidades. Quem solicita a compra não pode aprovar seu próprio pedido ou emitir a ordem de pagamento no banco."
  },
  {
    id: 9,
    question: "Na modelagem de controle de acesso corporativo, qual é a distinção correta entre Papel, Cargo e Grupo de Diretório?",
    module: "Módulo 6 (IAM & RBAC/ABAC)",
    options: [
      "Papel, cargo e grupo de diretório são sinônimos universais intercambiáveis em qualquer produto de nuvem.",
      "Cargo (ex: 'Analista') é uma definição ampla de RH; Grupo de diretório (ex: 'Equipe Atlas') é um agrupador de rede; já o Papel representa responsabilidades técnicas específicas no sistema (ex: Leitor, Editor, Revisor) às quais se associam permissões.",
      "Grupos de diretório concedem automaticamente direitos administrativos irrestritos aos seus membros.",
      "O papel deve sempre herdar automaticamente todos os privilégios do organograma corporativo da chefia."
    ],
    correctIndex: 1,
    explanation: "Conforme o material de estudo (Pág. 4), um cargo como 'Analista' é amplo demais para conceder privilégios; duas pessoas com o mesmo cargo podem ter papéis distintos. Um grupo de rede não informa por si só quais permissões o sistema concede; deve-se verificar a associação formal do papel técnico no sistema."
  },
  {
    id: 10,
    question: "Segundo o padrão arquitetural NIST SP 800-162 / XACML para sistemas de decisão de acesso, qual é a função respectiva do PEP, PDP e PIP?",
    module: "Módulo 6 (IAM & RBAC/ABAC)",
    options: [
      "O PEP toma a decisão criptográfica, o PDP armazena senhas e o PIP gera tokens MFA.",
      "O PEP (Policy Enforcement Point) intercepta a requisição e aplica o bloqueio/liberação; o PDP (Policy Decision Point) avalia a política contra os dados; e o PIP (Policy Information Point) disponibiliza os atributos necessários em tempo real.",
      "O PIP define as políticas no portal, o PDP bloqueia a interface e o PEP audita os logs no dia seguinte.",
      "Os três componentes operam exclusivamente como servidores físicos de firewall perimetral."
    ],
    correctIndex: 1,
    explanation: "Na arquitetura de autorização externa (Pág. 10 e Slide 10), o PEP intercepta a solicitação do usuário e consulta o PDP. O PDP busca os atributos atualizados no PIP (como status no RH e MDM), confronta com a política configurada no PAP e devolve a decisão (Permitir ou Negar) para o PEP executar."
  },
  {
    id: 11,
    question: "Qual é a 'Regra de Ouro da Integridade' na avaliação de políticas baseadas em atributos (ABAC)?",
    module: "Módulo 6 (IAM & RBAC/ABAC)",
    options: [
      "Ausente = Permitido: na dúvida ou ausência de atributo, o sistema deve assumir a opção mais permissiva para não parar o negócio.",
      "Ausente ≠ Permitido: um atributo obrigatório ausente, inválido ou considerado desatualizado resulta obrigatoriamente em negação automática (Fail-closed).",
      "Qualquer usuário autenticado com MFA tem todos os seus atributos considerados válidos indefinidamente.",
      "Atributos de contexto como horário e geolocalização substituem a necessidade de verificar permissões no recurso."
    ],
    correctIndex: 1,
    explanation: "A Regra de Ouro (Slide 8 e Pág. 8) preconiza: Ausente ≠ Permitido. A arquitetura nunca deve preencher falhas técnicas ou atributos nulos com opções permissivas. Se a classificação do recurso ou o status do dispositivo não puderem ser confirmados, o acesso deve ser bloqueado."
  },
  {
    id: 12,
    question: "No Modelo Híbrido H1 (RBAC + ABAC), o que ocorre se o sujeito possuir o papel técnico 'Editor' (que possui direito de leitura na matriz RBAC), mas o documento pertencer a um projeto não listado em 'sujeito.projetos'?",
    module: "Módulo 6 (IAM & RBAC/ABAC)",
    options: [
      "O acesso é concedido, pois a matriz RBAC sempre sobrepõe qualquer condição de atributos.",
      "O acesso é negado, pois no modelo híbrido H1 é mandatário cumprir a concessão do papel na matriz RBAC E todas as condições situacionais da política ABAC A1.",
      "O sistema converte automaticamente o documento para classificação pública.",
      "O acesso é concedido temporariamente por 15 minutos."
    ],
    correctIndex: 1,
    explanation: "No modelo combinado H1 (Pág. 11 e Slide 11), a decisão final exige: H1 = permissão pelo papel (RBAC) E condições de A1 (ABAC). Ter o papel de Editor concede capacidade técnica de ler, mas falhar na restrição de projeto do ABAC impede a concessão."
  }
];

// Dados estruturados do novo material IAM Blueprint: Modelando o Controle de Acesso (RBAC & ABAC)
export interface RbacMatrixRow {
  action: string;
  leitor: boolean;
  editor: boolean;
  revisor: boolean;
  auditor: boolean;
}

export const rbacMatrixOfficial: RbacMatrixRow[] = [
  { action: "Ler documento", leitor: true, editor: true, revisor: true, auditor: false },
  { action: "Enviar versão", leitor: false, editor: true, revisor: false, auditor: false },
  { action: "Registrar revisão", leitor: false, editor: false, revisor: true, auditor: false },
  { action: "Consultar logs", leitor: false, editor: false, revisor: false, auditor: true },
  { action: "Excluir documento", leitor: false, editor: false, revisor: false, auditor: false },
  { action: "Administrar acessos", leitor: false, editor: false, revisor: false, auditor: false }
];

export interface AbacAttributeDef {
  name: string;
  category: 'Sujeito' | 'Recurso' | 'Operação' | 'Ambiente / Contexto';
  type: string;
  source: string;
  description: string;
}

export const abacAttributesDictionary: AbacAttributeDef[] = [
  {
    name: "sujeito.tipo",
    category: "Sujeito",
    type: "Texto ('pessoa' | 'servico')",
    source: "Serviço de Diretório / IdP",
    description: "Distingue seres humanos de contas de serviço e integrações automatizadas."
  },
  {
    name: "sujeito.ativo",
    category: "Sujeito",
    type: "Booleano (verdadeiro | falso)",
    source: "Cadastro de Vínculo (RH / Gestor de Contratos)",
    description: "Indica se o colaborador ou terceiro terceirizado possui contrato vigente e regular."
  },
  {
    name: "sujeito.projetos",
    category: "Sujeito",
    type: "Conjunto de IDs: {Atlas, Boreal, Ceres}",
    source: "Gestão Corporativa de Projetos",
    description: "Lista de códigos de projetos nos quais a pessoa foi formalmente autorizada a atuar."
  },
  {
    name: "sujeito.inicio / fim",
    category: "Sujeito",
    type: "Data/Hora com Fuso (UTC-03:00)",
    source: "Fluxo Aprovado de Concessão / IAM",
    description: "Janela temporal de validade do acesso. Início é inclusivo (≥) e término é exclusivo (<)."
  },
  {
    name: "recurso.tipo",
    category: "Recurso",
    type: "Texto ('documento' | 'relatorio')",
    source: "Metadados do Repositório",
    description: "Classificação do tipo de ativo sendo acessado no portal."
  },
  {
    name: "recurso.projeto",
    category: "Recurso",
    type: "ID do Projeto (ex: Atlas, Boreal)",
    source: "Cadastro do Documento no Portal",
    description: "Identificador do projeto ao qual o documento está vinculado."
  },
  {
    name: "recurso.classificacao",
    category: "Recurso",
    type: "Valor Controlado ('interno' | 'restrito' | 'confidencial')",
    source: "Dono da Informação / Processo de Classificação",
    description: "Grau de sensibilidade da informação contida no arquivo."
  },
  {
    name: "contexto.dispositivo_gerenciado",
    category: "Ambiente / Contexto",
    type: "Booleano (verdadeiro | falso)",
    source: "MDM / EDR Corporativo (Endpoint Management)",
    description: "Confirma se a estação de trabalho possui antivírus atualizado, BitLocker e certificados."
  },
  {
    name: "contexto.agora",
    category: "Ambiente / Contexto",
    type: "Data e Hora Confiável (UTC-03:00)",
    source: "Relógio do Serviço de Autorização (NTP)",
    description: "Timestamp auditável no exato momento da avaliação pelo motor PDP."
  }
];

export interface TestCaseT {
  id: string;
  name: string;
  isolatedChange: string;
  expected: 'Permitir' | 'Negar';
  reason: string;
  category: 'Ideal' | 'Papel' | 'Projeto' | 'Classificação' | 'Dispositivo' | 'Horário' | 'Atributo' | 'Operação';
}

export const testCasesH1Data: TestCaseT[] = [
  {
    id: "T1",
    name: "Estado de Referência (Ideal)",
    isolatedChange: "Tudo válido: Papel Editor, Projeto Atlas, Interno, Dispositivo gerenciado, 14:00 (dentro de 09:00-17:00).",
    expected: "Permitir",
    reason: "Matriz RBAC concede leitura para Editor E todas as 6 condições da política ABAC A1 são atendidas.",
    category: "Ideal"
  },
  {
    id: "T2",
    name: "Papel Auditor na Matriz RBAC",
    isolatedChange: "Possui somente o papel Auditor (mantendo todos os atributos de contexto válidos).",
    expected: "Negar",
    reason: "A matriz RBAC não concede permissão de leitura para o papel Auditor (auditor só consulta logs).",
    category: "Papel"
  },
  {
    id: "T3",
    name: "Projeto Não Autorizado",
    isolatedChange: "Documento D-27 pertence ao Projeto Boreal (o sujeito está alocado apenas em Atlas).",
    expected: "Negar",
    reason: "Condição 4 falha: recurso.projeto não pertence ao conjunto sujeito.projetos.",
    category: "Projeto"
  },
  {
    id: "T4",
    name: "Classificação Restrito",
    isolatedChange: "Documento possui recurso.classificacao = 'restrito'.",
    expected: "Negar",
    reason: "Condição 3 falha: A regra A1 concede leitura estritamente para classificação 'interno'.",
    category: "Classificação"
  },
  {
    id: "T5",
    name: "Dispositivo Não Gerenciado",
    isolatedChange: "Acesso originado de dispositivo pessoal (BYOD sem MDM corporativo).",
    expected: "Negar",
    reason: "Condição 5 falha: contexto.dispositivo_gerenciado = falso.",
    category: "Dispositivo"
  },
  {
    id: "T6",
    name: "Horário de Limite Inferior (09:00)",
    isolatedChange: "Solicitação recebida exatamente às 09:00:00 (UTC-03:00).",
    expected: "Permitir",
    reason: "Condição 6 atendida: O início do intervalo é inclusivo (sujeito.inicio ≤ contexto.agora).",
    category: "Horário"
  },
  {
    id: "T7",
    name: "Horário de Limite Superior (17:00)",
    isolatedChange: "Solicitação recebida exatamente às 17:00:00 (UTC-03:00).",
    expected: "Negar",
    reason: "Condição 6 falha: O término do intervalo é exclusivo (< sujeito.fim; 17:00 não é menor que 17:00).",
    category: "Horário"
  },
  {
    id: "T8",
    name: "Projeto do Recurso Ausente",
    isolatedChange: "Campo recurso.projeto ausente ou nulo no cadastro do portal.",
    expected: "Negar",
    reason: "Regra de Ouro: Ausente ≠ Permitido. Condição obrigatória ausente impede concessão.",
    category: "Atributo"
  },
  {
    id: "T9",
    name: "Antes do Início da Validade (08:59)",
    isolatedChange: "Solicitação enviada às 08:59:59 (UTC-03:00).",
    expected: "Negar",
    reason: "Condição 6 falha: A janela de validade ainda não teve início.",
    category: "Horário"
  },
  {
    id: "T10",
    name: "Ação Não Concedida (Excluir)",
    isolatedChange: "Ação solicitada: 'excluir' em vez de 'ler'.",
    expected: "Negar",
    reason: "H1 foi modelada apenas para leitura; não há concessão de exclusão (nem em RBAC nem em A1).",
    category: "Operação"
  }
];

export interface PracticeCase8 {
  id: number;
  subject: string;
  active: boolean;
  userUnit: string;
  validity: string;
  reportId: string;
  reportUnit: string;
  reportClass: string;
  timeReq: string;
  managedDevice: boolean;
  unitMissing?: boolean;
  expected: 'Permitir' | 'Negar';
  justification: string;
}

export const practiceCases8Data: PracticeCase8[] = [
  {
    id: 1,
    subject: "Operador 1",
    active: true,
    userUnit: "Norte",
    validity: "09:00 às 16:00",
    reportId: "R1",
    reportUnit: "Norte",
    reportClass: "Interno",
    timeReq: "15:00",
    managedDevice: true,
    expected: "Permitir",
    justification: "Vínculo ativo, mesma unidade (Norte == Norte), interno, dispositivo gerenciado e 15:00 dentro do intervalo [09:00, 16:00)."
  },
  {
    id: 2,
    subject: "Operador 1",
    active: true,
    userUnit: "Norte",
    validity: "09:00 às 16:00",
    reportId: "R2",
    reportUnit: "Sul",
    reportClass: "Interno",
    timeReq: "15:00",
    managedDevice: true,
    expected: "Negar",
    justification: "Unidade divergente: solicitante é da unidade Norte e o relatório pertence à unidade Sul."
  },
  {
    id: 3,
    subject: "Operador Inativo",
    active: false,
    userUnit: "Norte",
    validity: "09:00 às 18:00",
    reportId: "R1",
    reportUnit: "Norte",
    reportClass: "Interno",
    timeReq: "15:00",
    managedDevice: true,
    expected: "Negar",
    justification: "Condição de vínculo falha: sujeito.ativo = falso (usuário desligado ou suspenso)."
  },
  {
    id: 4,
    subject: "Operadora 2",
    active: true,
    userUnit: "Sul",
    validity: "09:00 às 18:00",
    reportId: "R2",
    reportUnit: "Sul",
    reportClass: "Interno",
    timeReq: "09:00",
    managedDevice: true,
    expected: "Permitir",
    justification: "Horário de início é inclusivo (09:00 ≥ 09:00), mesma unidade Sul, interno e dispositivo gerenciado."
  },
  {
    id: 5,
    subject: "Operador 1",
    active: true,
    userUnit: "Norte",
    validity: "09:00 às 16:00",
    reportId: "R1",
    reportUnit: "Norte",
    reportClass: "Interno",
    timeReq: "16:00",
    managedDevice: true,
    expected: "Negar",
    justification: "Horário de término é estritamente exclusivo (< 16:00). Às 16:00 em ponto, o acesso já está expirado."
  },
  {
    id: 6,
    subject: "Operador 1",
    active: true,
    userUnit: "Norte",
    validity: "09:00 às 16:00",
    reportId: "R3",
    reportUnit: "Norte",
    reportClass: "Restrito",
    timeReq: "15:00",
    managedDevice: true,
    expected: "Negar",
    justification: "A regra de consulta cobre apenas relatórios 'Interno'; R3 possui classificação 'Restrito'."
  },
  {
    id: 7,
    subject: "Operadora 2",
    active: true,
    userUnit: "Sul",
    validity: "09:00 às 18:00",
    reportId: "R2",
    reportUnit: "Sul",
    reportClass: "Interno",
    timeReq: "15:00",
    managedDevice: false,
    expected: "Negar",
    justification: "Dispositivo não gerenciado: viola a exigência de segurança de endpoint gerenciado."
  },
  {
    id: 8,
    subject: "Operador 1",
    active: true,
    userUnit: "Norte",
    validity: "09:00 às 16:00",
    reportId: "R1",
    reportUnit: "",
    reportClass: "Interno",
    timeReq: "15:00",
    managedDevice: true,
    unitMissing: true,
    expected: "Negar",
    justification: "Regra de Ouro: Unidade do relatório ausente. Ausência de dado obrigatório resulta em negação automática."
  }
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'IAM' | 'NIST & SOC' | 'Redes' | 'Governança & Risco';
  standard: string;
}

export const glossaryTermsData: GlossaryTerm[] = [
  {
    term: "Tríade CIA",
    definition: "Pilares basilares da segurança: Confidencialidade (acesso restrito), Integridade (exatidão sem adulteração) e Disponibilidade (operacionalidade contínua).",
    category: "Governança & Risco",
    standard: "ISO/IEC 27000 / NIST SP 800-12"
  },
  {
    term: "NIST CSF 2.0",
    definition: "Framework de Cybersecurity do NIST estruturado em 6 funções contínuas: Governar (GV), Identificar (ID), Proteger (PR), Detectar (DE), Responder (RS) e Recuperar (RC).",
    category: "NIST & SOC",
    standard: "NIST CSF 2.0 (2024)"
  },
  {
    term: "RTO (Recovery Time Objective)",
    definition: "Tempo máximo admissível de interrupção para restaurar um serviço crítico antes de gerar colapso logístico ou financeiro (no Caso Aurora: 4 horas).",
    category: "Governança & Risco",
    standard: "ISO 22301 / DRP"
  },
  {
    term: "RPO (Recovery Point Objective)",
    definition: "Volume máximo de perda de dados tolerável medido em tempo (no Caso Aurora: 1 hora de transações no banco).",
    category: "Governança & Risco",
    standard: "ISO 22301 / BCP"
  },
  {
    term: "Object Lock (WORM)",
    definition: "Mecanismo de imutabilidade em nuvem (Write Once, Read Many) que impede deleção deliberada de backups mesmo por usuários com privilégios administrativos.",
    category: "Governança & Risco",
    standard: "NIST SP 800-209"
  },
  {
    term: "QUIC (HTTP/3)",
    definition: "Protocolo de transporte sobre UDP na porta 443 com criptografia TLS 1.3 nativa (Key Phase 0) e 0-RTT, eliminando sniffing e sobrecarga de handshake TCP.",
    category: "Redes",
    standard: "RFC 9000 / IETF"
  },
  {
    term: "ICMPv6 NDP (Neighbor Discovery)",
    definition: "Protocolo IPv6 (Tipos 135 e 136) que substitui o ARP e elimina o Broadcast na camada de enlace através de grupos Multicast de Nó Solicitado.",
    category: "Redes",
    standard: "RFC 4861"
  },
  {
    term: "Stateful Conntrack (iptables)",
    definition: "Módulo de inspeção de estado do Netfilter que mantém tabela na memória para autorizar tráfego de retorno legítimo (ESTABLISHED,RELATED) com política DROP.",
    category: "Redes",
    standard: "Linux Netfilter"
  },
  {
    term: "SoD (Segregação de Funções)",
    definition: "Separação mandatória de atividades sensíveis (ex.: solicitar compras, aprovar pedidos e emitir pagamento) para evitar fraudes, erros e autorrevisão.",
    category: "IAM",
    standard: "NIST SP 800-53 (AC-5)"
  },
  {
    term: "FIDO2 / Passkeys / WebAuthn",
    definition: "Padrão de autenticação sem senha com vinculação criptográfica ao domínio de origem (origin-binding), totalmente imune a ataques de phishing por proxy reverso.",
    category: "IAM",
    standard: "FIDO Alliance / W3C"
  },
  {
    term: "Privilege Creep",
    definition: "Acúmulo progressivo de permissões desnecessárias decorrente de transferências de cargo (processo Mover) sem o devido desprovisionamento dos papéis anteriores.",
    category: "IAM",
    standard: "NIST SP 800-63A"
  },
  {
    term: "PEP (Policy Enforcement Point)",
    definition: "Ponto da aplicação ou API que intercepta a requisição do usuário e aplica rigorosamente a decisão de permitir ou bloquear recebida do PDP.",
    category: "IAM",
    standard: "NIST SP 800-162 / XACML"
  },
  {
    term: "PDP (Policy Decision Point)",
    definition: "Motor lógico que avalia o pedido contra as políticas autorizadas, correlacionando atributos em tempo real para emitir veredito final.",
    category: "IAM",
    standard: "NIST SP 800-162 / XACML"
  },
  {
    term: "PIP (Policy Information Point)",
    definition: "Fonte confiável de atributos consultada pelo PDP (serviços de RH, MDM de endpoints, gerenciamento de projetos e relógio NTP).",
    category: "IAM",
    standard: "NIST SP 800-162 / XACML"
  },
  {
    term: "PAP (Policy Administration Point)",
    definition: "Ponto onde as políticas de acesso são formalmente redigidas, versionadas, auditadas e publicadas pela equipe de governança de segurança.",
    category: "IAM",
    standard: "NIST SP 800-162 / XACML"
  },
  {
    term: "Regra de Ouro (Ausente ≠ Permitido)",
    definition: "Princípio de que a ausência ou invalidade de um atributo obrigatório implica negação automática (Fail-Closed); o sistema nunca deve assumir permissividade na falha.",
    category: "IAM",
    standard: "NIST SP 800-205"
  }
];

export interface IptablesRecipe {
  title: string;
  command: string;
  chain: 'FORWARD' | 'INPUT' | 'NAT';
  description: string;
  category: 'Segurança Perimetral' | 'Proteção de Servidor' | 'Isolamento de Zonas';
}

export const iptablesRecipesData: IptablesRecipe[] = [
  {
    title: "Política Padrão Default Deny (Stateful)",
    command: "iptables -P FORWARD DROP && iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT",
    chain: "FORWARD",
    description: "Bloqueia todo tráfego novo por padrão e permite retorno legítimo de conexões já abertas de dentro para fora.",
    category: "Segurança Perimetral"
  },
  {
    title: "Permitir Acesso HTTP Restrito (DMZ/Intranet)",
    command: "iptables -A FORWARD -i eth0 -o eth1 -s 192.168.10.0/24 -d 192.168.20.10 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT",
    chain: "FORWARD",
    description: "Aplica menor privilégio permitindo apenas tráfego HTTP na porta 80 da rede de usuários para o servidor web.",
    category: "Proteção de Servidor"
  },
  {
    title: "Isolamento Completo da Rede de Visitantes",
    command: "iptables -A FORWARD -i eth2 -o eth1 -j DROP && iptables -A FORWARD -i eth2 -o eth0 -j DROP",
    chain: "FORWARD",
    description: "Impede que qualquer pacote originado da sub-rede de visitantes (.30) alcance usuários (.10) ou servidores (.20).",
    category: "Isolamento de Zonas"
  },
  {
    title: "Restrição de Acesso SSH Exclusivo para Sub-rede MGMT",
    command: "iptables -A FORWARD -i eth2 -s 192.168.30.10 -d 192.168.1.20 -p tcp --dport 22 -j ACCEPT && iptables -A FORWARD -p tcp --dport 22 -j DROP",
    chain: "FORWARD",
    description: "Garante que a porta administrativa 22 só seja acessada pela estação de gerência autorizada (pc2).",
    category: "Proteção de Servidor"
  },
  {
    title: "Bloqueio de Pacotes Inválidos e Descartados",
    command: "iptables -A FORWARD -m conntrack --ctstate INVALID -j DROP",
    chain: "FORWARD",
    description: "Descarta pacotes malformados ou que não pertencem a nenhuma conexão válida conhecida pelo kernel.",
    category: "Segurança Perimetral"
  }
];

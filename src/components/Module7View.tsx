import React, { useState } from 'react';
import {
  Cloud,
  Server,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Network,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Terminal,
  FileText,
  Lock,
  Globe,
  Database,
  Radio,
  Zap,
  Check,
  Copy,
  Info
} from 'lucide-react';
import { acervoDocs, TechDoc } from '../data/documents';

interface Module7ViewProps {
  isLightMode?: boolean;
  onOpenAcervoDoc?: (docNum: string) => void;
}

export const Module7View: React.FC<Module7ViewProps> = ({
  isLightMode = false
}) => {
  const [subTab, setSubTab] = useState<'fundamentos' | 'responsabilidade' | 'perimetro' | 'microtarefas'>('fundamentos');

  // Filter the 7 documents of Module 7
  const mod7Docs = acervoDocs.filter((d) => d.modulo === 'mod7');

  // Copied code snippet feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // State for Sub-tab 1: Service model selector
  const [selectedServiceModel, setSelectedServiceModel] = useState<'iaas' | 'paas' | 'saas'>('iaas');

  // State for Sub-tab 2: Shared Responsibility Matrix
  const [sharedMatrixModel, setSharedMatrixModel] = useState<'onprem' | 'iaas' | 'paas' | 'saas'>('iaas');
  const [activeIncidentId, setActiveIncidentId] = useState<number>(1);
  const [incidentUserChoice, setIncidentUserChoice] = useState<string | null>(null);
  const [revealedIncidents, setRevealedIncidents] = useState<Record<number, boolean>>({});

  // State for Sub-tab 3: SG vs NACL Simulator
  const [simPacketPort, setSimPacketPort] = useState<number>(443);
  const [simNaclInboundAllow, setSimNaclInboundAllow] = useState<boolean>(true);
  const [simSgInboundAllow, setSimSgInboundAllow] = useState<boolean>(true);
  const [simNaclOutboundEphemeralAllow, setSimNaclOutboundEphemeralAllow] = useState<boolean>(true);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simResult, setSimResult] = useState<'success' | 'blocked_nacl_in' | 'blocked_sg_in' | 'blocked_nacl_out' | null>(null);

  // State for Sub-tab 4: Microtasks
  const [activeTaskNum, setActiveTaskNum] = useState<number>(1);
  const [taskCategoryFilter, setTaskCategoryFilter] = useState<string>('Todas');

  // Run SG vs NACL Simulator Step-by-Step
  const runSgNaclSimulation = () => {
    setSimRunning(true);
    setSimStep(1);
    setSimResult(null);

    // Step 1: Internet to Subnet NACL Inbound
    setTimeout(() => {
      if (!simNaclInboundAllow) {
        setSimStep(1);
        setSimResult('blocked_nacl_in');
        setSimRunning(false);
        return;
      }
      // Step 2: NACL Inbound to Instance SG Inbound
      setSimStep(2);
      setTimeout(() => {
        if (!simSgInboundAllow) {
          setSimStep(2);
          setSimResult('blocked_sg_in');
          setSimRunning(false);
          return;
        }
        // Step 3: Instance Process & Stateful SG Outbound
        setSimStep(3);
        setTimeout(() => {
          // SG is stateful so return traffic automatically passes SG Outbound!
          // Step 4: Subnet NACL Outbound (Stateless check!)
          setSimStep(4);
          setTimeout(() => {
            if (!simNaclOutboundEphemeralAllow) {
              setSimStep(4);
              setSimResult('blocked_nacl_out');
              setSimRunning(false);
              return;
            }
            // Step 5: Success! Packet returns to client
            setSimStep(5);
            setSimResult('success');
            setSimRunning(false);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  const resetSgNaclSim = () => {
    setSimRunning(false);
    setSimStep(0);
    setSimResult(null);
  };

  // Shared Responsibility 9 Layers
  const sharedLayers = [
    {
      id: 'l1',
      nome: '1. Segurança Física dos Data Centers',
      desc: 'Portarias biométricas, gaiolas de servidores, geradores a diesel, climatização e câmeras CCTV.',
      onprem: 'Cliente (100%)',
      iaas: 'Provedor (100%)',
      paas: 'Provedor (100%)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l2',
      nome: '2. Infraestrutura de Hardware e Hypervisor',
      desc: 'Servidores físicos, blades, placas de rede, switches SAN e Hypervisor (KVM, Nitro, ESXi).',
      onprem: 'Cliente (100%)',
      iaas: 'Provedor (100%)',
      paas: 'Provedor (100%)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l3',
      nome: '3. Rede Física do Provedor & Backbone',
      desc: 'Fibra óptica subterrânea, roteadores de borda, cabos transoceânicos e mitigação física de DDoS.',
      onprem: 'Cliente (100%)',
      iaas: 'Provedor (100%)',
      paas: 'Provedor (100%)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l4',
      nome: '4. Sistema Operacional Convidado (Guest OS)',
      desc: 'Instalação, patching de vulnerabilidades, antivírus, hardening do kernel (Linux/Windows Server).',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Provedor (100%)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l5',
      nome: '5. Configuração de Rede Virtual (VPC / Subnets)',
      desc: 'Tabelas de rota, Security Groups, NACLs, VPC Peering, NAT Gateways e regras de firewall.',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Compartilhado (Provedor provê isolamento / Cliente define regras)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l6',
      nome: '6. Plataforma / Runtime / Middleware',
      desc: 'Node.js, JVM, Python runtime, Apache, NGINX, patching de bibliotecas de execução.',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Provedor (100%)',
      saas: 'Provedor (100%)'
    },
    {
      id: 'l7',
      nome: '7. Aplicações e Código-Fonte do Negócio',
      desc: 'Desenvolvimento seguro (DevSecOps), prevenção a SQL Injection, XSS, autenticação e APIs.',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Cliente (100%)',
      saas: 'Provedor (100% da aplicação base)'
    },
    {
      id: 'l8',
      nome: '8. Identidade e Acesso (IAM & Controles)',
      desc: 'Políticas de menor privilégio, senhas fortes, MFA obrigatório, RBAC/ABAC e tokens de serviço.',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Cliente (100%)',
      saas: 'Cliente (100% - Gestão de usuários e permissões)'
    },
    {
      id: 'l9',
      nome: '9. Dados do Cliente e Classificação da Informação',
      desc: 'Criptografia em repouso e em trânsito, backups, mascaramento, retenção LGPD e sigilo.',
      onprem: 'Cliente (100%)',
      iaas: 'Cliente (100%)',
      paas: 'Cliente (100%)',
      saas: 'Cliente (100% - Sempre responsabilidade do cliente!)'
    }
  ];

  // 7 Real Incidents from Prof. Rômulo's Materials
  const incidentCases = [
    {
      id: 1,
      codigo: 'INC-01',
      titulo: 'Bucket de Armazenamento Exposto Publicamente com Prontuários Médicos',
      ambiente: 'Armazenamento de Objetos (Storage / IaaS)',
      cenario:
        'Uma clínica de diagnósticos sofreu o vazamento de 140.000 laudos médicos em formato PDF. A auditoria constatou que o bucket S3 foi criado com a flag de acesso público habilitada por um desenvolvedor e sem política de bloqueio a nível de conta (Block Public Access desativado).',
      responsavelCorreto: 'Cliente',
      camada: 'IAM / Configuração de Controle de Acesso ao Storage',
      causaRaiz:
        'Falha humana na configuração de controle de acesso (IAM/Bucket Policy). O provedor de nuvem oferece ferramentas nativas para bloquear acesso público, porém a configuração é de custódia exclusiva do cliente.',
      respostaTatica:
        'Habilitar "S3 Block Public Access" global na conta AWS/GCP, configurar bucket com criptografia SSE-KMS, rodar AWS Config ou Security Hub para alertar buckets abertos e revogar chaves de acesso comprometidas.'
    },
    {
      id: 2,
      codigo: 'INC-02',
      titulo: 'Infecção por Ransomware em Servidor Windows Server Hospedado em VM IaaS',
      ambiente: 'Máquina Virtual IaaS (Compute Engine / EC2)',
      cenario:
        'Um servidor de faturamento executando Windows Server 2019 em uma instância IaaS foi criptografado por ransomware. O atacante explorou a vulnerabilidade EternalBlue (MS17-010) por falta de aplicação de patches de segurança acumulados há 9 meses.',
      responsavelCorreto: 'Cliente',
      camada: 'Sistema Operacional Convidado (Guest OS) e Patch Management',
      causaRaiz:
        'Em modelos IaaS, o provedor entrega apenas a infraestrutura e o hypervisor. A manutenção, atualização periódica de patches do sistema operacional convidado e instalação de EDR/Antivírus cabem 100% ao cliente.',
      respostaTatica:
        'Restaurar a instância a partir de snapshot imutável limpo (VSS), implementar AWS Systems Manager Patch Manager ou Azure Update Management para automação de patches, isolar a subnet via Security Group e fechar porta SMB 445.'
    },
    {
      id: 3,
      codigo: 'INC-03',
      titulo: 'Falha Crítica no Hypervisor do Data Center Derruba Múltiplos Tenants',
      ambiente: 'Camada de Virtualização Física do Provedor de Nuvem',
      cenario:
        'Uma falha de hardware em massa no chassi de servidores blade de uma Zona de Disponibilidade (AZ) corrompeu o Hypervisor proprietário do provedor, causando reinicialização forçada e indisponibilidade de centenas de máquinas virtuais de diversos clientes.',
      responsavelCorreto: 'Provedor de Nuvem',
      camada: 'Hardware Físico e Camada de Virtualização (Hypervisor)',
      causaRaiz:
        'O provedor de nuvem é integralmente responsável pela segurança e disponibilidade física "DA" nuvem (Security OF the Cloud). O cliente não possui acesso físico nem gerencia a camada do Hypervisor.',
      respostaTatica:
        'O provedor deve acionar migração automática de cargas (Live Migration), isolar os racks defeituosos e emitir SLA credit. Mitigação do lado do cliente: arquitetura Multi-AZ com Auto Scaling Group para resistir à queda de uma AZ inteira.'
    },
    {
      id: 4,
      codigo: 'INC-04',
      titulo: 'Chave de Acesso Administrativa (Access Key) Hardcoded em Repositório Público do GitHub',
      ambiente: 'DevSecOps & Gestão de Credenciais',
      cenario:
        'Um estagiário realizou commit de um arquivo "config.py" contendo AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY com permissão de AdministratorAccess. Em 4 minutos, bots automatizados detectaram as chaves e instanciaram 64 instâncias GPU para mineração de criptomoedas.',
      responsavelCorreto: 'Cliente',
      camada: 'Identidade, Credenciais e Ciclo de Vida de Código (DevSecOps)',
      causaRaiz:
        'Inobservância de boas práticas de DevSecOps e ausência de cofres de segredos. O provedor de nuvem forneceu autenticação segura, mas a custódia das credenciais e a higienização do código são de responsabilidade do cliente.',
      respostaTatica:
        'Revogar imediatamente a Access Key comprometida, auditar eventos no CloudTrail para eliminar instâncias invasoras, bloquear criação de chaves estáticas e migrar para Workload Identity Federation (WIF) ou IAM Roles com credenciais efêmeras.'
    },
    {
      id: 5,
      codigo: 'INC-05',
      titulo: 'Ataque de SQL Injection Extrai Banco de Dados de Aplicação Hospedada em PaaS',
      ambiente: 'Plataforma como Serviço (PaaS - App Service / Heroku)',
      cenario:
        'Uma aplicação Web Node.js executada sobre serviço gerenciado PaaS teve sua base PostgreSQL inteira extraída via SQL Injection no endpoint "/api/usuarios?busca=". A infraestrutura do servidor e o runtime estavam 100% atualizados pelo provedor.',
      responsavelCorreto: 'Cliente',
      camada: 'Código-Fonte da Aplicação e Sanitização de Entrada',
      causaRaiz:
        'Em modelos PaaS, o provedor cuida do Sistema Operacional, runtime e patches de middleware. No entanto, o código da aplicação e suas falhas lógicas (OWASP Top 10) continuam sob total responsabilidade do cliente.',
      respostaTatica:
        'Parametrizar todas as queries SQL (Prepared Statements / ORM), implementar Web Application Firewall (WAF) com regras gerenciadas contra SQLi na camada de borda e realizar testes SAST/DAST na esteira CI/CD.'
    },
    {
      id: 6,
      codigo: 'INC-06',
      titulo: 'Comprometimento de Caixa de Entrada e Golpe do Boleto em SaaS Corporativo',
      ambiente: 'Software como Serviço (SaaS - Microsoft 365 / Google Workspace)',
      cenario:
        'O diretor financeiro caiu em um golpe de Spear Phishing e digitou suas credenciais corporativas em um site falso. O invasor acessou seu e-mail SaaS sem bloqueio (MFA desativado) e alterou dados de cobrança de notas fiscais com clientes, desviando R$ 850.000.',
      responsavelCorreto: 'Cliente',
      camada: 'Governança de Identidade, Autenticação MFA e Políticas de Acesso',
      causaRaiz:
        'Em SaaS, o provedor garante a infraestrutura e a integridade do software, mas a administração dos usuários, ativação de MFA e conscientização contra phishing competem unicamente ao cliente.',
      respostaTatica:
        'Impor MFA obrigatório FIDO2/Passkey via Conditional Access, bloquear protocolos de autenticação legada (POP3/IMAP), encerrar todas as sessões ativas do usuário e ativar regras de auditoria para regras de encaminhamento externo de e-mail.'
    },
    {
      id: 7,
      codigo: 'INC-07',
      titulo: 'Tempestade Causa Inundação e Queda do Gerador Principal de 1 Data Center',
      ambiente: 'Segurança Física e Resiliência Ambiental do Provedor',
      cenario:
        'Chuvas históricas alagaram a subestação de energia e os geradores de um centro de dados físico em São Paulo. As máquinas virtuais de uma empresa de varejo hospedadas exclusivamente naquela AZ ficaram fora do ar durante o evento.',
      responsavelCorreto: 'Provedor de Nuvem (Falha Física) / Cliente (Falta de Multi-AZ)',
      camada: 'Instalações Físicas do Provedor & Arquitetura de Alta Disponibilidade',
      causaRaiz:
        'A infraestrutura física do centro de dados é dever do provedor. No entanto, arquiteturas resilientes em nuvem exigem que o cliente adote distribuição geográfica Multi-AZ para contingência automática de desastres.',
      respostaTatica:
        'Provedor: drenagem e redundância de fornecimento elétrico. Cliente: reconfigurar a aplicação em arquitetura ativa-ativa em pelo menos 2 Zonas de Disponibilidade (Multi-AZ) com balanceador de carga global (ALB/CloudFront).'
    }
  ];

  // 10 Solved Practical Microtasks from Prof. Rômulo
  const microtasksData = [
    {
      num: 1,
      titulo: 'Dimensionamento de Bloco CIDR e Reserva de IPs pelo Provedor de Nuvem',
      categoria: 'Subnetting & VPC',
      cenario:
        'Você precisa criar uma sub-rede para comportar 50 máquinas virtuais de processamento. Um analista júnior propôs o bloco CIDR 10.0.1.0/26.',
      pergunta:
        'Quantos endereços IP são teoricamente possíveis em um /26, quantos são realmente utilizáveis na AWS/Azure/GCP e a proposta atende aos 50 servidores?',
      solucao:
        'Em notação CIDR /26, temos 32 - 26 = 6 bits para hosts. Isso gera 2^6 = 64 endereços totais. Porém, os principais provedores de nuvem (como a AWS) reservam 5 endereços IP por sub-rede (o primeiro para Rede .0, o segundo para VPC Router .1, o terceiro para DNS .2, o quarto para uso futuro .3 e o último para Broadcast .63). Portanto, há 64 - 5 = 59 IPs utilizáveis. Sim, a proposta atende com folga de 9 IPs para crescimento.',
      codigoCli: `# AWS CLI: Criar Subnet com bloco /26
aws ec2 create-subnet \\
  --vpc-id vpc-0a1b2c3d4e5f \\
  --cidr-block 10.0.1.0/26 \\
  --availability-zone us-east-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=app-subnet-tier2}]'`,
      justificativa:
        'Sempre calcule 2^(32-prefixo) - 5 para subnets em provedores de nuvem. Nunca projete subnets /28 para mais de 11 instâncias (16 - 5 = 11).'
    },
    {
      num: 2,
      titulo: 'Isolamento de Banco de Dados com NAT Gateway vs Internet Gateway (IGW)',
      categoria: 'Roteamento & Isolamento',
      cenario:
        'Um banco de dados PostgreSQL rodando em EC2 precisa receber atualizações de pacotes do repositório oficial na Internet, mas NUNCA pode aceitar conexões iniciadas a partir da Internet.',
      pergunta:
        'Qual dispositivo de gateway e tabela de roteamento devem ser configurados para garantir este isolamento?',
      solucao:
        'A instância de banco deve residir em uma Sub-rede Privada (Private Subnet). A tabela de rotas associada a essa sub-rede deve apontar a rota padrão (0.0.0.0/0) para um NAT Gateway (localizado na Sub-rede Pública), e NÃO para um Internet Gateway (IGW). O NAT Gateway executa Source NAT (SNAT), permitindo que conexões originadas de dentro saiam para a internet para buscar updates, enquanto bloqueia 100% de conexões inbound iniciadas fora da VPC.',
      codigoCli: `# Criar rota privada direcionada ao NAT Gateway
aws ec2 create-route \\
  --route-table-id rtb-private-01 \\
  --destination-cidr-block 0.0.0.0/0 \\
  --nat-gateway-id nat-0123456789abcdef0`,
      justificativa:
        'A sub-rede pública possui rota para o IGW (Internet Gateway). A sub-rede privada possui rota apenas para o NAT Gateway ou VPC Endpoints. Instâncias de banco nunca devem ter Elastic IP ou IP público atribuído.'
    },
    {
      num: 3,
      titulo: 'Diferenciação Prática entre Stateful Security Group e Stateless NACL',
      categoria: 'Firewalls & Filtragem',
      cenario:
        'Você liberou a porta Inbound 443 (HTTPS) na NACL e no Security Group da instância Web. No entanto, clientes externos relatam erro de "Connection Timeout" ao tentar acessar o site.',
      pergunta:
        'Por que a conexão falhou se a porta de entrada está aberta, e qual regra está faltando?',
      solucao:
        'NACLs são STATELESS (sem estado). Isso significa que elas não rastreiam conexões: se você permite entrada na porta 443, precisa OBRIGATORIAMENTE criar uma regra OUTBOUND na NACL permitindo o tráfego de resposta nas portas efêmeras (TCP 1024-65535) de volta para o cliente. O Security Group, por ser STATEFUL (com estado), já libera o retorno automaticamente.',
      codigoCli: `# Criar regra de saída na NACL para portas efêmeras (Stateless Return)
aws ec2 create-network-acl-entry \\
  --network-acl-id acl-0987654321 \\
  --rule-number 110 \\
  --protocol tcp \\
  --rule-action allow \\
  --port-range From=1024,To=65535 \\
  --cidr-block 0.0.0.0/0`,
      justificativa:
        'Security Groups operam a nível de placa de rede virtual (ENI) e são stateful. NACLs operam a nível de subnet, são avaliadas em ordem numérica crescente (100, 110, 120...) e exigem regras bidirecionais explícitas.'
    },
    {
      num: 4,
      titulo: 'Mitigação de Ataque DDoS Volumétrico e Proteção de Borda',
      categoria: 'Edge & DDoS',
      cenario:
        'A aplicação corporativa está sofrendo um ataque de negação de serviço volumétrico (SYN Flood e UDP Amplification) atingindo 40 Gbps, saturando a banda do link da VPC.',
      pergunta:
        'Quais camadas de defesa devem ser acionadas antes que os pacotes atinjam a VPC corporativa?',
      solucao:
        'Deve-se adotar o padrão de defesa em profundidade na borda (Edge): 1. Implementar uma CDN global (AWS CloudFront / Cloudflare) para absorver o tráfego nos Pontos de Presença (Edge Locations); 2. Ativar proteção gerenciada anti-DDoS (AWS Shield Advanced / Google Cloud Armor) para descarte automático de pacotes maliciosos na infraestrutura do provedor; 3. Configurar WAF com Rate Limiting (ex: bloquear IPs que excedam 2.000 requisições por período de 5 minutos).',
      codigoCli: `# Exemplo de regra WAF Rate-Based via AWS CLI
aws wafv2 create-rule-group \\
  --name "RateLimit-DDoS-Mitigation" \\
  --scope REGIONAL \\
  --capacity 100 \\
  --rules '[{"Name":"Limit2000Req","Priority":1,"Action":{"Block":{}},"Statement":{"RateBasedStatement":{"Limit":2000,"AggregateKeyType":"IP"}}}]'`,
      justificativa:
        'Combater DDoS dentro da VPC gasta capacidade computacional e banda cara (NAT Gateway / Data Transfer). A absorção de ataques volumétricos deve ocorrer antes que os pacotes cheguem à rede privada.'
    },
    {
      num: 5,
      titulo: 'Isolamento de Banco Relacional por Security Group Referenciado (Zero Trust)',
      categoria: 'Segmentação & IAM',
      cenario:
        'Um desenvolvedor liberou a porta 5432 (PostgreSQL) no Security Group do banco com origem no CIDR "10.0.0.0/16". O CISO reprovou a configuração.',
      pergunta:
        'Qual o risco dessa regra baseada em CIDR e como reescrevê-la seguindo o princípio de menor privilégio?',
      solucao:
        'Permitir todo o bloco CIDR 10.0.0.0/16 permite que QUALQUER recurso da VPC (como servidores de teste, instâncias de visitantes ou máquinas comprometidas na subnet pública) se comunique com a porta do banco. A prática correta é o "Security Group Referencing": configurar o SG do banco de dados para aceitar tráfego na porta 5432 tendo como ORIGEM EXCLUSIVA o ID do Security Group da camada de aplicação (ex: sg-app-tier). Dessa forma, apenas instâncias que possuem o crachá/identidade de app podem se conectar, independentemente de seus IPs.',
      codigoCli: `# Regra de SG apontando para o SG de Aplicação como fonte
aws ec2 authorize-security-group-ingress \\
  --group-id sg-database-rds-12345 \\
  --protocol tcp \\
  --port 5432 \\
  --source-group sg-app-cluster-67890`,
      justificativa:
        'Security Group Referencing desacopla a segurança de endereços IP fixos. Quando novas instâncias de app sobem no Auto Scaling Group, elas automaticamente ganham acesso ao banco sem necessidade de alterar regras de firewall.'
    },
    {
      num: 6,
      titulo: 'Acesso Administrativo Seguro sem Bastion Host Exposto à Internet',
      categoria: 'Hardening de Acesso',
      cenario:
        'A equipe de infraestrutura mantém um servidor Bastion (Jumpbox) na sub-rede pública com a porta TCP 22 (SSH) aberta para 0.0.0.0/0 para permitir administração remota.',
      pergunta:
        'Quais são os riscos dessa abordagem e qual a alternativa moderna sem portas abertas?',
      solucao:
        'Portas 22 ou 3389 (RDP) expostas à internet sofrem milhares de ataques de força bruta, varreduras automatizadas e exploração de dia zero no OpenSSH/RDP. A alternativa moderna recomendada é o AWS Systems Manager Session Manager ou Azure Bastion gerenciado via navegador. O Session Manager utiliza um agente seguro (SSM Agent) instalado na instância que se comunica via chamadas HTTPS de saída (porta 443) autenticadas por IAM, sem necessidade de IPs públicos, sem abrir portas de entrada e com auditoria completa de comandos digitados gravada no CloudWatch/S3.',
      codigoCli: `# Conectar à instância privada sem SSH aberto via AWS SSM
aws ssm start-session \\
  --target i-0123456789abcdef0`,
      justificativa:
        'Elimine chaves SSH estáticas (.pem) e portas abertas para a Internet. O acesso via SSM impõe MFA, autenticação corporativa federada e auditoria forense por padrão.'
    },
    {
      num: 7,
      titulo: 'Detecção de Port Scanning e Reconhecimento via VPC Flow Logs',
      categoria: 'SOC & Detecção de Ameaças',
      cenario:
        'O time de SOC recebeu alerta de comportamento anômalo em uma instância EC2. Ao inspecionar os VPC Flow Logs, encontrou-se múltiplos registros REJECT sequenciais.',
      pergunta:
        'Como identificar um ataque de varredura (Port Scan) analisando as colunas dos VPC Flow Logs?',
      solucao:
        'Um port scan se manifesta nos Flow Logs por múltiplos registros com o mesmo endereço IP de origem (srcaddr), mesmo destino (dstaddr), portas de destino sequenciais (ex: 21, 22, 23, 25, 80, 443, 3389...) em curtíssimo intervalo de tempo e status final "REJECT" (bloqueado pelo Security Group ou NACL).',
      codigoCli: `# Consulta CloudWatch Logs Insights para detectar Port Scanning
fields @timestamp, srcAddr, dstAddr, dstPort, action
| filter action = "REJECT"
| stats count_distinct(dstPort) as portas_escaneadas by srcAddr, bin(5m)
| filter portas_escaneadas > 20
| sort portas_escaneadas desc`,
      justificativa:
        'Os VPC Flow Logs são essenciais para telemetria forense no SOC. Eles registram tráfego aceito e rejeitado sem degradar a performance das instâncias.'
    },
    {
      num: 8,
      titulo: 'Filtragem Egress (Saída) contra Servidores C2 e Exfiltração de Dados',
      categoria: 'Defesa em Profundidade',
      cenario:
        'A maioria dos times de TI foca em firewall de entrada (Ingress), permitindo qualquer tráfego de saída (Egress 0.0.0.0/0 All Traffic).',
      pergunta:
        'Por que permitir saída irrestrita é uma falha crítica e como blindar o perímetro de saída?',
      solucao:
        'Quando um invasor obtém execução remota de código (RCE) em um servidor interno, ele precisa estabelecer um canal de comunicação de retorno (Reverse Shell) com o seu servidor de Comando e Controle (C2) ou exfiltrar dados para a internet. Permitir saída total facilita que o malware utilize portas como 4444, 8080 ou 53 para exfiltração. Deve-se restringir o Egress apenas aos destinos necessários (ex: IPs dos serviços parceiros ou via DNS Firewall / Proxy Squid com inspeção de URL).',
      codigoCli: `# Regra de SG de saída permitindo apenas HTTPS para repositórios autorizados
aws ec2 authorize-security-group-egress \\
  --group-id sg-isolated-workload \\
  --protocol tcp \\
  --port 443 \\
  --cidr 198.51.100.0/24`,
      justificativa:
        'Filtragem rigorosa de tráfego de saída (Egress Filtering) dificulta a vida de ransomwares e impede a exfiltração silenciosa de bancos de dados.'
    },
    {
      num: 9,
      titulo: 'Migração de VPN de Perímetro Tradicional para Zero Trust Network Access (ZTNA)',
      categoria: 'Zero Trust & Arquitetura',
      cenario:
        'Uma empresa farmacêutica utiliza VPN IPsec tradicional. Quando um consultor terceirizado se conecta, seu notebook ganha visibilidade completa de toda a sub-rede corporativa.',
      pergunta:
        'Quais os vetores de risco dessa VPN de castelo e fosso e como o ZTNA resolve esse problema?',
      solucao:
        'A VPN tradicional confere confiança implícita baseada na localização da rede: uma vez dentro do túnel, o usuário tem acesso irrestrito a todos os hosts da subnet, permitindo movimento lateral em caso de infecção por malware no endpoint. O ZTNA (Zero Trust Network Access) opera sob o lema "Nunca Confie, Sempre Verifique": o usuário conecta-se a um proxy de aplicação individual (não à rede inteira), com validação contínua de postura do dispositivo (antivírus atualizado, disco criptografado, certificado) e autenticação forte por contexto.',
      codigoCli: `# Verificação de contexto em política de acesso condicional
{
  "Version": "2026-10-19",
  "Statement": [{
    "Effect": "Allow",
    "Action": "workload:Access",
    "Condition": {
      "Bool": {"device:IsCompliant": "true"},
      "IpAddress": {"aws:SourceIp": "corporate-egress-range"}
    }
  }]
}`,
      justificativa:
        'ZTNA substitui o perímetro de rede amplo por microperímetros ao redor de cada aplicação específica, eliminando o risco de movimento lateral.'
    },
    {
      num: 10,
      titulo: 'Auditoria Automatizada de Conformidade com CIS Cloud Benchmarks',
      categoria: 'Conformidade & Governança',
      cenario:
        'Para atender a certificação ISO 27001 e CIS AWS Foundations Benchmark, é proibido manter Security Groups com portas 22 (SSH) ou 3389 (RDP) abertas para 0.0.0.0/0.',
      pergunta:
        'Como automatizar a detecção contínua e a remediação automática dessa inconformidade?',
      solucao:
        'Deve-se habilitar serviços de conformidade contínua como AWS Config ou Azure Policy ativando a regra gerenciada "restricted-ssh" e "restricted-common-ports". Quando qualquer usuário cria uma regra vulnerável, o AWS Config dispara um alerta imediato no EventBridge acionando uma função Lambda ou SSM Automation Runbook para remover a regra automaticamente em menos de 10 segundos.',
      codigoCli: `# Ativar regra do AWS Config para auditoria contínua de portas SSH
aws configservice put-config-rule \\
  --config-rule '{
    "ConfigRuleName": "restricted-ssh",
    "Description": "Verifica se Security Groups bloqueiam porta 22 para 0.0.0.0/0",
    "Source": {
      "Owner": "AWS",
      "SourceIdentifier": "INCOMING_SSH_DISABLED"
    }
  }'`,
      justificativa:
        'Auditorias manuais são ineficazes em ambientes dinâmicos de nuvem. A conformidade deve ser contínua e baseada em infraestrutura como código com remediação automatizada.'
    }
  ];

  const filteredTasks = microtasksData.filter((t) => {
    if (taskCategoryFilter === 'Todas') return true;
    return t.categoria === taskCategoryFilter;
  });

  const activeTask = microtasksData.find((t) => t.num === activeTaskNum) || microtasksData[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Module 7 Header Card with Official Professor Attribution */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden backdrop-blur-xl transition-all ${
          isLightMode
            ? 'bg-gradient-to-br from-sky-50/70 via-white to-blue-50/50 border-sky-200/80 shadow-[0_4px_30px_-4px_rgba(14,165,233,0.12)] text-slate-900'
            : 'bg-gradient-to-br from-[#06101e] via-[#09172e] to-[#0c1f3d] border-sky-500/25 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.85)] text-white'
        }`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/30">
                MÓDULO 07
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sky-700 dark:text-sky-300 font-semibold">
                7 Novos Materiais Didáticos (Docs #26 a #32)
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 10 Microtarefas Práticas Resolvidas
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Computação em Nuvem, Responsabilidade Compartilhada &amp; Redes de Perímetro
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Domine a taxonomia <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>IaaS, PaaS e SaaS</strong> segundo o <strong className={isLightMode ? 'text-slate-900' : 'text-sky-300'}>NIST SP 800-145</strong>, a fronteira de custódia na matriz de <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Responsabilidade Compartilhada</strong>, a resolução de 7 incidentes reais e a engenharia de redes virtuais com <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Stateful Security Groups vs Stateless NACLs</strong>, arquitetura em 3 camadas e conformidade CIS.
            </p>

            {/* Author Attribution Card */}
            <div
              className={`p-3 rounded-2xl border text-xs flex flex-wrap items-center justify-between gap-3 ${
                isLightMode
                  ? 'bg-white/80 border-slate-200 text-slate-700'
                  : 'bg-slate-900/60 border-sky-500/20 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center font-bold text-sky-600 dark:text-sky-300 text-xs shrink-0">
                  RP
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] block uppercase">Autoria dos Materiais Didáticos:</span>
                  <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Prof. Rômulo Pereira de Almeida</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Desenvolvido por:</span>
                <span className={`font-semibold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>José Matheus dos Santos Neto</span>
              </div>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setSubTab('microtarefas')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Ver 10 Microtarefas Resolvidas</span>
            </button>
            <button
              onClick={() => setSubTab('perimetro')}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                isLightMode
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-sky-500/30 text-sky-200'
              }`}
            >
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Simulador SG vs NACL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setSubTab('fundamentos')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition cursor-pointer ${
            subTab === 'fundamentos'
              ? isLightMode
                ? 'bg-sky-100 text-sky-900 font-bold border border-sky-300'
                : 'bg-sky-950/60 text-sky-300 font-bold border border-sky-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Cloud className="w-4 h-4 text-sky-500" />
          <span>1. Fundamentos Cloud &amp; Modelos (NIST 800-145)</span>
        </button>

        <button
          onClick={() => setSubTab('responsabilidade')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition cursor-pointer ${
            subTab === 'responsabilidade'
              ? isLightMode
                ? 'bg-sky-100 text-sky-900 font-bold border border-sky-300'
                : 'bg-sky-950/60 text-sky-300 font-bold border border-sky-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-sky-500" />
          <span>2. Responsabilidade Compartilhada &amp; 7 Incidentes</span>
        </button>

        <button
          onClick={() => setSubTab('perimetro')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition cursor-pointer ${
            subTab === 'perimetro'
              ? isLightMode
                ? 'bg-sky-100 text-sky-900 font-bold border border-sky-300'
                : 'bg-sky-950/60 text-sky-300 font-bold border border-sky-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Network className="w-4 h-4 text-sky-500" />
          <span>3. Redes, Perímetro &amp; Simulador SG vs NACL</span>
        </button>

        <button
          onClick={() => setSubTab('microtarefas')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition cursor-pointer ${
            subTab === 'microtarefas'
              ? isLightMode
                ? 'bg-sky-100 text-sky-900 font-bold border border-sky-300'
                : 'bg-sky-950/60 text-sky-300 font-bold border border-sky-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>4. Caderno de 10 Microtarefas Práticas</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: FUNDAMENTOS CLOUD, IAAS, PAAS, SAAS & NIST SP 800-145 */}
      {/* ========================================================================= */}
      {subTab === 'fundamentos' && (
        <div className="space-y-6">
          {/* As 5 Características Essenciais do NIST */}
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Definição Canônica NIST SP 800-145
                </span>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  As 5 Características Essenciais da Computação em Nuvem
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/30">
                Padrão Federal de Referência
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs mb-2">
                  01
                </div>
                <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  On-Demand Self-Service
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Provisionamento unilateral de capacidade computacional (servidores, storage) sem intervenção humana do provedor.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-500 flex items-center justify-center font-bold text-xs mb-2">
                  02
                </div>
                <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Broad Network Access
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Recursos acessíveis via mecanismos padronizados pela rede (Internet/VPN) a partir de múltiplos dispositivos (smartphones, PCs).
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-xs mb-2">
                  03
                </div>
                <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Resource Pooling
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Agrupamento de recursos físicos do provedor para atender múltiplos clientes (Multi-tenant) com alocação dinâmica.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-xs mb-2">
                  04
                </div>
                <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Rapid Elasticity
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Capacidade de escalar recursos horizontalmente e verticalmente de forma elástica e quase instantânea conforme a demanda.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold text-xs mb-2">
                  05
                </div>
                <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Measured Service
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Sistemas de medição e telemetria transparente de consumo (Pay-as-you-go) garantindo faturamento preciso para cliente e provedor.
                </p>
              </div>
            </div>
          </div>

          {/* Modelos de Serviço Interativos: IaaS vs PaaS vs SaaS */}
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Comparador Arquitetural de Modelos
                </span>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  O que você gerencia vs O que o provedor gerencia
                </h3>
              </div>

              {/* Model Switch Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedServiceModel('iaas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedServiceModel === 'iaas'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  IaaS (Infraestrutura)
                </button>
                <button
                  onClick={() => setSelectedServiceModel('paas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedServiceModel === 'paas'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  PaaS (Plataforma)
                </button>
                <button
                  onClick={() => setSelectedServiceModel('saas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedServiceModel === 'saas'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  SaaS (Software)
                </button>
              </div>
            </div>

            {/* Model Card Details */}
            {selectedServiceModel === 'iaas' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-blue-50/60 border-blue-200' : 'bg-blue-950/20 border-blue-500/30'}`}>
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">
                      IaaS — Infrastructure as a Service (Ex: AWS EC2, Google Compute Engine, Azure VMs)
                    </h4>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    O provedor entrega hardware físico, energia, climatização e o hypervisor. Você recebe uma máquina virtual vazia e é responsável por instalar/manter o Sistema Operacional convidado (Windows/Linux), patches de segurança, antivírus, runtime, código e configuração da VPC.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Vantagens Principais
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Controle total do kernel e do sistema operacional.</li>
                      <li>Ideal para aplicações legadas que exigem portas específicas ou drivers personalizados.</li>
                      <li>Flexibilidade máxima de dimensionamento de CPU, memória e discos NVMe.</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/30'}`}>
                    <h5 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Riscos &amp; Carga Operacional
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Maior sobrecarga de administração (Patch Management manual ou via agente).</li>
                      <li>Se a VM for atacada por ransomware por falta de atualização, a culpa é 100% sua.</li>
                      <li>Você precisa configurar backups, rotas de saída e isolamento de portas manualmente.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedServiceModel === 'paas' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      PaaS — Platform as a Service (Ex: AWS Elastic Beanstalk, Google App Engine, Azure App Services, Heroku)
                    </h4>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    O provedor gerencia a infraestrutura, o hypervisor, o Sistema Operacional e o ambiente de execução (Node.js, Python, Java, Docker). O cliente foca exclusivamente no desenvolvimento do código-fonte da aplicação e nos dados.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Vantagens Principais
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Zero esforço com patches de kernel e vulnerabilidades de SO.</li>
                      <li>Auto-scaling e balanceamento de carga nativos e automáticos.</li>
                      <li>Deploy contínuo direto do Git (git push heroku main / esteiras CI/CD).</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/30'}`}>
                    <h5 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Riscos &amp; Limitações
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Menor controle sobre parâmetros profundos de rede e sistema operacional.</li>
                      <li>Risco de Vendor Lock-in caso se utilize APIs proprietárias da plataforma.</li>
                      <li>Vulnerabilidades no código da aplicação (OWASP Top 10) continuam sendo seu problema.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedServiceModel === 'saas' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-purple-50/60 border-purple-200' : 'bg-purple-950/20 border-purple-500/30'}`}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400">
                      SaaS — Software as a Service (Ex: Microsoft 365, Google Workspace, Salesforce, Slack)
                    </h4>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    O provedor entrega a aplicação completa pronta para uso pelo navegador ou app. O cliente é responsável unicamente pela gestão de identidade (usuários, senhas, MFA obrigatório), controle de permissões e classificação/proteção dos dados inseridos.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Vantagens Principais
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Nenhuma manutenção de infraestrutura, código ou banco de dados.</li>
                      <li>Acesso imediato de qualquer lugar do mundo com alta disponibilidade.</li>
                      <li>Previsibilidade de custos baseada em licenças por usuário ativo.</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/30'}`}>
                    <h5 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Riscos &amp; Responsabilidades
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                      <li>Se um colaborador cair em phishing e não houver MFA, os dados da empresa vazam.</li>
                      <li>Risco de Shadow IT e compartilhamento indevido de links públicos de arquivos.</li>
                      <li>Necessidade de auditoria contínua de permissões concedidas a apps de terceiros via OAuth.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Virtualização vs Contêineres & FinOps */}
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-3xl border ${
                isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-sky-500" />
                <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Virtualização (Hypervisors) vs Contêineres
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Entenda a distinção técnica entre emulação de hardware completa e isolamento a nível de kernel:
              </p>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <strong className="text-sky-600 dark:text-sky-400 block font-mono text-[11px]">
                    Hypervisor Tipo 1 (Bare-Metal)
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    Roda diretamente sobre o hardware físico (ex: VMware ESXi, KVM, AWS Nitro). Máxima eficiência e menor latência. Base da infraestrutura de nuvem moderna.
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <strong className="text-blue-600 dark:text-blue-400 block font-mono text-[11px]">
                    Hypervisor Tipo 2 (Hosted)
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    Roda sobre um sistema operacional convencional (ex: VirtualBox, VMware Workstation). Utilizado para laboratórios locais de estudo.
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                  <strong className="text-emerald-600 dark:text-emerald-400 block font-mono text-[11px]">
                    Contêineres (Docker / Kubernetes)
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    Compartilham o kernel do sistema operacional hospedeiro utilizando Linux cgroups e namespaces. Inicialização em milissegundos e consumo fracionário de memória.
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-3xl border ${
                isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  FinOps &amp; Gestão Financeira de Nuvem
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                A transição de Capex para Opex exige governança ativa para evitar surpresas na fatura:
              </p>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <strong className="text-amber-600 dark:text-amber-400 block font-mono text-[11px]">
                    Capex (Capital Expenditure) vs Opex (Operational Expenditure)
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    No On-Premises, a empresa compra servidores caros a cada 4 anos (Capex). Na Nuvem, o custo é operacional e variável baseado no consumo efetivo (Opex).
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <strong className="text-sky-600 dark:text-sky-400 block font-mono text-[11px]">
                    Modelos de Compra: On-Demand, Reservadas e Spot
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    On-Demand (máxima flexibilidade sem compromisso); Instâncias Reservadas / Savings Plans (descontos de até 72% para compromisso de 1 a 3 anos); Instâncias Spot (até 90% de desconto para tarefas que toleram interrupção).
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-purple-50/70 border-purple-200' : 'bg-purple-950/20 border-purple-500/30'}`}>
                  <strong className="text-purple-600 dark:text-purple-400 block font-mono text-[11px]">
                    Governança por Tagging &amp; Alertas de Orçamento
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 mt-1 block">
                    Obrigatoriedade de tags (ex: CentroDeCusto, Ambiente=Prod, Dono) e configuração de orçamentos (AWS Budgets) com parada automática de instâncias não produtivas após as 19h.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: RESPONSABILIDADE COMPARTILHADA & 7 CASOS DE INCIDENTES REAIS */}
      {/* ========================================================================= */}
      {subTab === 'responsabilidade' && (
        <div className="space-y-6">
          {/* Shared Responsibility Matrix Table (9 Layers) */}
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Matriz Operacional de 9 Camadas
                </span>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Fronteira de Custódia: On-Premises vs IaaS vs PaaS vs SaaS
                </h3>
              </div>

              {/* Selector to highlight column */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSharedMatrixModel('onprem')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    sharedMatrixModel === 'onprem' ? 'bg-slate-800 text-white shadow' : 'text-slate-500'
                  }`}
                >
                  On-Premises
                </button>
                <button
                  onClick={() => setSharedMatrixModel('iaas')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    sharedMatrixModel === 'iaas' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'
                  }`}
                >
                  IaaS
                </button>
                <button
                  onClick={() => setSharedMatrixModel('paas')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    sharedMatrixModel === 'paas' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'
                  }`}
                >
                  PaaS
                </button>
                <button
                  onClick={() => setSharedMatrixModel('saas')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    sharedMatrixModel === 'saas' ? 'bg-purple-600 text-white shadow' : 'text-slate-500'
                  }`}
                >
                  SaaS
                </button>
              </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className={`border-b ${isLightMode ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-850'}`}>
                    <th className="py-3 px-4 font-bold text-slate-500 uppercase font-mono text-[10px]">Camada Técnica</th>
                    <th className={`py-3 px-4 font-bold ${sharedMatrixModel === 'onprem' ? 'text-blue-500 font-extrabold' : 'text-slate-500'}`}>
                      On-Premises
                    </th>
                    <th className={`py-3 px-4 font-bold ${sharedMatrixModel === 'iaas' ? 'text-blue-500 font-extrabold' : 'text-slate-500'}`}>
                      IaaS
                    </th>
                    <th className={`py-3 px-4 font-bold ${sharedMatrixModel === 'paas' ? 'text-emerald-500 font-extrabold' : 'text-slate-500'}`}>
                      PaaS
                    </th>
                    <th className={`py-3 px-4 font-bold ${sharedMatrixModel === 'saas' ? 'text-purple-500 font-extrabold' : 'text-slate-500'}`}>
                      SaaS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  {sharedLayers.map((layer) => {
                    return (
                      <tr
                        key={layer.id}
                        className={`transition ${
                          isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-850/60'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{layer.nome}</div>
                          <div className={`text-[11px] mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{layer.desc}</div>
                        </td>
                        <td className={`py-3 px-4 font-mono text-[11px] ${sharedMatrixModel === 'onprem' ? 'bg-blue-500/10 font-bold' : ''}`}>
                          <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-400 font-semibold">
                            {layer.onprem}
                          </span>
                        </td>
                        <td className={`py-3 px-4 font-mono text-[11px] ${sharedMatrixModel === 'iaas' ? 'bg-blue-500/10 font-bold' : ''}`}>
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              layer.iaas.includes('Cliente')
                                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
                                : 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
                            }`}
                          >
                            {layer.iaas}
                          </span>
                        </td>
                        <td className={`py-3 px-4 font-mono text-[11px] ${sharedMatrixModel === 'paas' ? 'bg-emerald-500/10 font-bold' : ''}`}>
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              layer.paas.includes('Cliente')
                                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
                                : layer.paas.includes('Compartilhado')
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                                : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                            }`}
                          >
                            {layer.paas}
                          </span>
                        </td>
                        <td className={`py-3 px-4 font-mono text-[11px] ${sharedMatrixModel === 'saas' ? 'bg-purple-500/10 font-bold' : ''}`}>
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              layer.saas.includes('Cliente')
                                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
                                : 'bg-purple-500/15 text-purple-700 dark:text-purple-400'
                            }`}
                          >
                            {layer.saas}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className={`mt-4 p-3 rounded-2xl border flex items-center gap-2.5 text-xs ${
              isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-850 border-slate-800 text-slate-300'
            }`}>
              <Info className="w-4 h-4 text-sky-500 shrink-0" />
              <span>
                <strong>Regra de Ouro da Nuvem:</strong> O Provedor é responsável pela segurança <em>DA</em> nuvem (Security OF the Cloud). O Cliente é SEMPRE responsável pela segurança <em>NA</em> nuvem (Security IN the Cloud — dados, identidades e controle de acesso).
              </span>
            </div>
          </div>

          {/* Interactive 7 Real Incidents Resolver */}
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Simulador de Julgamento de Custódia
                </span>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  7 Estudos de Casos Reais: De Quem é a Culpa?
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Selecione o incidente e descubra o diagnóstico técnico oficial
              </span>
            </div>

            {/* Incidents Quick Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
              {incidentCases.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => {
                    setActiveIncidentId(inc.id);
                    setIncidentUserChoice(null);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    activeIncidentId === inc.id
                      ? isLightMode
                        ? 'bg-sky-100 border-sky-400 text-sky-900 font-bold'
                        : 'bg-sky-950/60 border-sky-500 text-sky-200 font-bold shadow-[0_0_12px_rgba(14,165,233,0.2)]'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      : 'bg-slate-850 border-slate-800 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-mono font-extrabold">{inc.codigo}</span>
                  <span className="text-[10px] truncate max-w-full font-medium">{inc.ambiente.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Incident Detail Card */}
            {(() => {
              const currentInc = incidentCases.find((i) => i.id === activeIncidentId) || incidentCases[0];
              const isRevealed = Boolean(revealedIncidents[currentInc.id]);

              return (
                <div
                  className={`p-5 rounded-2xl border space-y-4 ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-sky-600 text-white font-mono font-bold text-xs">
                        {currentInc.codigo}
                      </span>
                      <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold">
                        {currentInc.ambiente}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Caso Didático Oficial (Prof. Rômulo)
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      {currentInc.titulo}
                    </h4>
                    <p className={`text-xs mt-2 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                      {currentInc.cenario}
                    </p>
                  </div>

                  {/* Interactive Challenge Buttons */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Pergunta do Avaliador CISO: Quem deve responder legal e tecnicamente por este incidente?
                    </span>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => {
                          setIncidentUserChoice('Cliente');
                          setRevealedIncidents((prev) => ({ ...prev, [currentInc.id]: true }));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-2 ${
                          incidentUserChoice === 'Cliente'
                            ? currentInc.responsavelCorreto.includes('Cliente')
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-rose-600 text-white border-rose-500'
                            : isLightMode
                            ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span>Empresa Cliente (Configuração / Gestão)</span>
                      </button>

                      <button
                        onClick={() => {
                          setIncidentUserChoice('Provedor de Nuvem');
                          setRevealedIncidents((prev) => ({ ...prev, [currentInc.id]: true }));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-2 ${
                          incidentUserChoice === 'Provedor de Nuvem'
                            ? currentInc.responsavelCorreto.includes('Provedor')
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-rose-600 text-white border-rose-500'
                            : isLightMode
                            ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span>Provedor de Nuvem (CSP - AWS / Azure / GCP)</span>
                      </button>

                      <button
                        onClick={() => setRevealedIncidents((prev) => ({ ...prev, [currentInc.id]: true }))}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-600/15 text-sky-600 dark:text-sky-400 hover:bg-sky-600/25 transition cursor-pointer"
                      >
                        {isRevealed ? 'Ver Resolução' : 'Revelar Análise Técnica'}
                      </button>
                    </div>
                  </div>

                  {/* Revealed Diagnosis */}
                  {isRevealed && (
                    <div
                      className={`mt-4 p-4 rounded-xl border space-y-2.5 animate-fadeIn ${
                        isLightMode ? 'bg-sky-50/70 border-sky-200' : 'bg-sky-950/20 border-sky-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-sky-700 dark:text-sky-300 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Responsável Oficial: <strong>{currentInc.responsavelCorreto}</strong>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Camada Afetada: {currentInc.camada}
                        </span>
                      </div>

                      <div className="text-xs space-y-2">
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-mono text-[11px]">
                            Causa-Raiz Técnica:
                          </strong>
                          <p className={`mt-0.5 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {currentInc.causaRaiz}
                          </p>
                        </div>

                        <div>
                          <strong className="text-emerald-700 dark:text-emerald-400 block font-mono text-[11px]">
                            Plano de Ação e Remediação Tática:
                          </strong>
                          <p className={`mt-0.5 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {currentInc.respostaTatica}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: REDES EM NUVEM, 3-TIER & SIMULADOR SG VS NACL */}
      {/* ========================================================================= */}
      {subTab === 'perimetro' && (
        <div className="space-y-6">
          {/* Arquitetura de Referência em 3 Camadas (3-Tier) */}
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Topologia de Defesa em Profundidade
                </span>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Arquitetura de Referência em 3 Camadas (3-Tier Cloud Network)
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/30">
                Segmentação RFC 1918
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-6 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Uma Virtual Private Cloud (VPC) corporativa deve sempre isolar camadas com níveis de exposição decrescentes:
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-xs">
              {/* Tier 1: Presentation */}
              <div
                className={`p-4 rounded-2xl border ${
                  isLightMode ? 'bg-blue-50/60 border-blue-200' : 'bg-blue-950/20 border-blue-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-mono text-[10px] font-bold">
                    TIER 1 · PÚBLICA
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">10.0.1.0/24</span>
                </div>
                <h4 className={`font-bold text-sm ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Camada de Apresentação (Web / Edge)
                </h4>
                <p className={`mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  Possui rota direta para o <strong>Internet Gateway (IGW)</strong>. Abriga Application Load Balancers (ALBs), proxies reversos, CloudFront CDN e WAF. Nenhuma instância com dados de negócio fica nesta camada.
                </p>
                <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800 text-[11px] font-mono text-blue-600 dark:text-blue-400">
                  Portas Abertas: TCP 80, 443 (HTTPS)
                </div>
              </div>

              {/* Tier 2: Application */}
              <div
                className={`p-4 rounded-2xl border ${
                  isLightMode ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[10px] font-bold">
                    TIER 2 · PRIVADA
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">10.0.2.0/24</span>
                </div>
                <h4 className={`font-bold text-sm ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Camada de Aplicação (App Servers)
                </h4>
                <p className={`mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  Sem IP público. Acessa a internet apenas para buscar pacotes e updates via <strong>NAT Gateway</strong>. Aceita tráfego EXCLUSIVAMENTE originado do Security Group do balanceador da Camada 1.
                </p>
                <div className="mt-3 pt-2 border-t border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Origem: sg-alb-presentation
                </div>
              </div>

              {/* Tier 3: Database */}
              <div
                className={`p-4 rounded-2xl border ${
                  isLightMode ? 'bg-purple-50/60 border-purple-200' : 'bg-purple-950/20 border-purple-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-purple-500 text-white font-mono text-[10px] font-bold">
                    TIER 3 · ISOLADA
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">10.0.3.0/24</span>
                </div>
                <h4 className={`font-bold text-sm ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Camada de Dados (Database / Storage)
                </h4>
                <p className={`mt-1.5 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  Sub-rede estritamente isolada sem NENHUMA rota para a Internet (nem mesmo NAT Gateway). O banco PostgreSQL/MySQL replica apenas entre Zonas de Disponibilidade (Multi-AZ) e aceita conexões apenas da Camada 2.
                </p>
                <div className="mt-3 pt-2 border-t border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-600 dark:text-purple-400">
                  Portas: TCP 5432 / 3306 (apenas sg-app)
                </div>
              </div>
            </div>
          </div>

          {/* SIMULADOR INTERATIVO: STATEFUL SECURITY GROUP VS STATELESS NACL */}
          <div
            className={`p-6 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/90 border-sky-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  <span>Laboratório Interativo de Pacotes em Tempo Real</span>
                </div>
                <h3 className={`text-lg sm:text-xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Simulador de Inspeção: Stateful Security Group vs Stateless NACL
                </h3>
                <p className={`text-xs mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Observe o ciclo completo do pacote de ida e de volta, entendendo por que a NACL exige portas efêmeras enquanto o SG é stateful.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runSgNaclSimulation}
                  disabled={simRunning}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{simRunning ? 'Disparando Pacote...' : 'Disparar Pacote TCP'}</span>
                </button>
                <button
                  onClick={resetSgNaclSim}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulation Controls Panel */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6 text-xs">
              {/* Port Selector */}
              <div className={`p-3.5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <label className="font-mono text-[11px] text-slate-400 block mb-1.5">Porta de Destino:</label>
                <select
                  value={simPacketPort}
                  onChange={(e) => setSimPacketPort(Number(e.target.value))}
                  disabled={simRunning}
                  className={`w-full p-2 rounded-lg border font-mono font-bold text-xs ${
                    isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <option value={443}>TCP 443 (HTTPS - Web Seguro)</option>
                  <option value={80}>TCP 80 (HTTP - Não Seguro)</option>
                  <option value={22}>TCP 22 (SSH - Administração)</option>
                  <option value={5432}>TCP 5432 (PostgreSQL DB)</option>
                </select>
              </div>

              {/* NACL Inbound Toggle */}
              <div className={`p-3.5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-400">NACL Inbound (Porta {simPacketPort}):</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${simNaclInboundAllow ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'}`}>
                    {simNaclInboundAllow ? 'ALLOW' : 'DENY'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimNaclInboundAllow(!simNaclInboundAllow)}
                  disabled={simRunning}
                  className={`w-full py-1.5 rounded-lg font-bold text-xs border transition cursor-pointer ${
                    simNaclInboundAllow ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-rose-600 text-white border-rose-500'
                  }`}
                >
                  {simNaclInboundAllow ? 'Regra 100: ALLOW' : 'Regra 100: DENY'}
                </button>
              </div>

              {/* SG Inbound Toggle */}
              <div className={`p-3.5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-400">SG Inbound (Porta {simPacketPort}):</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${simSgInboundAllow ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'}`}>
                    {simSgInboundAllow ? 'ALLOW' : 'BLOCKED'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimSgInboundAllow(!simSgInboundAllow)}
                  disabled={simRunning}
                  className={`w-full py-1.5 rounded-lg font-bold text-xs border transition cursor-pointer ${
                    simSgInboundAllow ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-rose-600 text-white border-rose-500'
                  }`}
                >
                  {simSgInboundAllow ? 'Regra SG: Permitida' : 'Regra SG: Ausente'}
                </button>
              </div>

              {/* NACL Outbound Ephemeral Toggle (The critical test!) */}
              <div className={`p-3.5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-400">NACL Outbound (1024-65535):</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${simNaclOutboundEphemeralAllow ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'}`}>
                    {simNaclOutboundEphemeralAllow ? 'ALLOW' : 'DENY'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimNaclOutboundEphemeralAllow(!simNaclOutboundEphemeralAllow)}
                  disabled={simRunning}
                  className={`w-full py-1.5 rounded-lg font-bold text-xs border transition cursor-pointer ${
                    simNaclOutboundEphemeralAllow ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-rose-600 text-white border-rose-500'
                  }`}
                >
                  {simNaclOutboundEphemeralAllow ? 'Portas Efêmeras: ALLOW' : 'Portas Efêmeras: DENY'}
                </button>
              </div>
            </div>

            {/* Visual Pipeline Flow */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Caminho Bidirecional do Pacote (Borda ➔ Sub-rede ➔ Instância ➔ Retorno)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs font-mono">
                {/* Step 1: Internet Client */}
                <div
                  className={`p-3 rounded-xl border text-center transition ${
                    simStep >= 1
                      ? 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold shadow'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">CLIENTE EXTERNO</div>
                  <div className="font-extrabold mt-1">203.0.113.50</div>
                  <div className="text-[10px] mt-0.5 text-slate-500">Porta Efêmera :51234</div>
                </div>

                {/* Step 2: NACL Inbound */}
                <div
                  className={`p-3 rounded-xl border text-center transition ${
                    simStep === 1 && simResult === 'blocked_nacl_in'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                      : simStep >= 2
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">1. NACL INBOUND</div>
                  <div className="font-extrabold mt-1">Subnet Border</div>
                  <div className="text-[10px] mt-0.5">
                    {simNaclInboundAllow ? 'ALLOW ➔ Passou' : 'DENY ➔ Bloqueado!'}
                  </div>
                </div>

                {/* Step 3: SG Inbound */}
                <div
                  className={`p-3 rounded-xl border text-center transition ${
                    simStep === 2 && simResult === 'blocked_sg_in'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                      : simStep >= 3
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">2. SG INBOUND</div>
                  <div className="font-extrabold mt-1">Placa ENI</div>
                  <div className="text-[10px] mt-0.5">
                    {simSgInboundAllow ? 'ALLOW ➔ Entrou' : 'DROPPED ➔ Timeout!'}
                  </div>
                </div>

                {/* Step 4: Instance & Stateful Return */}
                <div
                  className={`p-3 rounded-xl border text-center transition ${
                    simStep >= 3
                      ? 'bg-sky-500/20 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">3. INSTÂNCIA &amp; SG</div>
                  <div className="font-extrabold mt-1">Auto Return</div>
                  <div className="text-[10px] mt-0.5 text-emerald-600 font-bold">
                    Stateful (Retorno Livre)
                  </div>
                </div>

                {/* Step 5: NACL Outbound */}
                <div
                  className={`p-3 rounded-xl border text-center transition ${
                    simResult === 'blocked_nacl_out'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                      : simResult === 'success'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                      : isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">4. NACL OUTBOUND</div>
                  <div className="font-extrabold mt-1">Portas Efêmeras</div>
                  <div className="text-[10px] mt-0.5">
                    {simNaclOutboundEphemeralAllow ? 'ALLOW ➔ Sucesso!' : 'DENY ➔ Descarte!'}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Feedback Alert */}
            {simResult && (
              <div
                className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                  simResult === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {simResult === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Conexão Estabelecida com Sucesso (Handshake Completo!)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Conexão Falhou / Timeout!</span>
                    </>
                  )}
                </div>

                {simResult === 'success' && (
                  <p>
                    O pacote entrou pela NACL (porta {simPacketPort}), foi aceito pelo Security Group da ENI, a instância processou a requisição HTTP/S e o tráfego de retorno saiu automaticamente pelo Security Group (por ser <strong>Stateful</strong>) e foi autorizado pela regra Outbound da NACL (por ter portas efêmeras 1024-65535 liberadas para o IP do cliente).
                  </p>
                )}

                {simResult === 'blocked_nacl_in' && (
                  <p>
                    O pacote foi descartado logo no portão de entrada da sub-rede pela regra DENY da NACL Inbound. O tráfego sequer alcançou a placa de rede da instância.
                  </p>
                )}

                {simResult === 'blocked_sg_in' && (
                  <p>
                    A NACL permitiu a entrada, mas o Security Group da instância não possui regra autorizando a porta {simPacketPort}. O Security Group opera no modelo "Default Deny" (tudo que não for explicitamente permitido é silenciosamente descartado).
                  </p>
                )}

                {simResult === 'blocked_nacl_out' && (
                  <p>
                    <strong>Cenário Clássico de Erro em Nuvem:</strong> O pacote chegou na instância e a instância tentou responder. O Security Group liberou o retorno automaticamente (Stateful). Porém, a NACL da sub-rede é <strong>STATELESS</strong> e não possuía regra permitindo portas efêmeras de saída (1024-65535). O pacote de resposta foi descartado na fronteira da sub-rede e o cliente ficou esperando até o timeout!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: CADERNO DE 10 MICROTAREFAS PRÁTICAS RESOLVIDAS */}
      {/* ========================================================================= */}
      {subTab === 'microtarefas' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                  Caderno Técnico Prático (Prof. Rômulo Pereira de Almeida)
                </span>
                <h3 className={`text-lg sm:text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  10 Microtarefas de Segurança em Nuvem &amp; Perímetro (Resolvidas)
                </h3>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['Todas', 'Subnetting & VPC', 'Roteamento & Isolamento', 'Firewalls & Filtragem', 'Edge & DDoS', 'Segmentação & IAM', 'Hardening de Acesso', 'SOC & Detecção de Ameaças', 'Zero Trust & Arquitetura', 'Conformidade & Governança'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTaskCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                      taskCategoryFilter === cat
                        ? 'bg-emerald-600 text-white font-bold'
                        : isLightMode
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Microtasks Grid Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-6">
              {microtasksData.map((t) => (
                <button
                  key={t.num}
                  onClick={() => setActiveTaskNum(t.num)}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                    activeTaskNum === t.num
                      ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md shadow-emerald-600/20'
                      : isLightMode
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-mono">TASK</span>
                  <span className="text-sm font-extrabold">#{t.num}</span>
                </button>
              ))}
            </div>

            {/* Active Microtask Full View */}
            <div
              className={`p-6 rounded-2xl border space-y-5 ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'
              }`}
            >
              {/* Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-mono font-extrabold text-xs">
                    MICROTAREFA #{activeTask.num}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
                    {activeTask.categoria}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Caderno Oficial · Prof. Rômulo Pereira de Almeida
                </span>
              </div>

              {/* Title & Scenario */}
              <div>
                <h4 className={`text-base sm:text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {activeTask.titulo}
                </h4>

                <div className="mt-3 space-y-2 text-xs">
                  <div className={`p-3.5 rounded-xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <strong className="text-sky-600 dark:text-sky-400 font-mono text-[11px] block uppercase mb-1">
                      Cenário Corporativo Real:
                    </strong>
                    <p className={`leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                      {activeTask.cenario}
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${isLightMode ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/30'}`}>
                    <strong className="text-amber-700 dark:text-amber-400 font-mono text-[11px] block uppercase mb-1">
                      Desafio Técnico:
                    </strong>
                    <p className={`leading-relaxed ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                      {activeTask.pergunta}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] block uppercase mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Resolução Técnica Comentada:
                </strong>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                  {activeTask.solucao}
                </p>
              </div>

              {/* CLI Command Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-sky-500" />
                    Comando de Implementação (AWS CLI / Cloud Shell):
                  </span>
                  <button
                    onClick={() => handleCopy(`task-${activeTask.num}`, activeTask.codigoCli)}
                    className="text-[11px] text-sky-500 hover:text-sky-600 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === `task-${activeTask.num}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar CLI</span>
                      </>
                    )}
                  </button>
                </div>

                <pre
                  className={`p-3.5 rounded-xl border font-mono text-xs overflow-x-auto scrollbar-thin ${
                    isLightMode ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-slate-950 text-sky-300 border-slate-800'
                  }`}
                >
                  <code>{activeTask.codigoCli}</code>
                </pre>
              </div>

              {/* Architecture Justification */}
              <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white font-mono text-[11px] block">
                    Justificativa Arquitetural &amp; CIS Benchmarks:
                  </strong>
                  <p className="mt-0.5 leading-relaxed">{activeTask.justificativa}</p>
                </div>
              </div>

              {/* Navigation between tasks */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  disabled={activeTask.num <= 1}
                  onClick={() => setActiveTaskNum((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold disabled:opacity-30 cursor-pointer"
                >
                  ← Microtarefa Anterior
                </button>

                <span className="text-xs font-mono text-slate-400">
                  {activeTask.num} de {microtasksData.length}
                </span>

                <button
                  disabled={activeTask.num >= microtasksData.length}
                  onClick={() => setActiveTaskNum((prev) => Math.min(microtasksData.length, prev + 1))}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold disabled:opacity-30 cursor-pointer"
                >
                  Próxima Microtarefa →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DOWNLOADS SECTION: OS 7 DOCUMENTOS OFICIAIS DO MÓDULO 7 */}
      {/* ========================================================================= */}
      <div
        className={`p-6 rounded-3xl border backdrop-blur-xl ${
          isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold uppercase mb-1">
              <Download className="w-4 h-4" />
              <span>Arquivos Oficiais para Download</span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              7 PDFs do Módulo de Cloud &amp; Redes (Docs #26 a #32)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Material de autoria do <strong>Prof. Rômulo Pereira de Almeida</strong>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {mod7Docs.map((doc) => (
            <div
              key={doc.num}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                isLightMode ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200' : 'bg-slate-850 hover:bg-slate-800 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/30">
                    DOC #{doc.num}
                  </span>
                  <span className="text-slate-400 font-medium">{doc.paginas}</span>
                </div>
                <h4 className={`font-bold text-xs leading-snug line-clamp-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {doc.titulo}
                </h4>
                <p className={`text-[11px] mt-1.5 leading-relaxed line-clamp-2 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  {doc.resumo}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                {doc.pdfUrl && (
                  <>
                    <a
                      href={doc.pdfUrl}
                      download
                      className="flex-1 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar PDF</span>
                    </a>
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg border transition ${
                        isLightMode ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                      }`}
                      title="Abrir em Nova Aba"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

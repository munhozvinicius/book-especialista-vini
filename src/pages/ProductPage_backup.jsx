import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, PhoneCall, Mic, Globe, Wifi, Package, Laptop, Bot, HelpCircle, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProductData, defaultProductData } from '@/utils/dataStructure';
import { getPriceColorClass } from '@/utils/priceComparison';

const productIcons = {
  'vivo-sip': Phone,
  'vivo-0800': PhoneCall,
  'vivo-voz-negocios': Mic,
  'vivo-internet-fibra': Wifi,
  'vivo-internet-dedicada': Globe,
  'combo-vivo-sip-internet-dedicada': Package,
  'licencas-microsoft': Laptop,
  'ajuda-ai': Bot
};

const productNames = {
  'vivo-sip': 'Vivo SIP',
  'vivo-0800': 'Vivo 0800',
  'vivo-voz-negocios': 'Vivo Voz Negócios',
  'vivo-internet-fibra': 'Vivo Internet (Fibra)',
  'vivo-internet-dedicada': 'Vivo Internet Dedicada',
  'combo-vivo-sip-internet-dedicada': 'Combo Vivo SIP + Internet Dedicada',
  'licencas-microsoft': 'Licenças Microsoft',
  'ajuda-ai': 'Ajuda AI'
};

// Dados estruturados para as tabelas de preços
const productPricingData = {
  'vivo-sip': [
    { 'Canais': '10', 'Mensalidade': 'R$ 490,00', 'Promoção': 'R$ 450,00' },
    { 'Canais': '15', 'Mensalidade': 'R$ 675,00', 'Promoção': 'R$ 645,00' },
    { 'Canais': '30', 'Mensalidade': 'R$ 1.200,00', 'Promoção': '—' },
    { 'Canais': '60', 'Mensalidade': 'R$ 2.159,00', 'Promoção': '—' },
    { 'Canais': '90', 'Mensalidade': 'R$ 3.229,00', 'Promoção': '—' }
  ],
  'vivo-0800': {
    'flex': [
      { 'Valor Mínimo': 'R$ 150,00', 'Minutos Aproximados': '1.111 min', 'Minuto Excedente': 'R$ 0,09' },
      { 'Valor Mínimo': 'R$ 200,00', 'Minutos Aproximados': '2.500 min', 'Minuto Excedente': 'R$ 0,09' },
      { 'Valor Mínimo': 'R$ 250,00', 'Minutos Aproximados': '3.125 min', 'Minuto Excedente': 'R$ 0,08' },
      { 'Valor Mínimo': 'R$ 300,00', 'Minutos Aproximados': '4.285 min', 'Minuto Excedente': 'R$ 0,07' }
    ],
    'ilimitado': [
      { 'Chamadas Simultâneas': '4 chamadas', 'Valor Mensal': 'R$ 479,00' },
      { 'Chamadas Simultâneas': '6 chamadas', 'Valor Mensal': 'R$ 699,00' },
      { 'Chamadas Simultâneas': '10 chamadas', 'Valor Mensal': 'R$ 909,00' },
      { 'Chamadas Simultâneas': '15 chamadas', 'Valor Mensal': 'R$ 1.349,00' },
      { 'Chamadas Simultâneas': '30 chamadas', 'Valor Mensal': 'R$ 2.399,00' },
      { 'Chamadas Simultâneas': '60 chamadas', 'Valor Mensal': 'R$ 4.719,00' }
    ]
  },
  'vivo-voz-negocios': [
    { 'Quantidade': '1 a 4 Licenças', '24 meses': 'R$ 55,00/mês', '36 meses': 'R$ 50,00/mês' },
    { 'Quantidade': '5 a 8 Licenças', '24 meses': 'R$ 50,00/mês', '36 meses': 'R$ 45,00/mês' },
    { 'Quantidade': '9 a 20 Licenças', '24 meses': 'R$ 45,00/mês', '36 meses': 'R$ 40,00/mês' },
    { 'Quantidade': '21 a 30 Licenças', '24 meses': 'R$ 40,00/mês', '36 meses': 'R$ 35,00/mês' },
    { 'Quantidade': '31 Licenças ou mais', '24 meses': 'R$ 35,00/mês', '36 meses': 'R$ 30,00/mês' }
  ],
  'vivo-internet-fibra': [
    { 'Velocidade': '400 MEGA', 'Nacional IP': 'R$ 79,99' },
    { 'Velocidade': '500 MEGA', 'Nacional IP': 'R$ 89,99' },
    { 'Velocidade': '600 MEGA', 'Nacional IP': 'R$ 129,99' },
    { 'Velocidade': '700 MEGA', 'Nacional IP': 'R$ 99,99' },
    { 'Velocidade': '1 GIGA', 'Nacional IP': 'R$ 299,99' }
  ],
  'vivo-internet-dedicada': [
    { 'Velocidade': '50 MEGA', 'Mensalidade': 'R$ 500,00' },
    { 'Velocidade': '100 MEGA', 'Mensalidade': 'R$ 800,00' },
    { 'Velocidade': '200 MEGA', 'Mensalidade': 'R$ 1.000,00' },
    { 'Velocidade': '300 MEGA', 'Mensalidade': 'R$ 1.300,00' },
    { 'Velocidade': '400 MEGA', 'Mensalidade': 'R$ 1.500,00' },
    { 'Velocidade': '500 MEGA', 'Mensalidade': 'R$ 1.900,00' },
    { 'Velocidade': '700 MEGA', 'Mensalidade': 'R$ 2.200,00' }
  ],
  'combo-vivo-sip-internet-dedicada': [
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '30 Mbps', 'Mensalidade Dedicada': 'R$ 500,00', 'Total Mensal': 'R$ 820,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '100 Mbps', 'Mensalidade Dedicada': 'R$ 800,00', 'Total Mensal': 'R$ 1.120,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '200 Mbps', 'Mensalidade Dedicada': 'R$ 1.000,00', 'Total Mensal': 'R$ 1.320,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '300 Mbps', 'Mensalidade Dedicada': 'R$ 1.300,00', 'Total Mensal': 'R$ 1.620,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '400 Mbps', 'Mensalidade Dedicada': 'R$ 1.500,00', 'Total Mensal': 'R$ 1.820,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '500 Mbps', 'Mensalidade Dedicada': 'R$ 1.900,00', 'Total Mensal': 'R$ 2.220,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '700 Mbps', 'Mensalidade Dedicada': 'R$ 2.200,00', 'Total Mensal': 'R$ 2.520,00' },
    { 'Plano SIP': 'Vivo 10', 'Mensalidade SIP': 'R$ 320,00', 'Internet Dedicada': '900 Mbps', 'Mensalidade Dedicada': 'R$ 2.700,00', 'Total Mensal': 'R$ 3.020,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '30 Mbps', 'Mensalidade Dedicada': 'R$ 500,00', 'Total Mensal': 'R$ 920,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '50 Mbps', 'Mensalidade Dedicada': 'R$ 500,00', 'Total Mensal': 'R$ 920,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '100 Mbps', 'Mensalidade Dedicada': 'R$ 800,00', 'Total Mensal': 'R$ 1.220,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '200 Mbps', 'Mensalidade Dedicada': 'R$ 1.000,00', 'Total Mensal': 'R$ 1.420,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '300 Mbps', 'Mensalidade Dedicada': 'R$ 1.300,00', 'Total Mensal': 'R$ 1.720,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '400 Mbps', 'Mensalidade Dedicada': 'R$ 1.500,00', 'Total Mensal': 'R$ 1.920,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '500 Mbps', 'Mensalidade Dedicada': 'R$ 1.900,00', 'Total Mensal': 'R$ 2.320,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '700 Mbps', 'Mensalidade Dedicada': 'R$ 2.200,00', 'Total Mensal': 'R$ 2.620,00' },
    { 'Plano SIP': 'Vivo 15', 'Mensalidade SIP': 'R$ 420,00', 'Internet Dedicada': '900 Mbps', 'Mensalidade Dedicada': 'R$ 2.700,00', 'Total Mensal': 'R$ 3.120,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '30 Mbps', 'Mensalidade Dedicada': 'R$ 500,00', 'Total Mensal': 'R$ 1.290,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '50 Mbps', 'Mensalidade Dedicada': 'R$ 500,00', 'Total Mensal': 'R$ 1.290,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '100 Mbps', 'Mensalidade Dedicada': 'R$ 800,00', 'Total Mensal': 'R$ 1.590,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '200 Mbps', 'Mensalidade Dedicada': 'R$ 1.000,00', 'Total Mensal': 'R$ 1.790,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '300 Mbps', 'Mensalidade Dedicada': 'R$ 1.300,00', 'Total Mensal': 'R$ 2.090,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '400 Mbps', 'Mensalidade Dedicada': 'R$ 1.500,00', 'Total Mensal': 'R$ 2.290,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '500 Mbps', 'Mensalidade Dedicada': 'R$ 1.900,00', 'Total Mensal': 'R$ 2.690,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '700 Mbps', 'Mensalidade Dedicada': 'R$ 2.200,00', 'Total Mensal': 'R$ 2.990,00' },
    { 'Plano SIP': 'Vivo 30', 'Mensalidade SIP': 'R$ 790,00', 'Internet Dedicada': '900 Mbps', 'Mensalidade Dedicada': 'R$ 2.700,00', 'Total Mensal': 'R$ 3.490,00' }
  ]
};

// Conteúdo baseado nas imagens fornecidas
const productContent = {
  'vivo-sip': {
    description: 'SIP (Voz Avançada)',
    characteristics: `✅ Benefícios:
• 📞 Ilimitado Nacional para qualquer sinalização
• 💰 Sem surpresa na conta
• 🔧 Manutenção 24x7`,
    observations: `📝 Observações:
• ✅ Valores com impostos
• ✅ Tarifas internacionais: consulte no Simplifique
• ✅ Taxa de instalação: GRÁTIS
• ✅ Prazo contratual: 36 meses
• ✅ Não válido para Projeto Especial
• ✅ Não disponível para clientes call center ou com tráfego rajado
• ✅ Apenas 1 oferta por endereço
• ✅ Acesso ERB: liberado na opção de 10 a 150 canais
• ✅ Para ERB: necessário ter numeração disponível/homologada Anatel`
  },
  'vivo-0800': {
    description: '0800 – Rede Inteligente Vivo',
    characteristics: `O Vivo 0800 oferece um número único nacional para que os seus clientes tenham um canal de comunicação direto com o seu negócio — com fácil memorização e sem custo para quem gera a chamada.`,
    observations: `✅ Benefícios Inclusos:
• ✅ Portal de autoatendimento
• 📊 Relatórios online
• 🚫 Bloqueio por UF e por tipo de ligação
• 💬 Mensagem personalizada
• ⏰ Configuração de horário de atendimento`
  },
  'vivo-voz-negocios': {
    description: 'Vivo Voz Negócios',
    characteristics: `Linha fixa no celular, computador ou tablet via Softphone atrelado a um PABX na Nuvem com diversas funcionalidades que facilitam a colaboração do seu time.

🎯 Benefícios:
• 📞 Automatize seu atendimento: Encaminhe chamadas para menus com URA.
• 📱 Plataforma virtual: PABX 100% em nuvem via Softphone e App.
• 💰 Economize: Leve seu número para a nuvem e evite custos de PABX físico.
• 🔒 Segurança: Criptografia de ponta a ponta para proteger seus dados.
• 🌍 Ligações ilimitadas: Ligações para números externos sem custo adicional em todo o Brasil.`,
    observations: `📋 Recursos Adicionais:
• URA com 1 nível: R$ 40,00/mês
• URA multinível: R$ 50,00/mês
• Gravador de ligações: R$ 20,00/mês (por licença)`
  },
  'vivo-internet-fibra': {
    description: 'Internet Banda Larga (CNPJ)',
    characteristics: `Benefícios inclusos:
• Ubook (audiolivros e conteúdos)
• Skeelo (livros digitais)

Observações Técnicas e Comerciais:
• Wi-Fi 6 disponível apenas para SP e FSP e para velocidades a partir de 500 Mega.
• Obrigatório o uso das campanhas para input das Ofertas Vigentes.
• Ofertas válidas somente para CNPJ.
• Banda larga com IP dinâmico (IP fixo opcional).
• Contrato com vigência de 24 meses.
• Para velocidades de 600 Mega, 700 Mega e 1 Giga: apenas uma dessas pode ser comercializada por endereço (não é permitido contratar duas juntas).
• Não permitida comercialização para Provedores, Empreendimentos e Projetos Especiais.`,
    observations: `⚠️ Observações importantes sobre disponibilidade e limitações técnicas conforme região.`
  },
  'vivo-internet-dedicada': {
    description: 'Internet Dedicada',
    characteristics: `Com a internet dedicada da Vivo, sua empresa conta com conectividade de alto desempenho, com mesma velocidade para upload e download, baixa latência (tempo de resposta), e planos com soluções de gerenciamento, segurança e controle da transmissão dos seus dados.

🎯 Planos Disponíveis (36 meses)

🔧 Benefícios Técnicos:
• Garantia de banda: Tráfego simétrico, velocidade contratada garantida.
• Disponibilidade: SLA de 99,5% com suporte 24/7.
• Tempo de reparo: SLA de 4 horas.
• IP Fixo: Entregue com range de 8 IPs LAN (/29) com 6 IPs utilizáveis.`,
    observations: `⚠️ Fique Atento!
• Consulte viabilidade no SigSeum
• Não compatível com trade-in
• Contrato de 36 meses
• Válido somente para Altas
• Não válido para Provedor e Call Center
• 300 Mbps e 1200 Mbps disponíveis só em GPON, ERB e Fibra SWA SP`
  },
  'combo-vivo-sip-internet-dedicada': {
    description: 'Combo SIP + Internet Dedicada',
    characteristics: `✅ Garantia de banda
📞 Ilimitado Nacional para qualquer sinalização
⏰ SLA de 4 horas para reparo
🔧 Disponibilidade 24x7
🔧 Manutenção 24x7
🌐 Entregue com range de 8 IPs LAN (/29) com 6 IPs utilizáveis

⚠️ Fique Atento!
• Consulte viabilidade no SigSeum
• Não compatível com trade-in
• Contrato de 36 meses
• Válido somente para Altas
• Não válido para Provedor e Call Center
• 300 Mbps e 1200 Mbps disponíveis só em GPON, ERB e Fibra SWA SP`,
    observations: `📋 Observações importantes sobre viabilidade técnica e comercial.`
  },
  'licencas-microsoft': {
    description: 'Licenças Microsoft',
    characteristics: `Soluções Microsoft 365 para empresas de todos os tamanhos, com ferramentas de produtividade, colaboração e segurança.`,
    observations: `Entre em contato para mais informações sobre licenciamento Microsoft.`
  },
  'ajuda-ai': {
    description: 'Ajuda AI',
    characteristics: `Assistente inteligente para suporte e orientações sobre produtos e serviços Vivo.`,
    observations: `Acesse através do menu principal para obter ajuda personalizada.`
  }
};

export default function ProductPage({ productId }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Carregar dados da administração ou usar dados padrão
    const data = loadProductData(productId);
    setProductData(data);
  }, [productId]);

  const Icon = productIcons[productId] || HelpCircle;
  const productName = productNames[productId] || 'Produto não encontrado';

  if (!productData) return <div>Carregando...</div>;

  const renderPriceTable = () => {
    if (!productData.pricingTable) return null;

    if (productId === 'vivo-0800' && typeof productData.pricingTable === 'object' && !Array.isArray(productData.pricingTable)) {
      // Renderização especial para Vivo 0800 com duas modalidades
      return (
        <div className="space-y-8">
          {/* Planos FLEX */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              📊 Planos 0800 FLEX
            </h3>
            <div className="overflow-x-auto shadow-modern rounded-xl border border-muted/30">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    {Object.keys(productData.pricingTable.flex[0] || {}).map(header => (
                      <th key={header} className="p-4 text-left font-semibold text-lg">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productData.pricingTable.flex.map((row, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'} hover:bg-purple-50 transition-colors`}>
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="p-4 text-base font-medium text-foreground border-b border-muted/20">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Planos ILIMITADO */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              🔓 Planos 0800 ILIMITADO
            </h3>
            <div className="overflow-x-auto shadow-modern rounded-xl border border-muted/30">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    {Object.keys(productData.pricingTable.ilimitado[0] || {}).map(header => (
                      <th key={header} className="p-4 text-left font-semibold text-lg">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productData.pricingTable.ilimitado.map((row, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'} hover:bg-purple-50 transition-colors`}>
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="p-4 text-base font-medium text-foreground border-b border-muted/20">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // Renderização padrão para outros produtos
    if (!Array.isArray(productData.pricingTable) || productData.pricingTable.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Tabela de preços não disponível para este produto.</p>
        </div>
      );
    }

    const headers = Object.keys(productData.pricingTable[0]);

    return (
      <div className="max-w-5xl mx-auto">
        <div className="overflow-x-auto shadow-modern rounded-xl border border-muted/30">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                {headers.map(header => (
                  <th key={header} className="p-4 text-left font-semibold text-lg">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productData.pricingTable.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'} hover:bg-purple-50 transition-colors`}>
                  {headers.map(key => (
                    <td key={key} className="p-4 text-base font-medium text-foreground border-b border-muted/20">
                      {row[key] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="mb-4 hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </Link>

      {/* Product Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shadow-card">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{productName}</h1>
          <p className="text-muted-foreground">{productData.description || 'Produto Vivo'}</p>
        </div>
      </div>

      {/* Product Content Layout - Novo design centralizado com tabelas maiores */}
      <div className="space-y-8">
        
        {/* Características Principais - Centralizada */}
        <Card className="shadow-modern border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              Características Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-muted/20 to-muted/10 p-6 rounded-xl border border-muted/30 max-w-4xl mx-auto">
              <div className="prose prose-sm max-w-none text-center">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                  {productData.characteristics}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo Agentes IA do Vini - Para Ajuda AI (movido para cima) */}
        {productId === 'ajuda-ai' && productData.aiAgents && productData.aiAgents.length > 0 && (
          <Card className="shadow-modern border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                Agentes IA do Vini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productData.aiAgents.map((agent, index) => (
                  <div key={index} className="bg-gradient-to-r from-muted/20 to-muted/10 p-6 rounded-xl border border-muted/30 max-w-4xl mx-auto text-center">
                    <h3 className="text-lg font-bold text-foreground mb-2">{agent.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    <a href={agent.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gradient-purple text-white shadow-card hover:shadow-modern transition-all duration-300 hover:scale-105 px-8 py-3 text-base">
                        Acessar Agente
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabelas de Preços Centralizadas e Maiores - Removida para Ajuda AI */}
        {productId !== 'ajuda-ai' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                💰 Tabela de Preços
              </h2>
              <p className="text-muted-foreground mb-6">Confira nossos planos e valores atualizados</p>
            </div>
            {renderPriceTable()}
          </div>
        )}

        {/* Observações Importantes - Centralizada */}
        <Card className="shadow-modern border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              Observações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6 rounded-xl border border-blue-200/30 max-w-4xl mx-auto">
              <div className="prose prose-sm max-w-none text-center">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                  {productData.observations}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo Agente IA - Para Licenças Microsoft */}
        {productId === 'licencas-microsoft' && productData.aiAgents && productData.aiAgents.length > 0 && (
          <Card className="shadow-modern border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                Módulo Agente IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productData.aiAgents.map((agent, index) => (
                  <div key={index} className="bg-gradient-to-r from-muted/20 to-muted/10 p-6 rounded-xl border border-muted/30 max-w-4xl mx-auto text-center">
                    <h3 className="text-lg font-bold text-foreground mb-2">{agent.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    <a href={agent.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gradient-purple text-white shadow-card hover:shadow-modern transition-all duration-300 hover:scale-105 px-8 py-3 text-base">
                        Acessar Agente
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
                    <a href={agent.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gradient-purple text-white shadow-card hover:shadow-modern transition-all duration-300 hover:scale-105 px-8 py-3 text-base">
                        Acessar Agente
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}


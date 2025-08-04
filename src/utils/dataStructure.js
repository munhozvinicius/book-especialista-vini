// Estrutura de dados para edição administrativa
export const defaultProductData = {
  'vivo-sip': {
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
• ✅ Para ERB: necessário ter numeração disponível/homologada Anatel`,
    pricingTable: [
      { 'Canais': '10', 'Mensalidade': 'R$ 490,00', 'Promoção': 'R$ 450,00' },
      { 'Canais': '15', 'Mensalidade': 'R$ 675,00', 'Promoção': 'R$ 645,00' },
      { 'Canais': '30', 'Mensalidade': 'R$ 1.200,00', 'Promoção': '—' },
      { 'Canais': '60', 'Mensalidade': 'R$ 2.159,00', 'Promoção': '—' },
      { 'Canais': '90', 'Mensalidade': 'R$ 3.229,00', 'Promoção': '—' }
    ],
    priceHistory: []
  },
  'vivo-0800': {
    characteristics: `O Vivo 0800 oferece um número único nacional para que os seus clientes tenham um canal de comunicação direto com o seu negócio — com fácil memorização e sem custo para quem gera a chamada.`,
    observations: `✅ Benefícios Inclusos:
• ✅ Portal de autoatendimento
• 📊 Relatórios online
• 🚫 Bloqueio por UF e por tipo de ligação
• 💬 Mensagem personalizada
• ⏰ Configuração de horário de atendimento`,
    pricingTable: {
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
    priceHistory: []
  },
  'vivo-voz-negocios': {
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
• Gravador de ligações: R$ 20,00/mês (por licença)`,
    pricingTable: [
      { 'Quantidade': '1 a 4 Licenças', '24 meses': 'R$ 55,00/mês', '36 meses': 'R$ 50,00/mês' },
      { 'Quantidade': '5 a 8 Licenças', '24 meses': 'R$ 50,00/mês', '36 meses': 'R$ 45,00/mês' },
      { 'Quantidade': '9 a 20 Licenças', '24 meses': 'R$ 45,00/mês', '36 meses': 'R$ 40,00/mês' },
      { 'Quantidade': '21 a 30 Licenças', '24 meses': 'R$ 40,00/mês', '36 meses': 'R$ 35,00/mês' },
      { 'Quantidade': '31 Licenças ou mais', '24 meses': 'R$ 35,00/mês', '36 meses': 'R$ 30,00/mês' }
    ],
    priceHistory: []
  },
  'vivo-internet-fibra': {
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
    observations: `⚠️ Observações importantes sobre disponibilidade e limitações técnicas conforme região.`,
    pricingTable: [
      { 'Velocidade': '400 MEGA', 'Nacional IP': 'R$ 79,99' },
      { 'Velocidade': '500 MEGA', 'Nacional IP': 'R$ 89,99' },
      { 'Velocidade': '600 MEGA', 'Nacional IP': 'R$ 129,99' },
      { 'Velocidade': '700 MEGA', 'Nacional IP': 'R$ 99,99' },
      { 'Velocidade': '1 GIGA', 'Nacional IP': 'R$ 299,99' }
    ],
    priceHistory: []
  },
  'vivo-internet-dedicada': {
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
• 300 Mbps e 1200 Mbps disponíveis só em GPON, ERB e Fibra SWA SP`,
    pricingTable: [
      { 'Velocidade': '50 MEGA', 'Mensalidade': 'R$ 500,00' },
      { 'Velocidade': '100 MEGA', 'Mensalidade': 'R$ 800,00' },
      { 'Velocidade': '200 MEGA', 'Mensalidade': 'R$ 1.000,00' },
      { 'Velocidade': '300 MEGA', 'Mensalidade': 'R$ 1.300,00' },
      { 'Velocidade': '400 MEGA', 'Mensalidade': 'R$ 1.500,00' },
      { 'Velocidade': '500 MEGA', 'Mensalidade': 'R$ 1.900,00' },
      { 'Velocidade': '700 MEGA', 'Mensalidade': 'R$ 2.200,00' }
    ],
    priceHistory: []
  },
  'combo-vivo-sip-internet-dedicada': {
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
    observations: `📋 Observações importantes sobre viabilidade técnica e comercial.`,
    pricingTable: [
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
    ],
    priceHistory: []
  },
  'licencas-microsoft': {
    characteristics: `Soluções Microsoft 365 para empresas de todos os tamanhos, com ferramentas de produtividade, colaboração e segurança.`,
    observations: `Preço atrelado a linha Móvel.`,
    pricingTable: [
      { 'Planos e Valores Microsoft 365 Móvel': 'App for Business', 'R$': 'R$ 73,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Business Basic', 'R$': 'R$ 35,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Business Basic (sem Teams)', 'R$': 'R$ 28,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Premium (sem Teams)', 'R$': 'R$ 128,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Standard', 'R$': 'R$ 81,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Standard (sem Teams)', 'R$': 'R$ 67,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Enterprise', 'R$': 'R$ 47,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'E1 (sem Teams)', 'R$': 'R$ 68,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'E3 (sem Teams)', 'R$': 'R$ 182,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Kiosk', 'R$': 'R$ 18,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Exchange Online Plan 1', 'R$': 'R$ 36,00' },
      { 'Planos e Valores Microsoft 365 Móvel': 'Exchange Online Plan 2', 'R$': 'R$ 71,00' }
    ],
    priceHistory: [],
    aiAgents: [
      {
        title: 'ViniGPT - Orçamentos de Licenças Avulso',
        description: 'Esse agente interpreta pedidos de licenças Microsoft mesmo com erros de digitação, calcula os valores unitários e totais por faixa de preço (Prateleira, Faixa 1, Faixa 2, Faixa 3), mostra a redução de comissionamento por faixa e gera uma devolutiva completa.',
        link: 'https://chatgpt.com/g/g-6852c7c675988191917bede2831c0ab4-vinigpt-orcamentos-de-licencas-avulso'
      }
    ]
  },
  'ajuda-ai': {
    characteristics: `Assistente inteligente para suporte e orientações sobre produtos e serviços Vivo.`,
    observations: `Acesse através do menu principal para obter ajuda personalizada.`,
    aiAgents: [
      {
        title: 'OraculoGPT Dados Avançados',
        description: 'Especialista em Internet Dedicada, VPN e Link Dedicado da Vivo – com base nos fluxos e manuais oficiais',
        link: 'https://chatgpt.com/g/g-6887b6c6259481919896241c69ccef87-oraculogpt-dados-avancados'
      }
    ]
  }
};

// Função para salvar dados no localStorage
export const saveProductData = (productId, data) => {
  const allData = JSON.parse(localStorage.getItem('admin-product-data') || '{}');
  
  // Se há dados anteriores, salvar no histórico de preços
  if (allData[productId] && allData[productId].pricingTable) {
    if (!allData[productId].priceHistory) {
      allData[productId].priceHistory = [];
    }
    
    allData[productId].priceHistory.push({
      timestamp: new Date().toISOString(),
      pricingTable: allData[productId].pricingTable
    });
  }
  
  allData[productId] = { ...allData[productId], ...data };
  localStorage.setItem('admin-product-data', JSON.stringify(allData));
};

// Função para carregar dados do localStorage
export const loadProductData = (productId) => {
  const allData = JSON.parse(localStorage.getItem('admin-product-data') || '{}');
  return allData[productId] || defaultProductData[productId];
};

// Função para carregar todos os dados
export const loadAllProductData = () => {
  const allData = JSON.parse(localStorage.getItem('admin-product-data') || '{}');
  
  // Merge com dados padrão para garantir que todos os produtos existam
  const mergedData = { ...defaultProductData };
  Object.keys(allData).forEach(productId => {
    mergedData[productId] = { ...defaultProductData[productId], ...allData[productId] };
  });
  
  return mergedData;
};


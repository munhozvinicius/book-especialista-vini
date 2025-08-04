// Utilitário para comparação de preços e aplicação de cores
export const comparePrices = (oldPrice, newPrice) => {
  // Remove caracteres não numéricos e converte para número
  const cleanOldPrice = parseFloat(oldPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  const cleanNewPrice = parseFloat(newPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  
  if (isNaN(cleanOldPrice) || isNaN(cleanNewPrice)) {
    return 'neutral'; // Se não conseguir comparar, mantém cor neutra
  }
  
  if (cleanNewPrice > cleanOldPrice) {
    return 'increase'; // Preço aumentou - vermelho
  } else if (cleanNewPrice < cleanOldPrice) {
    return 'decrease'; // Preço diminuiu - verde
  } else {
    return 'neutral'; // Preço igual - cor padrão
  }
};

// Função para aplicar classes CSS baseadas na comparação
export const getPriceColorClass = (comparison) => {
  switch (comparison) {
    case 'increase':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'decrease':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-purple-600 bg-white border-gray-200';
  }
};

// Função para extrair preços de uma string de tabela
export const extractPricesFromTable = (tableData) => {
  if (!tableData) return [];
  
  const prices = [];
  const lines = tableData.split('\n');
  
  lines.forEach(line => {
    // Regex para encontrar valores em formato R$ X,XX ou R$ X.XXX,XX
    const priceMatches = line.match(/R\$\s*[\d.,]+/g);
    if (priceMatches) {
      prices.push(...priceMatches);
    }
  });
  
  return prices;
};

// Função para comparar tabelas de preços completas
export const compareTablePrices = (oldTableData, newTableData) => {
  const oldPrices = extractPricesFromTable(oldTableData);
  const newPrices = extractPricesFromTable(newTableData);
  
  const comparisons = [];
  
  // Compara preços na mesma posição
  for (let i = 0; i < Math.max(oldPrices.length, newPrices.length); i++) {
    const oldPrice = oldPrices[i] || 'R$ 0,00';
    const newPrice = newPrices[i] || 'R$ 0,00';
    
    comparisons.push({
      oldPrice,
      newPrice,
      comparison: comparePrices(oldPrice, newPrice)
    });
  }
  
  return comparisons;
};


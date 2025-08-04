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
                Mó


dulo Agente IA
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


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Save, RotateCcw, TrendingUp, TrendingDown, Minus, Plus, Trash2, Eye } from 'lucide-react';
import { loadProductData, saveProductData, defaultProductData } from '@/utils/dataStructure';
import { comparePrices, getPriceColorClass } from '@/utils/priceComparison';

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

export default function ProductEditor({ productId }) {
  const [productData, setProductData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [priceComparisons, setPriceComparisons] = useState({});
  const [showPriceColors, setShowPriceColors] = useState(false);

  useEffect(() => {
    const data = loadProductData(productId);
    setProductData(data);
    setOriginalData(JSON.parse(JSON.stringify(data))); // Deep copy
  }, [productId]);

  const handleSave = () => {
    if (!productData) return;

    // Comparar preços se houver dados originais
    if (originalData && originalData.pricingTable) {
      const comparisons = {};
      
      if (Array.isArray(productData.pricingTable)) {
        productData.pricingTable.forEach((row, index) => {
          const originalRow = originalData.pricingTable[index];
          if (originalRow) {
            Object.keys(row).forEach(key => {
              if (key.toLowerCase().includes('mensalidade') || key.toLowerCase().includes('valor') || key.toLowerCase().includes('promoção')) {
                const comparison = comparePrices(originalRow[key] || 'R$ 0,00', row[key] || 'R$ 0,00');
                if (comparison !== 'neutral') {
                  comparisons[`${index}-${key}`] = comparison;
                }
              }
            });
          }
        });
      }
      
      setPriceComparisons(comparisons);
      setShowPriceColors(Object.keys(comparisons).length > 0);
    }

    saveProductData(productId, productData);
    setOriginalData(JSON.parse(JSON.stringify(productData)));
    setHasChanges(false);
    alert('Dados salvos com sucesso!');
  };

  const handleReset = () => {
    const defaultData = defaultProductData[productId];
    setProductData(defaultData);
    setOriginalData(JSON.parse(JSON.stringify(defaultData)));
    setHasChanges(true);
  };

  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateTableRow = (index, key, value) => {
    setProductData(prev => {
      const newData = { ...prev };
      if (Array.isArray(newData.pricingTable)) {
        newData.pricingTable[index] = { ...newData.pricingTable[index], [key]: value };
      }
      return newData;
    });
    setHasChanges(true);
  };

  const addTableRow = () => {
    setProductData(prev => {
      const newData = { ...prev };
      if (Array.isArray(newData.pricingTable)) {
        const lastRow = newData.pricingTable[newData.pricingTable.length - 1];
        const newRow = {};
        Object.keys(lastRow).forEach(key => {
          newRow[key] = '';
        });
        newData.pricingTable.push(newRow);
      }
      return newData;
    });
    setHasChanges(true);
  };

  const removeTableRow = (index) => {
    setProductData(prev => {
      const newData = { ...prev };
      if (Array.isArray(newData.pricingTable)) {
        newData.pricingTable.splice(index, 1);
      }
      return newData;
    });
    setHasChanges(true);
  };

  const renderPriceTable = () => {
    if (!productData || !productData.pricingTable) return null;

    if (productId === 'vivo-0800' && typeof productData.pricingTable === 'object' && !Array.isArray(productData.pricingTable)) {
      // Renderização especial para Vivo 0800 com duas modalidades
      return (
        <div className="space-y-6">
          {/* Planos FLEX */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              📊 Planos 0800 FLEX
              <Button size="sm" variant="outline" onClick={() => {
                const newData = { ...productData };
                newData.pricingTable.flex.push({ 'Valor Mínimo': '', 'Minutos Aproximados': '', 'Minuto Excedente': '' });
                setProductData(newData);
                setHasChanges(true);
              }}>
                <Plus className="w-4 h-4" />
              </Button>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-purple-100">
                    {Object.keys(productData.pricingTable.flex[0] || {}).map(header => (
                      <th key={header} className="p-3 text-left font-semibold border-b">{header}</th>
                    ))}
                    <th className="p-3 text-center border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.pricingTable.flex.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="p-2 border-b">
                          <Input
                            value={value}
                            onChange={(e) => {
                              const newData = { ...productData };
                              newData.pricingTable.flex[index][key] = e.target.value;
                              setProductData(newData);
                              setHasChanges(true);
                            }}
                            className={`${showPriceColors && priceComparisons[`flex-${index}-${key}`] ? getPriceColorClass(priceComparisons[`flex-${index}-${key}`]) : ''}`}
                          />
                        </td>
                      ))}
                      <td className="p-2 border-b text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newData = { ...productData };
                            newData.pricingTable.flex.splice(index, 1);
                            setProductData(newData);
                            setHasChanges(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Planos ILIMITADO */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              🔓 Planos 0800 ILIMITADO
              <Button size="sm" variant="outline" onClick={() => {
                const newData = { ...productData };
                newData.pricingTable.ilimitado.push({ 'Chamadas Simultâneas': '', 'Valor Mensal': '' });
                setProductData(newData);
                setHasChanges(true);
              }}>
                <Plus className="w-4 h-4" />
              </Button>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-purple-100">
                    {Object.keys(productData.pricingTable.ilimitado[0] || {}).map(header => (
                      <th key={header} className="p-3 text-left font-semibold border-b">{header}</th>
                    ))}
                    <th className="p-3 text-center border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.pricingTable.ilimitado.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="p-2 border-b">
                          <Input
                            value={value}
                            onChange={(e) => {
                              const newData = { ...productData };
                              newData.pricingTable.ilimitado[index][key] = e.target.value;
                              setProductData(newData);
                              setHasChanges(true);
                            }}
                            className={`${showPriceColors && priceComparisons[`ilimitado-${index}-${key}`] ? getPriceColorClass(priceComparisons[`ilimitado-${index}-${key}`]) : ''}`}
                          />
                        </td>
                      ))}
                      <td className="p-2 border-b text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newData = { ...productData };
                            newData.pricingTable.ilimitado.splice(index, 1);
                            setProductData(newData);
                            setHasChanges(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
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
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma tabela de preços configurada para este produto.</p>
          <Button className="mt-4" onClick={addTableRow}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeira Linha
          </Button>
        </div>
      );
    }

    const headers = Object.keys(productData.pricingTable[0]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Tabela de Preços</h4>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={addTableRow}>
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Linha
            </Button>
            {showPriceColors && (
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Preço Menor
                </Badge>
                <Badge variant="outline" className="text-red-600 bg-red-50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Preço Maior
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-purple-100">
                {headers.map(header => (
                  <th key={header} className="p-3 text-left font-semibold border-b">{header}</th>
                ))}
                <th className="p-3 text-center border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {productData.pricingTable.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {headers.map(key => (
                    <td key={key} className="p-2 border-b">
                      <Input
                        value={row[key] || ''}
                        onChange={(e) => updateTableRow(index, key, e.target.value)}
                        className={`${showPriceColors && priceComparisons[`${index}-${key}`] ? getPriceColorClass(priceComparisons[`${index}-${key}`]) : ''}`}
                      />
                    </td>
                  ))}
                  <td className="p-2 border-b text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTableRow(index)}
                      disabled={productData.pricingTable.length <= 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!productData) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{productNames[productId]}</h3>
          <p className="text-muted-foreground">Edite o conteúdo e preços do produto</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Badge variant="outline" className="text-orange-600 bg-orange-50">
              <Edit className="w-3 h-3 mr-1" />
              Alterações não salvas
            </Badge>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Restaurar Padrão
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restaurar dados padrão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá restaurar todos os dados deste produto para os valores padrão. Todas as alterações serão perdidas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  Restaurar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-1" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="characteristics" className="w-full">
        <TabsList className={`grid w-full ${(productId === 'licencas-microsoft' || productId === 'ajuda-ai') ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <TabsTrigger value="characteristics">Características</TabsTrigger>
          <TabsTrigger value="pricing">Tabela de Preços</TabsTrigger>
          <TabsTrigger value="observations">Observações</TabsTrigger>
          {(productId === 'licencas-microsoft' || productId === 'ajuda-ai') && (
            <TabsTrigger value="ai-agents">Agentes IA</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="characteristics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Características Principais</CardTitle>
              <p className="text-sm text-muted-foreground">
                Descreva os principais benefícios e características do produto.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={productData.characteristics || ''}
                onChange={(e) => updateField('characteristics', e.target.value)}
                placeholder="Digite as características do produto..."
                rows={10}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💰 Tabela de Preços
                {showPriceColors && (
                  <Badge variant="outline" className="text-blue-600 bg-blue-50">
                    <Eye className="w-3 h-3 mr-1" />
                    Comparação Ativa
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure os preços do produto. Preços alterados serão destacados em cores.
              </p>
            </CardHeader>
            <CardContent>
              {renderPriceTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Observações Importantes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Adicione observações importantes sobre o produto.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={productData.observations || ''}
                onChange={(e) => updateField('observations', e.target.value)}
                placeholder="Digite as observações do produto..."
                rows={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {(productId === 'licencas-microsoft' || productId === 'ajuda-ai') && (
          <TabsContent value="ai-agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {productId === 'licencas-microsoft' ? 'Módulo Agente IA' : 'Agentes IA do Vini'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gerencie os agentes de IA associados a este produto.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {productData.aiAgents && productData.aiAgents.map((agent, index) => (
                  <div key={index} className="border p-4 rounded-lg space-y-3">
                    <Label htmlFor={`agent-title-${index}`}>Título do Agente</Label>
                    <Input
                      id={`agent-title-${index}`}
                      value={agent.title}
                      onChange={(e) => {
                        const newAgents = [...productData.aiAgents];
                        newAgents[index].title = e.target.value;
                        updateField('aiAgents', newAgents);
                      }}
                      placeholder="Título do Agente"
                    />
                    <Label htmlFor={`agent-description-${index}`}>Descrição</Label>
                    <Textarea
                      id={`agent-description-${index}`}
                      value={agent.description}
                      onChange={(e) => {
                        const newAgents = [...productData.aiAgents];
                        newAgents[index].description = e.target.value;
                        updateField('aiAgents', newAgents);
                      }}
                      placeholder="Descrição do Agente"
                      rows={4}
                    />
                    <Label htmlFor={`agent-link-${index}`}>Link de Acesso</Label>
                    <Input
                      id={`agent-link-${index}`}
                      value={agent.link}
                      onChange={(e) => {
                        const newAgents = [...productData.aiAgents];
                        newAgents[index].link = e.target.value;
                        updateField('aiAgents', newAgents);
                      }}
                      placeholder="Link de Acesso"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newAgents = productData.aiAgents.filter((_, i) => i !== index);
                        updateField('aiAgents', newAgents);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover Agente
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const newAgents = productData.aiAgents ? [...productData.aiAgents] : [];
                    newAgents.push({ title: '', description: '', link: '' });
                    updateField('aiAgents', newAgents);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Novo Agente
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}


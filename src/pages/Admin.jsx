import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bell, FolderOpen, Edit, Plus, Trash2, Bot, Package } from 'lucide-react';
import ProductEditor from '@/components/admin/ProductEditor';

export default function Admin() {
  // Estados para Atualizações
  const [updateData, setUpdateData] = useState({
    title: 'Última Atualização',
    description: 'Sistema atualizado com novas funcionalidades e melhorias na interface. Confira os novos recursos disponíveis na área administrativa.',
    date: '31/07/2025'
  });

  // Estados para Cards
  const [microsoftCards, setMicrosoftCards] = useState([]);
  const [ajudaAiCards, setAjudaAiCards] = useState([]);
  const [newMicrosoftCard, setNewMicrosoftCard] = useState({ title: '', description: '', link: '' });
  const [newAjudaAiCard, setNewAjudaAiCard] = useState({ title: '', description: '', link: '' });

  // Estados para Edição de Produtos
  const [selectedProduct, setSelectedProduct] = useState('vivo-sip');

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

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedUpdateData = localStorage.getItem('admin-update-data');
    if (savedUpdateData) {
      setUpdateData(JSON.parse(savedUpdateData));
    }

    const savedMicrosoftCards = localStorage.getItem('admin-microsoft-cards');
    if (savedMicrosoftCards) {
      setMicrosoftCards(JSON.parse(savedMicrosoftCards));
    }

    const savedAjudaAiCards = localStorage.getItem('admin-ajuda-ai-cards');
    if (savedAjudaAiCards) {
      setAjudaAiCards(JSON.parse(savedAjudaAiCards));
    }
  }, []);

  // Funções para Atualizações
  const saveUpdateData = () => {
    localStorage.setItem('admin-update-data', JSON.stringify(updateData));
    alert('Atualização salva com sucesso!');
  };

  // Funções para Cards Microsoft
  const addMicrosoftCard = () => {
    if (newMicrosoftCard.title && newMicrosoftCard.description) {
      const newCard = { ...newMicrosoftCard, id: Date.now() };
      const updatedCards = [...microsoftCards, newCard];
      setMicrosoftCards(updatedCards);
      localStorage.setItem('admin-microsoft-cards', JSON.stringify(updatedCards));
      setNewMicrosoftCard({ title: '', description: '', link: '' });
      alert('Card adicionado com sucesso!');
    }
  };

  const removeMicrosoftCard = (id) => {
    const updatedCards = microsoftCards.filter(card => card.id !== id);
    setMicrosoftCards(updatedCards);
    localStorage.setItem('admin-microsoft-cards', JSON.stringify(updatedCards));
  };

  // Funções para Cards Ajuda AI
  const addAjudaAiCard = () => {
    if (newAjudaAiCard.title && newAjudaAiCard.description) {
      const newCard = { ...newAjudaAiCard, id: Date.now() };
      const updatedCards = [...ajudaAiCards, newCard];
      setAjudaAiCards(updatedCards);
      localStorage.setItem('admin-ajuda-ai-cards', JSON.stringify(updatedCards));
      setNewAjudaAiCard({ title: '', description: '', link: '' });
      alert('Card adicionado com sucesso!');
    }
  };

  const removeAjudaAiCard = (id) => {
    const updatedCards = ajudaAiCards.filter(card => card.id !== id);
    setAjudaAiCards(updatedCards);
    localStorage.setItem('admin-ajuda-ai-cards', JSON.stringify(updatedCards));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shadow-card">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administração</h1>
          <p className="text-muted-foreground">Gerencie atualizações, cards e preços do sistema.</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="atualizacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="atualizacoes" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Atualizações
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Gerenciar Cards
          </TabsTrigger>
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Editar Produtos
          </TabsTrigger>
          <TabsTrigger value="categoria" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Categoria
          </TabsTrigger>
        </TabsList>

        {/* Aba Atualizações */}
        <TabsContent value="atualizacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Gerenciar Atualizações
              </CardTitle>
              <p className="text-muted-foreground">
                Edite o card de atualizações que aparece no topo da página inicial.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="update-title">Título</Label>
                <Input
                  id="update-title"
                  value={updateData.title}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título da atualização"
                />
              </div>
              <div>
                <Label htmlFor="update-description">Descrição</Label>
                <Textarea
                  id="update-description"
                  value={updateData.description}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da atualização"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="update-date">Data</Label>
                <Input
                  id="update-date"
                  value={updateData.date}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, date: e.target.value }))}
                  placeholder="Data da atualização"
                />
              </div>
              <Button onClick={saveUpdateData} className="w-full">
                <Bell className="w-4 h-4 mr-2" />
                Salvar Atualização
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Gerenciar Cards */}
        <TabsContent value="cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cards Licenças Microsoft */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  Licenças Microsoft
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título do card</Label>
                  <Input
                    value={newMicrosoftCard.title}
                    onChange={(e) => setNewMicrosoftCard(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título do card"
                  />
                </div>
                <div>
                  <Label>Descrição do card</Label>
                  <Textarea
                    value={newMicrosoftCard.description}
                    onChange={(e) => setNewMicrosoftCard(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do card"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Link (opcional)</Label>
                  <Input
                    value={newMicrosoftCard.link}
                    onChange={(e) => setNewMicrosoftCard(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://exemplo.com"
                  />
                </div>
                <Button onClick={addMicrosoftCard} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Card
                </Button>

                {/* Lista de cards existentes */}
                <div className="space-y-2">
                  {microsoftCards.map((card) => (
                    <div key={card.id} className="p-3 bg-muted rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{card.title}</h4>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                        {card.link && (
                          <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                            {card.link}
                          </a>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMicrosoftCard(card.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {microsoftCards.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Nenhum card encontrado</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cards Ajuda AI */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  Ajuda AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título do card</Label>
                  <Input
                    value={newAjudaAiCard.title}
                    onChange={(e) => setNewAjudaAiCard(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título do card"
                  />
                </div>
                <div>
                  <Label>Descrição do card</Label>
                  <Textarea
                    value={newAjudaAiCard.description}
                    onChange={(e) => setNewAjudaAiCard(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do card"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Link (opcional)</Label>
                  <Input
                    value={newAjudaAiCard.link}
                    onChange={(e) => setNewAjudaAiCard(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://exemplo.com"
                  />
                </div>
                <Button onClick={addAjudaAiCard} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Card
                </Button>

                {/* Lista de cards existentes */}
                <div className="space-y-2">
                  {ajudaAiCards.map((card) => (
                    <div key={card.id} className="p-3 bg-muted rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{card.title}</h4>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                        {card.link && (
                          <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                            {card.link}
                          </a>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAjudaAiCard(card.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {ajudaAiCards.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Nenhum card encontrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Aba Editar Produtos */}
        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Editar Produtos
              </CardTitle>
              <p className="text-muted-foreground">
                Selecione um produto para editar suas características, preços e observações.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Label htmlFor="product-select" className="text-sm font-medium">
                  Selecionar Produto:
                </Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(productNames).map(([productId, productName]) => (
                      <SelectItem key={productId} value={productId}>
                        {productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border-t pt-6">
                <ProductEditor productId={selectedProduct} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Nova Categoria */}
        <TabsContent value="categoria">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nova Categoria
              </CardTitle>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Esta funcionalidade estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


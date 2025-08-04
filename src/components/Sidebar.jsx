import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Phone, 
  PhoneCall, 
  Mic, 
  Globe, 
  Wifi, 
  Package, 
  Laptop, 
  Bot, 
  Info, 
  Settings, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Início', path: '/', emoji: '🏠' },
  { icon: Phone, label: 'Vivo SIP', path: '/vivo-sip', emoji: '📞' },
  { icon: PhoneCall, label: 'Vivo 0800', path: '/vivo-0800', emoji: '📞' },
  { icon: Mic, label: 'Vivo Voz Negócios', path: '/vivo-voz-negocios', emoji: '🎤' },
  { icon: Wifi, label: 'Vivo Internet (Fibra)', path: '/vivo-internet-fibra', emoji: '📡' },
  { icon: Globe, label: 'Vivo Internet Dedicada', path: '/vivo-internet-dedicada', emoji: '🌐' },
  { icon: Package, label: 'Combo Vivo SIP + Internet Dedicada', path: '/combo-vivo-sip-internet-dedicada', emoji: '📦' },
  { icon: Laptop, label: 'Licenças Microsoft', path: '/licencas-microsoft', emoji: '💻' },
  { icon: Bot, label: 'Ajuda AI', path: '/ajuda-ai', emoji: '🤖' },
  { icon: Info, label: 'Sobre', path: '/sobre', emoji: 'ℹ️' },
];

const adminItems = [
  { icon: Settings, label: 'Administração', path: '/admin', emoji: '⚙️' },
  { icon: LogOut, label: 'Sair', path: '/logout', emoji: '🚪' },
];

export default function Sidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (path) => location.pathname === path;

  const renderMenuItem = (item, index) => (
    <Link key={item.path} to={item.path}>
      <Button
        variant={isActive(item.path) ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-300 font-medium ${
          isActive(item.path) 
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-card' 
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-card'
        } ${hoveredItem === index ? 'scale-[1.02] shadow-modern' : ''}`}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <span className="text-lg">{item.emoji}</span>
        <span className="text-sm">{item.label}</span>
      </Button>
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border shadow-modern flex flex-col">
      {/* Header - Atualizado com o nome correto */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center shadow-card">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-bold text-lg leading-tight">
              Plataforma do Vini
            </h1>
            <p className="text-sidebar-foreground/70 text-xs">
              Central Comercial
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Admin Section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {adminItems.map((item, index) => renderMenuItem(item, menuItems.length + index))}
      </div>
    </div>
  );
}


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/vivo-sip" element={<ProductPage productId="vivo-sip" />} />
          <Route path="/vivo-0800" element={<ProductPage productId="vivo-0800" />} />
          <Route path="/vivo-voz-negocios" element={<ProductPage productId="vivo-voz-negocios" />} />
          <Route path="/vivo-internet-fibra" element={<ProductPage productId="vivo-internet-fibra" />} />
          <Route path="/vivo-internet-dedicada" element={<ProductPage productId="vivo-internet-dedicada" />} />
          <Route path="/combo-vivo-sip-internet-dedicada" element={<ProductPage productId="combo-vivo-sip-internet-dedicada" />} />
          <Route path="/licencas-microsoft" element={<ProductPage productId="licencas-microsoft" />} />
          <Route path="/ajuda-ai" element={<ProductPage productId="ajuda-ai" />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
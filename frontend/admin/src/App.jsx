import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EditHeader from './pages/EditHeader';
import EditHero from './pages/EditHero';
import EditServices from './pages/EditServices';
import EditCtaBanner from './pages/EditCtaBanner';
import EditFooter from './pages/EditFooter';
import EditContact from './pages/EditContact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit/header" element={<EditHeader />} />
          <Route path="/edit/hero" element={<EditHero />} />
          <Route path="/edit/services" element={<EditServices />} />
          <Route path="/edit/cta-banner" element={<EditCtaBanner />} />
          <Route path="/edit/footer" element={<EditFooter />} />
          <Route path="/edit/contact" element={<EditContact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

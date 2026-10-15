import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './styles/index.css';
import { SiteProvider } from './context/SiteContext.jsx';
import App from './App.jsx';
import About from './components/pages/About.jsx';
import Services from './components/pages/Services.jsx';
import Destinations from './components/pages/Destinations.jsx';
import Faq from './components/pages/Faq.jsx';
import Cases from './components/pages/Cases.jsx';
import Contact from './components/pages/Contact.jsx';
import NewsDetail from './components/pages/NewsDetail.jsx';
import Admin from './components/pages/Admin.jsx';
import DynamicPage from './components/pages/DynamicPage.jsx';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/destinations"
            element={<Destinations />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/news/:slug"
            element={<NewsDetail />}
          />

          <Route
            path="/page/:slug"
            element={<DynamicPage />}
          />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  </React.StrictMode>
);
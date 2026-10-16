import { Outlet, Link } from 'react-router-dom';
import { Layout as LayoutIcon, Home, Settings, Phone, Flag, MessageSquare, FileText } from 'lucide-react';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LayoutIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link to="/edit/header" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <Settings className="h-4 w-4 mr-1" />
                  Header
                </Link>
                <Link to="/edit/hero" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <Flag className="h-4 w-4 mr-1" />
                  Hero
                </Link>
                <Link to="/edit/services" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <FileText className="h-4 w-4 mr-1" />
                  Services
                </Link>
                <Link to="/edit/cta-banner" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  CTA Banner
                </Link>
                <Link to="/edit/footer" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <FileText className="h-4 w-4 mr-1" />
                  Footer
                </Link>
                <Link to="/edit/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;

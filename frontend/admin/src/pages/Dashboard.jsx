import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteDataApi } from '../api';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await siteDataApi.getAll();
      setData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const sections = [
    { key: 'header', title: 'Header', description: 'Site name, navigation menu, CTA buttons' },
    { key: 'hero', title: 'Hero Section', description: 'Main banner with title, description, and buttons' },
    { key: 'servicesSection', title: 'Services Section', description: 'Service cards and descriptions' },
    { key: 'ctaBanner', title: 'CTA Banner', description: 'Call-to-action banner' },
    { key: 'footer', title: 'Footer', description: 'Footer content and links' },
    { key: 'contact', title: 'Contact Info', description: 'Phone numbers and addresses' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your website content dynamically</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.key}
            to={`/edit/${section.key}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{section.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            {data && data[section.key] && (
              <div className="mt-4 flex items-center text-xs text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Configured
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

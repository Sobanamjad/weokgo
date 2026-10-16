import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteDataApi } from '../api';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

function EditServices() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    badge: '',
    title: '',
    description: '',
    cards: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await siteDataApi.getSection('servicesSection');
      setData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await siteDataApi.updateSection('servicesSection', data);
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const addCard = () => {
    setData({
      ...data,
      cards: [...data.cards, { title: '', description: '' }],
    });
  };

  const updateCard = (index, field, value) => {
    const newCards = [...data.cards];
    newCards[index][field] = value;
    setData({ ...data, cards: newCards });
  };

  const removeCard = (index) => {
    setData({
      ...data,
      cards: data.cards.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Services Section</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
          <input
            type="text"
            value={data.badge}
            onChange={(e) => setData({ ...data, badge: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Cards</label>
          <div className="space-y-4">
            {data.cards.map((card, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCard(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Description</label>
                  <textarea
                    value={card.description}
                    onChange={(e) => updateCard(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove Card
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCard}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Add Service Card
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditServices;

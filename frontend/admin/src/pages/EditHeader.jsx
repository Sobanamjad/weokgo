import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteDataApi } from '../api';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

function EditHeader() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    siteName: '',
    tagline: '',
    menuItems: [],
    ctaLabel: '',
    ctaPath: '',
    mobileCtaLabel: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await siteDataApi.getSection('header');
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
      await siteDataApi.updateSection('header', data);
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = () => {
    setData({
      ...data,
      menuItems: [...data.menuItems, { label: '', path: '' }],
    });
  };

  const updateMenuItem = (index, field, value) => {
    const newMenuItems = [...data.menuItems];
    newMenuItems[index][field] = value;
    setData({ ...data, menuItems: newMenuItems });
  };

  const removeMenuItem = (index) => {
    setData({
      ...data,
      menuItems: data.menuItems.filter((_, i) => i !== index),
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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Header</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={data.siteName}
            onChange={(e) => setData({ ...data, siteName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
          <div className="space-y-3">
            {data.menuItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Path"
                  value={item.path}
                  onChange={(e) => updateMenuItem(index, 'path', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMenuItem}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Add Menu Item
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Label</label>
          <input
            type="text"
            value={data.ctaLabel}
            onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Path</label>
          <input
            type="text"
            value={data.ctaPath}
            onChange={(e) => setData({ ...data, ctaPath: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile CTA Label</label>
          <input
            type="text"
            value={data.mobileCtaLabel}
            onChange={(e) => setData({ ...data, mobileCtaLabel: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default EditHeader;

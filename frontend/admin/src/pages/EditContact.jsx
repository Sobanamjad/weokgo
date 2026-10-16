import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteDataApi } from '../api';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

function EditContact() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phones: [],
    addresses: [],
    lineQrNote: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await siteDataApi.getSection('contact');
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
      await siteDataApi.updateSection('contact', data);
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const addPhone = () => {
    setData({
      ...data,
      phones: [...data.phones, { name: '', number: '' }],
    });
  };

  const updatePhone = (index, field, value) => {
    const newPhones = [...data.phones];
    newPhones[index][field] = value;
    setData({ ...data, phones: newPhones });
  };

  const removePhone = (index) => {
    setData({
      ...data,
      phones: data.phones.filter((_, i) => i !== index),
    });
  };

  const addAddress = () => {
    setData({
      ...data,
      addresses: [...data.addresses, ''],
    });
  };

  const updateAddress = (index, value) => {
    const newAddresses = [...data.addresses];
    newAddresses[index] = value;
    setData({ ...data, addresses: newAddresses });
  };

  const removeAddress = (index) => {
    setData({
      ...data,
      addresses: data.addresses.filter((_, i) => i !== index),
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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Contact Info</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
          <div className="space-y-3">
            {data.phones.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={phone.name}
                  onChange={(e) => updatePhone(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Number"
                  value={phone.number}
                  onChange={(e) => updatePhone(index, 'number', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPhone}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Add Phone
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Addresses</label>
          <div className="space-y-2">
            {data.addresses.map((address, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => updateAddress(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAddress}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Add Address
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LINE QR Note</label>
          <textarea
            value={data.lineQrNote}
            onChange={(e) => setData({ ...data, lineQrNote: e.target.value })}
            rows={3}
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

export default EditContact;

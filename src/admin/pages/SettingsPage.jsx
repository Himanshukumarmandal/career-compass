import React, { useState, useEffect } from 'react';
import { Save, Info, Globe, Facebook, Instagram, Mail, Phone, MapPin, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import LoadingSkeleton from '../components/LoadingSkeleton';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    businessName: 'Career Compass Consultancy',
    phone: '',
    whatsapp: '',
    address: '',
    email: '',
    facebookUrl: '',
    instagramUrl: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/settings');
        if (res.data) {
          setForm({
            businessName: res.data.businessName || 'Career Compass Consultancy',
            phone: res.data.phone || '',
            whatsapp: res.data.whatsapp || '',
            address: res.data.address || '',
            email: res.data.email || '',
            facebookUrl: res.data.facebookUrl || '',
            instagramUrl: res.data.instagramUrl || '',
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', form);
      toast.success('Business settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to update business settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="card" count={2} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold admin-text">Business Settings</h1>
        <p className="text-xs admin-text-muted">
          Customize contact information, consulting office location, and social links for the public website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Business Info */}
        <div className="lg:col-span-2 rounded-2xl border admin-card p-6 admin-glass shadow-sm space-y-6">
          <h3 className="font-bold admin-text flex items-center gap-2 border-b admin-border pb-4">
            <Building size={18} className="text-brandNavy dark:text-yellow-400" />
            <span>Consultancy Details</span>
          </h3>

          <div className="space-y-4 text-sm">
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Business Name
              </label>
              <div className="relative">
                <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                <input
                  type="text"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Enter business name"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                  Primary Phone
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Primary contact phone"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>
              </div>

              {/* WhatsApp number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                  WhatsApp Contact
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp chat number"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Public Inquiry Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Official email address"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                />
              </div>
            </div>

            {/* Office Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Physical Office Address
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 admin-text-muted" />
                <textarea
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Consulting center physical location address..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20 leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Channels & Submit */}
        <div className="space-y-6">
          {/* Social Profiles */}
          <div className="rounded-2xl border admin-card p-6 admin-glass shadow-sm space-y-4">
            <h3 className="font-bold admin-text flex items-center gap-2 border-b admin-border pb-4">
              <Globe size={18} className="text-brandNavy dark:text-yellow-400" />
              <span>Social Presence</span>
            </h3>

            <div className="space-y-4 text-sm">
              {/* Facebook URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                  Facebook Page
                </label>
                <div className="relative">
                  <Facebook size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                  <input
                    type="url"
                    name="facebookUrl"
                    value={form.facebookUrl}
                    onChange={handleChange}
                    placeholder="https://facebook.com/page"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>
              </div>

              {/* Instagram URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                  Instagram Handle
                </label>
                <div className="relative">
                  <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 admin-text-muted" />
                  <input
                    type="url"
                    name="instagramUrl"
                    value={form.instagramUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/profile"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Panel */}
          <div className="rounded-2xl border admin-card p-5 admin-glass shadow-sm space-y-4">
            <div className="flex gap-2 text-xs admin-text-muted leading-relaxed">
              <Info size={16} className="shrink-0 text-brandNavy dark:text-yellow-400 mt-0.5" />
              <p>Saving these configurations immediately modifies the contact details displayed in the headers, footers, and forms of the public landing page.</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy font-bold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;

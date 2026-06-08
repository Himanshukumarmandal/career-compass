import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, EyeOff, Plus, FileImage, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../hooks/useApi';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSkeleton from '../components/LoadingSkeleton';

const BannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('hero');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get('/banners');
      setBanners(res.data);
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error('Failed to load banners.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please enter a title.');
      return;
    }
    if (!imagePreview) {
      toast.error('Please select an image file to upload.');
      return;
    }

    try {
      setUploading(true);
      await api.post('/banners', {
        title,
        type,
        image: imagePreview,
      });

      toast.success('Banner uploaded successfully!');
      // Reset form
      setTitle('');
      setType('hero');
      setImageFile(null);
      setImagePreview('');
      setIsUploadOpen(false);
      fetchBanners();
    } catch (error) {
      console.error('Error uploading banner:', error);
      const message = error.response?.data?.message || 'Failed to upload banner.';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await api.patch(`/banners/${id}/toggle`);
      setBanners(banners.map(b => b._id === id ? res.data : b));
      toast.success(`Banner status updated.`);
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('Failed to change status.');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/banners/${deleteId}`);
      toast.success('Banner deleted successfully.');
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold admin-text">Website Banners</h1>
          <p className="text-xs admin-text-muted">
            Upload and manage marketing hero banners, notice alerts, and promotion advertisements displayed on the website.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(!isUploadOpen)}
          className="flex items-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
        >
          {isUploadOpen ? <X size={16} /> : <Plus size={16} />}
          <span>{isUploadOpen ? 'Close Form' : 'Upload Banner'}</span>
        </button>
      </div>

      {/* Upload Banner form toggle drawer */}
      {isUploadOpen && (
        <div className="p-6 rounded-2xl border admin-card shadow-sm admin-glass max-w-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold admin-text flex items-center gap-2 border-b admin-border pb-3 mb-4">
            <Upload size={18} className="text-brandNavy dark:text-yellow-400" />
            <span>Upload New Banner Media</span>
          </h3>

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-sm">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Banner Title / Caption
              </label>
              <input
                type="text"
                required
                placeholder="Enter descriptive title for screen readers / hover"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Display Location Placement
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border admin-input focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-medium"
              >
                <option value="hero">Hero Carousel (Slideshow at the top)</option>
                <option value="notice">Notice Overlay (Popup alerts / news marquee)</option>
                <option value="promo">Promo Cards (Course marketing sections)</option>
              </select>
            </div>

            {/* Image picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider admin-text-muted mb-1.5">
                Upload Image File
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Drag / Select Panel */}
                <label className="flex-1 w-full flex flex-col items-center justify-center border-2 border-dashed admin-border hover:border-brandNavy/40 dark:hover:border-yellow-400/40 rounded-2xl p-6 cursor-pointer bg-black/[0.01] dark:bg-white/[0.01] transition-all">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center text-xs">
                    <FileImage size={28} className="admin-text-muted" />
                    <span className="font-semibold admin-text">Click to choose image</span>
                    <span className="admin-text-muted">Supports JPG, PNG, WEBP (Max 5MB)</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {/* Preview Panel */}
                {imagePreview && (
                  <div className="relative w-36 h-28 rounded-xl border admin-border overflow-hidden shrink-0 shadow-sm bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t admin-border flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>Uploading Banner...</>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Upload Image</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Banners */}
      {loading ? (
        <LoadingSkeleton type="card" count={3} />
      ) : (
        <div className="space-y-6">
          {banners.length === 0 ? (
            <div className="rounded-2xl border admin-card p-12 text-center admin-glass shadow-sm flex flex-col items-center justify-center space-y-3">
              <ImageIcon size={44} className="text-slate-300 dark:text-slate-700" />
              <p className="font-semibold admin-text">No banners uploaded yet</p>
              <p className="text-xs admin-text-muted max-w-sm">
                Get started by clicking the "Upload Banner" button to customize your hero sections and alerts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div 
                  key={banner._id}
                  className={`rounded-2xl border admin-card overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                    !banner.isActive ? 'opacity-60' : ''
                  }`}
                >
                  {/* Banner Image */}
                  <div className="h-44 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative flex items-center justify-center">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Banner Placement Type Badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-black/60 text-white uppercase tracking-wide">
                      {banner.type}
                    </span>
                  </div>

                  {/* Banner details */}
                  <div className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm admin-text line-clamp-1" title={banner.title}>
                      {banner.title}
                    </h4>

                    {/* Controls row */}
                    <div className="flex items-center justify-between pt-2 border-t admin-border">
                      {/* Active switch */}
                      <button
                        onClick={() => handleToggleActive(banner._id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          banner.isActive 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {banner.isActive ? (
                          <>
                            <Eye size={14} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteClick(banner._id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 rounded-xl transition-all"
                        title="Delete Banner"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete confirm modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Banner Image"
        message="Are you sure you want to permanently delete this banner media? This will remove it from the database and Cloudinary storage."
      />
    </div>
  );
};

export default BannersPage;

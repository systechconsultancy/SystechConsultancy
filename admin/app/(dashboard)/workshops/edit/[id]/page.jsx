"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';

export default function EditWorkshopPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting'

  const inputClass = "w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/workshops/${id}`, { 
        credentials: "include" 
      })
        .then(res => {
          if (!res.ok) throw new Error('Workshop not found');
          return res.json();
        })
        .then(data => {
          if (data.date) {
            data.date = new Date(data.date).toISOString().split('T')[0];
          }
          setFormData(data);
          setTags(data.tags || []);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');
    
    const submissionData = { ...formData, tags };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/workshops/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update workshop');
      
      router.push('/workshops');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  if (loading) return <div className="p-8">Loading workshop details...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!formData) return <div className="p-8">Workshop not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Workshop</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workshop Title */}
        <div>
          <label className="block font-medium text-gray-700">Workshop Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Mentor Name */}
        <div>
          <label className="block font-medium text-gray-700">Mentor Name</label>
          <input type="text" name="mentor" value={formData.mentor} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Max Participants */}
        <div>
          <label className="block font-medium text-gray-700">Max Participants</label>
          <input type="number" name="maxParticipants" min={1} value={formData.maxParticipants} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Fee */}
        <div>
          <label className="block font-medium text-gray-700">Workshop Fee (₹)</label>
          <input type="number" name="fee" min={0} value={formData.fee} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Duration */}
        <div>
          <label className="block font-medium text-gray-700">Duration</label>
          <input type="text" name="duration" placeholder="e.g., 2 hours" value={formData.duration} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Date */}
        <div>
          <label className="block font-medium text-gray-700">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Time */}
        <div>
          <label className="block font-medium text-gray-700">Start Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Mode */}
        <div>
          <label className="block font-medium text-gray-700">Mode</label>
          <select name="mode" className={inputClass} value={formData.mode} onChange={handleChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        {/* Location - conditional */}
        {formData.mode === "Offline" && (
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700">Location</label>
            <input type="text" name="location" placeholder="Systech Campus, Hyderabad" value={formData.location} onChange={handleChange} className={inputClass} required />
          </div>
        )}
        {/* WhatsApp Link */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">WhatsApp Link</label>
          <input type="url" name="whatsAppLink" placeholder="https://wa.me/..." value={formData.whatsAppLink} onChange={handleChange} className={inputClass} required />
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea name="description" className={`${inputClass} h-28`} value={formData.description} onChange={handleChange} required />
        </div>
        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex items-center gap-2 mb-2">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Enter a tag and press Enter" className={inputClass} />
            <button type="button" onClick={addTag} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">&times;</button>
              </span>
            ))}
          </div>
        </div>
        {/* Thumbnail */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Thumbnail Image Link</label>
          <input type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className={inputClass} />
        </div>
        {/* Status */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Status</label>
          <select name="status" className={inputClass} value={formData.status} onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {status === 'submitting' ? 'Saving...' : 'Save Changes'}
          </button>
          {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}
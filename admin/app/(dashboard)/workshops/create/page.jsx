"use client";
import Link from "next/link";
import { useState } from "react";

// The initial empty state for the form, used for creating and resetting.
const initialFormState = {
  title: "",
  mentor: "",
  maxParticipants: "",
  fee: "",
  duration: "",
  date: "",
  time: "",
  mode: "Online",
  location: "",
  whatsAppLink: "",
  description: "",
  thumbnailUrl: "",
  status: "Draft",
};

export default function CreateWorkshopPage() {
  // State for all form inputs
  const [formData, setFormData] = useState(initialFormState);
  // State for the tag input feature
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  // State to manage the form's submission status and errors
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [error, setError] = useState('');

  const inputClass =
    "w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // Resets the form to its initial state for creating a new workshop
  const handleReset = () => {
    setFormData(initialFormState);
    setTags([]);
    setTagInput("");
    setStatus('idle');
    setError('');
  };

  // Handles the API submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const submissionData = {
      ...formData,
      tags,
      ...(formData.mode === "Online" && { location: "" }),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/workshops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
      
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  // If the form was submitted successfully, show the success card
  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-800">Workshop Created Successfully!</h2>
          <p className="text-gray-600 mt-3">The workshop "{formData.title}" has been added.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/workshops" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition">
              View All Workshops
            </Link>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300 transition"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Workshop</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All form fields */}
        <div>
          <label className="block font-medium text-gray-700">Workshop Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} required/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Mentor Name</label>
          <input type="text" name="mentor" value={formData.mentor} onChange={handleChange} className={inputClass} required/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Max Participants</label>
          <input type="number" name="maxParticipants" min={1} value={formData.maxParticipants} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Workshop Fee (₹)</label>
          <input type="number" name="fee" min={0} value={formData.fee} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Duration</label>
          <input type="text" name="duration" placeholder="e.g., 2 hours" value={formData.duration} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Start Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Mode</label>
          <select name="mode" className={inputClass} value={formData.mode} onChange={handleChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        {formData.mode === "Offline" && (
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700">Location</label>
            <input type="text" name="location" placeholder="Systech Campus, Hyderabad" value={formData.location} onChange={handleChange} className={inputClass} required />
          </div>
        )}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">WhatsApp Link</label>
          <input type="url" name="whatsAppLink" placeholder="https://wa.me/..." value={formData.whatsAppLink} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea name="description" className={`${inputClass} h-28`} placeholder="Brief about the workshop..." value={formData.description} onChange={handleChange} required />
        </div>
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
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Thumbnail Image Link</label>
          <input type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Status</label>
          <select name="status" className={inputClass} value={formData.status} onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {status === 'submitting' ? 'Creating...' : 'Create Workshop'}
          </button>
          {status === 'error' && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}
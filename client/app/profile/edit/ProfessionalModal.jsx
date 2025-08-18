"use client";
import { useState } from 'react';

export default function ProfessionalModal({ professional, onClose, onSave }) {
  const [data, setData] = useState(professional);
  
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Experience</h2>
        <div className="space-y-4">
          <input name="jobTitle" value={data.jobTitle || ''} onChange={handleChange} placeholder="Job Title" className="w-full p-2 border rounded" />
          <input name="company" value={data.company || ''} onChange={handleChange} placeholder="Company" className="w-full p-2 border rounded" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={() => onSave(data)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
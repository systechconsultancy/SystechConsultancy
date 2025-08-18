"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);

export default function CertificationsModal({ isOpen, onClose, onSave, certificationData }) {
  const blankCertification = { name: '', organization: '', year: '' };
  const [data, setData] = useState(blankCertification);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setData(certificationData || blankCertification);
      setErrors({}); // Reset errors when modal opens
    }
  }, [certificationData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Certificate name is required.";
    if (!data.organization) newErrors.organization = "Organization is required.";
    if (!data.year) newErrors.year = "Year is required.";
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
      <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative" noValidate>
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-6">{certificationData ? "Edit Certification" : "Add Certification"}</h2>
        
        <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
              <input type="text" name="name" value={data.name || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}/>
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <input type="text" name="organization" value={data.organization || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}/>
              {errors.organization && <p className="text-xs text-red-600 mt-1">{errors.organization}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select name="year" value={data.year || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="" disabled>Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="text-xs text-red-600 mt-1">{errors.year}</p>}
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium bg-gray-100 rounded-md border">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm">{certificationData ? "Save Changes" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function WorkExperienceModal({ isOpen, onClose, onSave, experienceData }) {
  const blankExperience = { jobTitle: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '' };
  const [data, setData] = useState(blankExperience);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setData(experienceData || blankExperience);
      setErrors({}); // Reset errors when modal opens
    }
  }, [experienceData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };

    if (name === 'endYear' && value === 'Present') {
      newData.endMonth = '';
    }
    
    setData(newData);

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!data.company) newErrors.company = "Company is required.";
    if (!data.startYear) newErrors.startYear = "Start year is required.";
    if (!data.startMonth) newErrors.startMonth = "Start month is required.";
    if (!data.endYear) newErrors.endYear = "End year is required.";
    if (data.endYear && data.endYear !== 'Present' && !data.endMonth) {
        newErrors.endMonth = "End month is required.";
    }
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop submission if there are errors
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
        <h2 className="text-xl font-semibold mb-6">{experienceData ? "Edit Experience" : "Add Experience"}</h2>
        
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" name="jobTitle" value={data.jobTitle || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.jobTitle && <p className="text-xs text-red-600 mt-1">{errors.jobTitle}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input type="text" name="company" value={data.company || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.company ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <div className="flex gap-2 mt-1">
                        <select name="startMonth" value={data.startMonth || ""} onChange={handleChange} className={`block w-full px-3 py-2 border rounded-md shadow-sm ${errors.startMonth ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="" disabled>Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select name="startYear" value={data.startYear || ""} onChange={handleChange} className={`block w-full px-3 py-2 border rounded-md shadow-sm ${errors.startYear ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="" disabled>Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                     {(errors.startMonth || errors.startYear) && <p className="text-xs text-red-600 mt-1">Start date is required.</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <div className="flex gap-2 mt-1">
                        <select name="endYear" value={data.endYear || ""} onChange={handleChange} className={`block w-full px-3 py-2 border rounded-md shadow-sm ${errors.endYear ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="" disabled>Year</option>
                            <option value="Present">Present</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {data.endYear !== 'Present' && (
                            <select name="endMonth" value={data.endMonth || ""} onChange={handleChange} className={`block w-full px-3 py-2 border rounded-md shadow-sm ${errors.endMonth ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="" disabled>Month</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        )}
                    </div>
                    {(errors.endMonth || errors.endYear) && <p className="text-xs text-red-600 mt-1">End date is required.</p>}
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium bg-gray-100 rounded-md border">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm">{experienceData ? "Save Changes" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
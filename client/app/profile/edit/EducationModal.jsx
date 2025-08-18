"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Helpers defined outside
const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);
const qualifications = ['12th', 'Intermediate', 'Diploma', 'B.Tech', 'Masters', 'PhD'];

export default function EducationModal({ isOpen, onClose, onSave, educationData }) {
  const blankEducation = { qualification: "", institute: "", stream: "", score: "", year: "" };
  const [data, setData] = useState(blankEducation);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setData(educationData || blankEducation);
      setErrors({}); // Reset errors when modal opens
    }
  }, [educationData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.qualification) newErrors.qualification = "Qualification is required.";
    if (!data.institute) newErrors.institute = "Institute/Board is required.";
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
        <h2 className="text-xl font-semibold mb-6">{educationData ? "Edit Education" : "Add Education"}</h2>
        
        <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <select name="qualification" value={data.qualification || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="" disabled>Select Qualification</option>
                  {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
               {errors.qualification && <p className="text-xs text-red-600 mt-1">{errors.qualification}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Institute / Board</label>
              <input type="text" name="institute" value={data.institute || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.institute ? 'border-red-500' : 'border-gray-300'}`}/>
              {errors.institute && <p className="text-xs text-red-600 mt-1">{errors.institute}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Stream / Major (Optional)</label>
                <input type="text" name="stream" value={data.stream || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (Optional)</label>
                <input type="text" name="score" value={data.score || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Completion</label>
              <select name="year" value={data.year || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="" disabled>Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="text-xs text-red-600 mt-1">{errors.year}</p>}
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium bg-gray-100 rounded-md border">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm">{educationData ? "Save Changes" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
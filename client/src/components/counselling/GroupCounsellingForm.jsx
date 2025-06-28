import { useEffect, useState } from "react";
import Accordion from "../shared/Accordion";
import DatePicker from "react-datepicker";
import StudentSection from "./StudentSection";
import ProfessionalSection from "./ProfessionalSection";
import "react-datepicker/dist/react-datepicker.css";

const GroupCounsellingForm = ({
  groupData,
  setGroupData,
  errors,
  noOfStudents,
  setNoOfStudents,
  onSubmit,
  loading,
  amount
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  const handleDateChange = (date) => {
    setGroupData((prev) => ({ ...prev, date }));
  };

  const handleModeChange = (e) => {
    setGroupData((prev) => ({ ...prev, mode: e.target.value }));
  };

  const handleStudentChange = (index, e) => {
    const updatedStudents = [...(groupData.students || [])];
    updatedStudents[index][e.target.name] = e.target.value;
    setGroupData((prev) => ({ ...prev, students: updatedStudents }));
  };

  useEffect(() => {
    const defaultStudent = {
      name: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      userType: "",

      // Student-specific
      collegeName: "",
      branch: "",
      cgpa: "",
      backlogs: "",
      graduationYear: "",

      // Professional-specific
      jobTitle: "",
      company: "",
      experienceYears: "",
      careerGoal: "",
      projectDomains: "",

      // Common
      fieldOfInterest: "",
      expectationsFromCall: "",
    };

    const updated = [...(groupData.students || [])];
    if (noOfStudents > updated.length) {
      for (let i = updated.length; i < noOfStudents; i++) {
        updated.push({ ...defaultStudent });
      }
    } else {
      updated.length = noOfStudents;
    }

    setGroupData((prev) => ({
      ...prev,
      students: updated,
    }));

    setOpenIndex(0);
  }, [noOfStudents]);

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Student Count Selector */}
      <div>
        <label className="text-sm font-medium text-gray-700">Number of Students *</label>
        <select
          className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
          value={noOfStudents}
          onChange={(e) => setNoOfStudents(Number(e.target.value))}
          required
        >
          <option value="">-- Select --</option>
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Accordions */}
      {Array.isArray(groupData.students) &&
        groupData.students.map((student, index) => (
          <Accordion
            key={index}
            title={`Student ${index + 1}`}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Common Fields */}
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  pattern="^[6-9][0-9]{9}$"
                  placeholder="e.g. 9876543210"
                  title="Enter a valid 10-digit Indian number"
                  value={student.phone}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={student.dob}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">City (required if offline)</label>
                <input
                  type="text"
                  name="city"
                  value={student.city}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">You are *</label>
                <select
                  name="userType"
                  value={student.userType}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="student">Student</option>
                  <option value="professional">Working Professional</option>
                </select>
              </div>

              {/* Conditional Sections */}
              {student.userType === "student" && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StudentSection formData={student} handleChange={(e) => handleStudentChange(index, e)} />
                </div>
              )}

              {student.userType === "professional" && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfessionalSection formData={student} handleChange={(e) => handleStudentChange(index, e)} />
                </div>
              )}

              {/* Common Fields */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Field of Interest</label>
                <input
                  name="fieldOfInterest"
                  type="text"
                  value={student.fieldOfInterest}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 p-3 w-full text-black rounded border border-gray-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Expectations from the Call</label>
                <textarea
                  name="expectationsFromCall"
                  rows="2"
                  value={student.expectationsFromCall}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="mt-1 w-full p-3 text-black border border-gray-300 rounded"
                />
              </div>
            </div>
          </Accordion>
        ))}

      {/* Date and Mode Selection - Responsive */}
      {noOfStudents && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Preferred Date *</label>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={groupData.date ? new Date(groupData.date) : null}
                onChange={handleDateChange}
                minDate={today}
                maxDate={maxDate}
                placeholderText="Choose your date"
                className="w-full border border-gray-300 rounded text-black"
                dateFormat="dd/MM/yyyy"
                filterDate={(date) => {
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  return d >= today && d <= maxDate;
                }}
              />
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Mode *</label>
              <select
                value={groupData.mode || ""}
                onChange={handleModeChange}
                className="w-full p-3 border border-gray-300 rounded text-black"
                required
              >
                <option value="">-- Select Mode --</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : `Pay ₹${amount} & Book Session`}
            </button>
          </div>
          {errors && errors.general && (
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          )}

        </>
      )}
    </form>
  );
};

export default GroupCounsellingForm;
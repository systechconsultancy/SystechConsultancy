"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import WorkExperienceModal from './WorkExperienceModal';
import EducationModal from './EducationModal';
import CertificationsModal from './CertificationsModal';
import { TrashIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);
  const [editingWorkExperience, setEditingWorkExperience] = useState(null); // { index, data }
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null); // { index, data }
  const [isCertificationsModalOpen, setIsCertificationsModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);

  const addTagItem = (key, value, setValue) => {
    if (!value.trim()) return; // Prevent adding empty strings
    setUser((prevUser) => ({
      ...prevUser,
      [key]: [...(prevUser[key] || []), value.trim()],
    }));
    setValue(""); // Clear the input field
  };

  // Removes an item from a state array by its index.
  const removeItem = (key, index) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: prevUser[key].filter((_, i) => i !== index),
    }));
  };

  // --- Handlers for Work Experience Modal ---
  const handleOpenEditWorkExperience = (index) => {
    setEditingWorkExperience({ index, data: user.workExperience[index] });
    setIsWorkExperienceModalOpen(true);
  };

  const handleOpenAddWorkExperience = () => {
    setEditingWorkExperience(null);
    setIsWorkExperienceModalOpen(true);
  };

  const handleSaveWorkExperience = (experienceItem) => {
    const list = [...(user.workExperience || [])];
    if (editingWorkExperience !== null) {
      list[editingWorkExperience.index] = experienceItem;
    } else {
      list.push(experienceItem);
    }
    setUser((prev) => ({ ...prev, workExperience: list }));
    setIsWorkExperienceModalOpen(false);
  };

  // --- Handlers for Education Modal ---
  const handleOpenEditEducation = (index) => {
    setEditingEducation({ index, data: user.education[index] });
    setIsEducationModalOpen(true);
  };

  const handleOpenAddEducation = () => {
    setEditingEducation(null);
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = (educationItem) => {
    const list = [...(user.education || [])];
    if (editingEducation !== null) {
      list[editingEducation.index] = educationItem;
    } else {
      list.push(educationItem);
    }
    setUser((prev) => ({ ...prev, education: list }));
    setIsEducationModalOpen(false);
  };

  // --- Handlers for Certifications Modal ---
  const handleOpenEditCertification = (index) => {
    setEditingCertification({ index, data: user.certifications[index] });
    setIsCertificationsModalOpen(true);
  };

  const handleOpenAddCertification = () => {
    setEditingCertification(null);
    setIsCertificationsModalOpen(true);
  };

  const handleSaveCertification = (certificationItem) => {
    const list = [...(user.certifications || [])];
    if (editingCertification !== null) {
      list[editingCertification.index] = certificationItem;
    } else {
      list.push(certificationItem);
    }
    setUser((prev) => ({ ...prev, certifications: list }));
    setIsCertificationsModalOpen(false);
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/api/profile");
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
        // Optionally, set an error state to show a message to the user
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Handles all simple text input changes efficiently.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Send the transformed payload, not the original user state
      await api.put("/api/profile", user);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading Profile...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-red-600">Could not load profile. Please try again later.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1: Basic Information */}
        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <legend className="text-xl font-semibold mb-4 px-2">Basic Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" value={user.name || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={user.city || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={user.email || ""} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" disabled />
            </div>

            {/* Phone (Read-only) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="phone" name="phone" value={user.phone || ""} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" disabled />
            </div>

            {/* Resume URL */}
            <div className="md:col-span-2">
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">Resume URL</label>
              <input type="url" id="resumeUrl" name="resumeUrl" value={user.resumeUrl || ""} onChange={handleChange} placeholder="https://example.com/resume.pdf" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Profile Summary */}
            <div className="md:col-span-2">
              <label htmlFor="profileSummary" className="block text-sm font-medium text-gray-700">Profile Summary</label>
              <textarea id="profileSummary" name="profileSummary" value={user.profileSummary || ""} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </fieldset>

        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <legend className="text-xl font-semibold mb-4 px-2">Skills</legend>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents form submission
                  addTagItem('skills', skillInput, setSkillInput);
                }
              }}
              className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add a skill and press Enter"
            />
            <button
              type="button"
              onClick={() => addTagItem('skills', skillInput, setSkillInput)}
              className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 shadow-sm flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                {skill}
                <button
                  type="button"
                  onClick={() => removeItem('skills', index)}
                  className="text-gray-500 hover:text-red-600"
                  aria-label={`Remove ${skill}`}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
            {(!user.skills || user.skills.length === 0) && (
              <p className="text-sm text-gray-500">No skills added yet.</p>
            )}
          </div>
        </fieldset>

        {/* Section 3: Achievements */}
        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <legend className="text-xl font-semibold mb-4 px-2">Achievements</legend>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={achievementInput}
              onChange={(e) => setAchievementInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTagItem('achievements', achievementInput, setAchievementInput);
                }
              }}
              className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add an achievement and press Enter"
            />
            <button
              type="button"
              onClick={() => addTagItem('achievements', achievementInput, setAchievementInput)}
              className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 shadow-sm flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.achievements?.map((achievement, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                {achievement}
                <button
                  type="button"
                  onClick={() => removeItem('achievements', index)}
                  className="text-green-600 hover:text-red-600"
                  aria-label={`Remove ${achievement}`}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
            {(!user.achievements || user.achievements.length === 0) && (
              <p className="text-sm text-gray-500">No achievements added yet.</p>
            )}
          </div>
        </fieldset>

        {/* Work Experience */}
        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <legend className="text-xl font-semibold px-2">Work Experience</legend>
            <button type="button" onClick={handleOpenAddWorkExperience} className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm">
              <PlusIcon className="h-4 w-4" /> Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {/* Header Row - Updated for three columns */}
            {user.workExperience && user.workExperience.length > 0 && (
              <div className="hidden md:grid grid-cols-12 gap-4 px-3 pb-2 border-b">
                <div className="col-span-3"><h3 className="text-sm font-semibold text-gray-500">Role</h3></div>
                <div className="col-span-3"><h3 className="text-sm font-semibold text-gray-500">Company</h3></div>
                <div className="col-span-4"><h3 className="text-sm font-semibold text-gray-500">Duration</h3></div>
                <div className="col-span-2"></div> {/* Spacer for buttons */}
              </div>
            )}

            {/* Experience List */}
            {user.workExperience?.map((job, index) => {
              const startDate = (job.startMonth && job.startYear) ? `${job.startMonth} ${job.startYear}` : "Not Specified";
              const endDate = job.endYear === 'Present' ? 'Present' : (job.endMonth && job.endYear) ? `${job.endMonth} ${job.endYear}` : "Not Specified";

              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-center px-3 py-3 rounded-md hover:bg-gray-50 border-b md:border-none">
                  {/* Role */}
                  <div className="md:col-span-3">
                    <label className="md:hidden text-xs font-semibold text-gray-500">Role</label>
                    <p className="font-semibold text-gray-800">{job.jobTitle || "No Title"}</p>
                  </div>

                  {/* Company */}
                  <div className="md:col-span-3">
                    <label className="md:hidden text-xs font-semibold text-gray-500">Company</label>
                    <p className="text-sm text-gray-600">{job.company || "No Company"}</p>
                  </div>

                  {/* Duration */}
                  <div className="md:col-span-4">
                    <label className="md:hidden text-xs font-semibold text-gray-500">Duration</label>
                    <p className="text-sm text-gray-600">{`${startDate} – ${endDate}`}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="md:col-span-2 flex justify-end items-center gap-1">
                    <button type="button" onClick={() => handleOpenEditWorkExperience(index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-blue-600">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => removeItem('workExperience', index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-red-600">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Placeholder for when the list is empty */}
            {(!user.workExperience || user.workExperience.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No work experience added yet.</p>
            )}
          </div>
        </fieldset>

        {/* Section: Education */}
        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <legend className="text-xl font-semibold px-2">Education</legend>
            <button type="button" onClick={handleOpenAddEducation} className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm">
              <PlusIcon className="h-4 w-4" /> Add Education
            </button>
          </div>
          <div className="space-y-2">
            {/* Header Row - Only shows if there's education data */}
            {user.education && user.education.length > 0 && (
              <div className="hidden md:grid grid-cols-12 gap-4 px-3 pb-2 border-b">
                <div className="col-span-3"><h3 className="text-sm font-semibold text-gray-500">Qualification</h3></div>
                <div className="col-span-4"><h3 className="text-sm font-semibold text-gray-500">Institute & Course</h3></div>
                <div className="col-span-2"><h3 className="text-sm font-semibold text-gray-500">Score</h3></div>
                <div className="col-span-1"><h3 className="text-sm font-semibold text-gray-500">Year</h3></div>
                <div className="col-span-2"></div> {/* Spacer */}
              </div>
            )}

            {/* Education List */}
            {user.education?.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-center px-3 py-3 rounded-md hover:bg-gray-50/50 border-b md:border-none">
                {/* Qualification */}
                <div className="md:col-span-3">
                  <label className="md:hidden text-xs font-semibold text-gray-500">Qualification</label>
                  <p className="font-semibold text-gray-800">{edu.qualification || "Not specified"}</p>
                </div>

                {/* Institute & Course */}
                <div className="md:col-span-4">
                  <label className="md:hidden text-xs font-semibold text-gray-500">Institute & Course</label>
                  <p className="text-sm font-medium text-gray-700">{edu.institute || "Not specified"}</p>
                  {edu.stream && <p className="text-xs text-gray-500">{edu.stream}</p>}
                </div>

                {/* Score */}
                <div className="md:col-span-2">
                  <label className="md:hidden text-xs font-semibold text-gray-500">Score</label>
                  <p className="text-sm text-gray-600">{edu.score || "-"}</p>
                </div>

                {/* Year */}
                <div className="md:col-span-1">
                  <label className="md:hidden text-xs font-semibold text-gray-500">Year</label>
                  <p className="text-sm text-gray-600">{edu.year || "-"}</p>
                </div>

                {/* Action Buttons */}
                <div className="md:col-span-2 flex justify-end items-center gap-1">
                  <button type="button" onClick={() => handleOpenEditEducation(index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-blue-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => removeItem('education', index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Placeholder for when the list is empty */}
            {(!user.education || user.education.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No education details added yet.</p>
            )}
          </div>
        </fieldset>

        {/* Section: Certifications */}
        <fieldset className="p-6 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <legend className="text-xl font-semibold px-2">Certifications</legend>
            <button type="button" onClick={handleOpenAddCertification} className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm">
              <PlusIcon className="h-4 w-4" /> Add Certification
            </button>
          </div>
          <div className="space-y-2">
            {/* Header Row */}
            {user.certifications && user.certifications.length > 0 && (
              <div className="hidden md:grid grid-cols-12 gap-4 px-3 pb-2 border-b">
                <div className="col-span-5"><h3 className="text-sm font-semibold text-gray-500">Certificate Name</h3></div>
                <div className="col-span-4"><h3 className="text-sm font-semibold text-gray-500">Organization</h3></div>
                <div className="col-span-1"><h3 className="text-sm font-semibold text-gray-500">Year</h3></div>
                <div className="col-span-2"></div> {/* Spacer */}
              </div>
            )}

            {/* Certification List */}
            {user.certifications?.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-center px-3 py-3 rounded-md hover:bg-gray-50/50">
                <div className="md:col-span-5">
                  <p className="font-semibold text-gray-800">{cert.name || "Not specified"}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-gray-600">{cert.organization || "Not specified"}</p>
                </div>
                <div className="md:col-span-1">
                  <p className="text-sm text-gray-600">{cert.year || "-"}</p>
                </div>
                <div className="md:col-span-2 flex justify-end items-center gap-1">
                  <button type="button" onClick={() => handleOpenEditCertification(index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-blue-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => removeItem('certifications', index)} className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {(!user.certifications || user.certifications.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No certifications added yet.</p>
            )}
          </div>
        </fieldset>


        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-2.5 rounded-md shadow-lg transition-transform transform hover:scale-105">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <WorkExperienceModal
        isOpen={isWorkExperienceModalOpen}
        onClose={() => setIsWorkExperienceModalOpen(false)}
        onSave={handleSaveWorkExperience}
        experienceData={editingWorkExperience?.data}
      />

      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        onSave={handleSaveEducation}
        educationData={editingEducation?.data}
      />

      <CertificationsModal
        isOpen={isCertificationsModalOpen}
        onClose={() => setIsCertificationsModalOpen(false)}
        onSave={handleSaveCertification}
        certificationData={editingCertification?.data}
      />
    </div>
  );
}
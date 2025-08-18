"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from "../../lib/api";
import {
    UserIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon, EnvelopeIcon,
    PhoneIcon, MapPinIcon, PencilIcon, DocumentTextIcon, CheckBadgeIcon
} from '@heroicons/react/24/solid';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await api.get('/api/profile');
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    if (loading) return <div className="p-6 text-center">Loading Profile...</div>;
    if (!user) return <div className="p-6 text-center text-red-600">Could not load profile. Please try again.</div>;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-10 text-gray-800">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                <Link
                    href="/profile/edit"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
                >
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                </Link>
            </div>
            {/* Main Content Sections */}
            <div className="mt-8 space-y-8">

                {/* Basic Info now uses ProfileSection */}
                <ProfileSection title="Basic Information">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32 flex-shrink-0">
                            {user.profileImageUrl ? (
                                <Image
                                    src={user.profileImageUrl}
                                    alt={user.name}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full rounded-xl border"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl">
                                    <UserIcon className="w-16 h-16 text-gray-400" />
                                </div>
                            )}
                            <button type="button" className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border shadow-sm hover:bg-gray-100 transition" title="Edit Profile Image">
                                <PencilIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Name & Contact */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                            <div className="mt-4 space-y-2 text-sm">
                                <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600"><EnvelopeIcon className="w-4 h-4 text-gray-400" /> {user.email}</p>
                                <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600"><PhoneIcon className="w-4 h-4 text-gray-400" /> {user.phone || "Not provided"}</p>
                                <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600"><MapPinIcon className="w-4 h-4 text-gray-400" /> {user.city || "City not added"}</p>
                            </div>
                            <div className="mt-4">
                                {user.resumeUrl ? (
                                    <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"><DocumentTextIcon className="w-5 h-5" /> View Resume</a>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">No resume uploaded</p>
                                )}
                            </div>
                        </div>
                    </div>
                </ProfileSection>
                {/* Profile Summary */}
                <ProfileSection title="Profile Summary" icon={<UserIcon />}>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{user.profileSummary || "No summary provided."}</p>
                </ProfileSection>

                {/* Skills */}
                <ProfileSection title="Skills" icon={<SparklesIcon />}>
                    {user.skills?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{skill}</span>
                            ))}
                        </div>
                    ) : <p className="text-sm text-gray-500 italic">No skills added.</p>}
                </ProfileSection>

                {/* Work Experience */}
                <ProfileSection title="Work Experience" icon={<BriefcaseIcon />}>
                    {user.workExperience?.length > 0 ? (
                        <div className="space-y-6">
                            {user.workExperience.map((job, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="mt-1 bg-gray-100 p-2 rounded-full"><BriefcaseIcon className="w-4 h-4 text-gray-500" /></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{job.jobTitle || "Job Title"}</p>
                                        <p className="text-sm text-gray-600">{job.company || "Company Name"}</p>
                                        <p className="text-xs text-gray-400 mt-1">{job.startMonth} {job.startYear} – {job.endYear === 'Present' ? 'Present' : `${job.endMonth} ${job.endYear}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-gray-500 italic">No work experience added.</p>}
                </ProfileSection>

                {/* Education */}
                <ProfileSection title="Education" icon={<AcademicCapIcon />}>
                    {user.education?.length > 0 ? (
                        <div className="space-y-6">
                            {user.education.map((edu, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="mt-1 bg-gray-100 p-2 rounded-full"><AcademicCapIcon className="w-4 h-4 text-gray-500" /></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{edu.qualification}{edu.stream && ` in ${edu.stream}`}</p>
                                        <p className="text-sm text-gray-600">{edu.institute}</p>
                                        <p className="text-xs text-gray-400 mt-1">Graduated: {edu.year} {edu.score && `| Score: ${edu.score}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-gray-500 italic">No education added.</p>}
                </ProfileSection>

                {/* Certifications */}
                <ProfileSection title="Certifications" icon={<CheckBadgeIcon />}>
                    {user.certifications?.length > 0 ? (
                        <div className="space-y-4">
                            {user.certifications.map((cert, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="mt-1 bg-gray-100 p-2 rounded-full"><CheckBadgeIcon className="w-4 h-4 text-gray-500" /></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{cert.name}</p>
                                        <p className="text-sm text-gray-600">{cert.organization} - {cert.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-gray-500 italic">No certifications added.</p>}
                </ProfileSection>

                {/* Achievements */}
                <ProfileSection title="Achievements" icon={<SparklesIcon />}>
                    {user.achievements?.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {user.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                        </ul>
                    ) : <p className="text-sm text-gray-500 italic">No achievements added.</p>}
                </ProfileSection>
            </div>
        </div>
    );
}

// A reusable component for consistent section styling
const ProfileSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#0b0b0b] pb-2 mb-4">
            {title}
        </h2>
        <div>
            {children}
        </div>
    </section>
);
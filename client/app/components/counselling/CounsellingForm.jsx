"use client";
import { useState, useRef, useEffect } from 'react';
import { initiateIndividualBooking } from '../../../utils/api';
import { calculatePayableAmount } from '../../../utils/pricing';
import PayableAmountDisplay from "./PayableAmountDisplay"
import StudentSection from "./StudentSection";
import ProfessionalSection from "./ProfessionalSection";

const CounsellingForm = ({
    setStudentId,
    setStep,
    setErrors,
    errors,
    loading,
    setLoading,
    setPayableAmount
}) => {

    const payableAmount = calculatePayableAmount('individual');
    const emailRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", dob: "", city: "", userType: "",
        collegeName: "", branch: "", cgpa: "", graduationYear: "", backlogs: "",
        jobTitle: "", company: "", experienceYears: "", careerGoal: "",
        fieldOfInterest: "", expectationsFromCall: "", mode: "", dateOfCall: ""
    });

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    const formatDate = (date) => date.toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        if (!formData.userType) {
            setErrors({ general: "Please select whether you are a student or a working professional." });
            setLoading(false);
            return;
        }

        try {
            const res = await initiateIndividualBooking(formData);

            if (res.success) {
                setStudentId(res.data.studentId);
                setStep('PAYMENT');
            } else {
                if (res.error === "DUPLICATE_EMAIL") {
                    setErrors({ email: res.message });
                    emailRef.current?.focus();
                } else if (res.error === "DUPLICATE_PHONE") {
                    setErrors({ phone: res.message });
                } else if (res.error === "SLOTS_FULL") {
                    setErrors({ dateOfCall: res.message });
                } else {
                    setErrors({ general: res.message });
                }
            }
        } catch (err) {
            console.log(err);
            setErrors({ general: "Unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (setPayableAmount) {
            setPayableAmount(payableAmount);
        }
    }, [payableAmount, setPayableAmount]);

    return (
        <>
            <PayableAmountDisplay amount={payableAmount} />
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                {/* Full Name */}
                <div>
                    <label className="text-sm font-medium text-gray-700">FULL NAME<span className="text-red-500">*</span></label>
                    <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-700">EMAIL ADDRESS<span className="text-red-500">*</span></label>
                    <input
                        ref={emailRef}
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                    {errors?.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="text-sm font-medium text-gray-700">PHONE NUMBER<span className="text-red-500">*</span></label>
                    <input
                        name="phone"
                        type="tel"
                        pattern="[6-9]\d{9}"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                    {errors?.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="text-sm font-medium text-gray-700">DATE OF BIRTH<span className="text-red-500">*</span></label>
                    <input
                        name="dob"
                        type="date"
                        required
                        value={formData.dob || ""}
                        onChange={handleChange}
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* City */}
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">CURRENT CITY<span className="text-red-500">*</span></label>
                    <input
                        name="city"
                        type="text"
                        required
                        value={formData.city || ""}
                        onChange={handleChange}
                        placeholder="e.g. Bangalore, Hyderabad"
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* User Type */}
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">YOU ARE A<span className="text-red-500">*</span></label>
                    <select
                        name="userType"
                        required
                        value={formData.userType}
                        onChange={handleChange}
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Select --</option>
                        <option value="student">Student</option>
                        <option value="professional">Working Professional</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Conditional Sections */}
                {["student", "other"].includes(formData.userType) && (
                    <StudentSection formData={formData} handleChange={handleChange} />
                )}
                {formData.userType === "professional" && (
                    <ProfessionalSection formData={formData} handleChange={handleChange} />
                )}

                <div>
                    <label className="text-sm font-medium text-gray-700">Field of Interest</label>
                    <input
                        name="fieldOfInterest"
                        type="text"
                        value={formData.fieldOfInterest}
                        onChange={handleChange}
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g. Data Science"
                    />
                </div>

                {/* Expectations */}
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">WHAT ARE YOU EXPECTING FROM THIS CALL?<span className="text-red-500">*</span></label>
                    <textarea
                        name="expectationsFromCall"
                        value={formData.expectationsFromCall || ""}
                        onChange={handleChange}
                        rows="3"
                        required
                        placeholder="Share your doubts, goals or any specific help needed"
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Preferred Mode */}
                <div>
                    <label className="text-sm font-medium text-gray-700">PREFERRED MODE<span className="text-red-500">*</span></label>
                    <select
                        name="mode"
                        required
                        value={formData.mode}
                        onChange={handleChange}
                        className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Select --</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

                {/* Preferred Date */}
                <div>
                    <label className="text-sm font-medium text-gray-700">PREFERRED DATE<span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="dateOfCall"
                        required
                        value={formData.dateOfCall || ""}
                        onChange={handleChange}
                        min={formatDate(today)}
                        max={formatDate(maxDate)}
                        className="peer text-black w-full p-3 rounded border border-gray-300 mt-1 bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 appearance-none"
                    />
                </div>

                {/* Errors */}
                {errors?.general && (
                    <div className="col-span-2 text-red-600 text-sm mt-2">{errors.general}</div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                            } text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200 shadow-md`}
                    >
                        {loading ? "Proceeding..." : `Pay ₹${payableAmount} & Book Session`}
                    </button>
                    <p className="text-sm text-gray-500 mt-2">Payment will be processed via secure gateway.</p>
                </div>
            </form>
        </>
    );
};

export default CounsellingForm;
"use client";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import CounsellingForm from "../components/counselling/CounsellingForm";
import GroupCounsellingForm from "../components/counselling/GroupCounsellingForm";
import PaymentForm from "../components/counselling/PaymentForm";
import Link from "next/link";

export default function Counselling() {
    const [formType, setFormType] = useState("individual");
    const [step, setStep] = useState('FORM');
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [studentId, setStudentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [groupId, setGroupId] = useState(null);
    const [payableAmount, setPayableAmount] = useState(250);

    useEffect(() => {
        if (step === 'SUCCESS') {
            const timer = setTimeout(() => {
                setFormType("individual");
                setGroupId(null);
                setErrors({});
                setStudentId(null);
                setStep('FORM');
                setConfirmationMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto mb-8 bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden transition-all">
                <button
                    onClick={() => setPanelOpen(!panelOpen)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-yellow-50 border-b border-yellow-300 text-blue-900 font-semibold text-lg focus:outline-none"
                >
                    <span>⚠️ Must Read Before Booking</span>
                    {panelOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-700" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-700" />
                    )}
                </button>

                {panelOpen && (
                    <div className="p-8 bg-white transition-all duration-300 ease-in-out">
                        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">
                            Book Your Counselling Call at ₹250
                        </h1>

                        <p className="text-gray-700 text-justify mb-4 leading-relaxed">
                            This <strong>30–40 minute paid session</strong> is designed to give you absolute clarity about studying in Germany. We’ll cover:
                        </p>

                        <ul className="list-disc text-gray-800 pl-5 mb-6 space-y-2">
                            <li>Why Germany stands out for education, research, and global career pathways</li>
                            <li>What our consultancy offers — from university selection to post-admission support</li>
                            <li>Your goals, academic profile, and how it fits into the German system</li>
                            <li>Cost of living, realistic budgets, visa eligibility, and financial planning</li>
                        </ul>

                        <p className="text-gray-700 text-justify mb-4 leading-relaxed">
                            This session is <strong>not a generic sales pitch</strong> — it's a strategic consultation for focused students. If you're not serious, or intend to use <span className="text-red-600 font-semibold">fake documents or shortcuts</span>, your booking will be rejected <strong>without refund</strong>.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-blue-900 mb-2">📅 Booking Timeline & Semester Planning</h2>
                            <p className="text-gray-700 mb-3 leading-relaxed">
                                Germany primarily has two academic intakes — <strong>Winter Semester (October)</strong> and <strong>Summer Semester (April)</strong>.
                            </p>
                            <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
                                <li>
                                    <strong>Winter Semester 2025:</strong> Deadlines between <span className="text-blue-700 font-medium">May and July 15, 2025</span>. If aiming for this, you must book before <span className="text-red-600 font-semibold">July 10</span>.
                                </li>
                                <li>
                                    <strong>Summer Semester 2026:</strong> Great for those needing more prep time. Applications open in <span className="text-blue-700 font-medium">October</span> and close by <span className="text-blue-700 font-medium">early January</span>.
                                </li>
                            </ul>
                            <p className="text-gray-700">
                                Not sure which intake suits you best? That’s exactly what we’ll figure out during the call — based on your goals and academic history.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-0">

                {step === 'SUCCESS' && (
                    <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-md text-center shadow">
                        <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
                        <p>{confirmationMessage}</p>
                        <p className="mt-2 text-sm text-gray-600">You'll receive session details via email soon.</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <Link
                                href="/"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition text-sm font-medium"
                            >
                                Back to Home
                            </Link>

                            <Link
                                href="/contact"
                                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded transition text-sm font-medium"
                            >
                                Need Help?
                            </Link>
                        </div>
                    </div>
                )}

                {step === 'PAYMENT' && (
                    <PaymentForm
                        id={formType === "group" ? groupId : studentId}
                        isGroup={formType === "group"}
                        amount={payableAmount}
                        setConfirmationMessage={setConfirmationMessage}
                        setStep={setStep}
                    />
                )}

                {step === 'FORM' && (
                    <>
                        {/* -- Radio Buttons -- */}
                        <div className="max-w-2xl text-left text-black">
                            <label className="block font-medium mb-2 text-lg">Choose Counselling Type</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="counsellingType" value="individual" checked={formType === "individual"} onChange={() => setFormType("individual")} className="accent-pink-600" />
                                    <span>Individual</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="counsellingType" value="group" checked={formType === "group"} onChange={() => setFormType("group")} className="accent-blue-600" />
                                    <span>Group</span>
                                </label>
                            </div>
                        </div>

                        {/* -- The Forms -- */}
                        {formType === 'individual' && (
                            <CounsellingForm
                                setStudentId={setStudentId}
                                setStep={setStep}
                                setErrors={setErrors}
                                errors={errors}
                                loading={loading}
                                setLoading={setLoading}
                                setPayableAmount={setPayableAmount}
                            />
                        )}
                        {formType === 'group' && (
                            <GroupCounsellingForm
                                setGroupId={setGroupId}
                                setStep={setStep}
                                setErrors={setErrors}
                                errors={errors}
                                loading={loading}
                                setLoading={setLoading}
                                setPayableAmount={setPayableAmount}
                            />
                        )}
                    </>
                )}

            </div>



            {
                showPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm p-4">
                        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl bg-blue-50 border border-blue-200 rounded-xl shadow-2xl p-6 sm:p-8">

                            {/* Close Button */}
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-3 right-4 text-blue-600 hover:text-blue-800 text-2xl"
                                aria-label="Close"
                            >
                                &times;
                            </button>

                            {/* Content */}
                            <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                                📅 Booking Timeline & Semester Planning
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                                Germany primarily has two academic intakes — <strong>Winter Semester (October)</strong> and <strong>Summer Semester (April)</strong>.
                            </p>

                            <ul className="list-disc list-inside text-sm sm:text-base text-gray-800 space-y-2 mb-4">
                                <li>
                                    <strong>Winter Semester 2025:</strong> Deadlines between <span className="text-blue-700 font-medium">May and July 15, 2025</span>. If aiming for this, you must book before <span className="text-red-600 font-semibold">July 10</span>.
                                </li>
                                <li>
                                    <strong>Summer Semester 2026:</strong> Great for those needing more prep time. Applications open in <span className="text-blue-700 font-medium">October</span> and close by <span className="text-blue-700 font-medium">early January</span>.
                                </li>
                            </ul>

                            <p className="text-sm sm:text-base text-gray-700">
                                Not sure which intake suits you best? That’s exactly what we’ll figure out during the call — based on your goals and academic history.
                            </p>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
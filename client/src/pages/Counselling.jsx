import { useState, useRef } from "react";
import { initiateBooking } from "../utils/api";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import CounsellingForm from "../components/counselling/CounsellingForm";
import PaymentForm from "../components/counselling/PaymentForm";

export default function Counselling() {
    const dateRef = useRef(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPaymentUI, setShowPaymentUI] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        fieldOfIntrest: "",
        academicBackground: "",
        expectationsFromcall: "",
        mode: "",
        dateOfCall: ""
    });

    const emailRef = useRef(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg("");
        setLoading(true);

        try {
            const res = await initiateBooking(formData);

            if (res.success) {
                setStudentId(res.data.studentId);
                setLoading(false);
                setShowPaymentUI(true);
            } else {
                if (res.error === "DUPLICATE_EMAIL") {
                    setErrors({ email: res.message });
                    emailRef.current?.focus();
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
            {successMsg ? (
                <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-md text-center shadow">
                    <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
                    <p>{successMsg}</p>
                    <p className="mt-2 text-sm text-gray-600">You'll receive session details via email soon.</p>
                </div>
            ) : showPaymentUI ? (
                <PaymentForm
                    studentId={studentId}
                    dateOfCall={formData.dateOfCall}
                    setFormData={setFormData}
                    setSuccessMsg={setSuccessMsg}
                    setShowPaymentUI={setShowPaymentUI}
                />

            ) : (
                <CounsellingForm
                    formData={formData}
                    setFormData={setFormData}
                    emailRef={emailRef}
                    errors={errors}
                    loading={loading}
                    onSubmit={handleFormSubmit}
                />
            )
            }

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

import { useState, useRef } from "react";
import { initiateBooking, confirmBooking } from "../utils/api";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import imageCompression from 'browser-image-compression';

export default function Counselling() {

    const dateRef = useRef(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showPaymentUI, setShowPaymentUI] = useState(false);
    const [loading, setLoading] = useState(false);
    const [txnId, setTxnId] = useState("");
    const [errors, setErrors] = useState({});
    const emailRef = useRef(null);
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
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg("");
        setLoading(true);

        try {
            const res = await initiateBooking(formData);

            if (res.success) {
                setStudentId(res.data.studentId);
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

    const handleConfirmPayment = async () => {


        if (!studentId || !formData.dateOfCall || !txnId.trim()) {
            setErrors({ general: "All fields are required." });
            return;
        }

        try {
            setLoading(true);

            const screenshotForm = new FormData();
            const compressedFile = await imageCompression(screenshot, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1080,
                useWebWorker: true,
            });
            screenshotForm.append("screenshot", compressedFile);
            const start = performance.now();
            const uploadRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload-screenshot`, {
                method: "POST",
                body: screenshotForm,
            });

            const uploadData = await uploadRes.json();

            const end = performance.now();
            console.log(`⏱️ Screenshot upload time: ${(end - start).toFixed(2)} ms`);

            if (!uploadData.url) {
                throw new Error("Screenshot upload failed.");
            }

            const res = await confirmBooking({
                studentId,
                txnId: txnId,
                screenshotUrl: uploadData.url,
                dateOfCall: formData.dateOfCall,
            });

            const end1 = performance.now();
            console.log(`⏱️ Total time: ${(end1 - start).toFixed(2)} ms`);

            if (res.success) {
                setShowPaymentUI(false);
                setSuccessMsg(res.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    fieldOfIntrest: "",
                    academicBackground: "",
                    expectationsFromcall: "",
                    mode: "",
                    dateOfCall: "",
                });
                setTxnId("");
            } else {
                setErrors({ general: res.message });
            }
        } catch (err) {
            setErrors({ general: "Payment confirmation failed." });
        } finally {
            setLoading(false);
        }
    };


    const handleCopy = () => {
        navigator.clipboard.writeText("systech@upi");
        setCopied(true);
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
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        🧾 Pay ₹250 to Book Your Session
                    </h2>

                    <div className="mb-4">
                        <img
                            src="/qr-code.png"
                            alt="QR Code"
                            className="mx-auto w-48 h-48 rounded-md border"
                        />
                        <div className="mt-3">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                <span className="font-medium">UPI ID:</span>
                                <span
                                    className="font-mono text-pink-600 cursor-pointer select-all"
                                    onClick={handleCopy}
                                >
                                    systech@upi
                                </span>
                                <ClipboardDocumentIcon
                                    className="w-5 h-5 text-gray-500 hover:text-pink-600 cursor-pointer"
                                    onClick={handleCopy}
                                />
                            </div>

                            {copied && (
                                <div className="mt-1 text-green-600 text-xs flex justify-center items-center gap-1">
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Copied to clipboard
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Scan the QR or use UPI ID to pay ₹250 from any UPI app.
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 text-left">
                        <label
                            htmlFor="txnId"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Transaction ID / Reference Number
                        </label>
                        <input
                            type="text"
                            id="txnId"
                            value={txnId}
                            onChange={(e) => setTxnId(e.target.value)}
                            placeholder="Enter Transaction ID"
                            className="text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>

                    <div className="mt-4 text-left">
                        <label
                            htmlFor="screenshot"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Upload Payment Screenshot <span className="text-gray-500">(Max 750KB)</span>
                        </label>
                        <input
                            type="file"
                            id="screenshot"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.size > 750 * 1024) {
                                    alert("File size exceeds 750KB. Please upload a smaller file.");
                                    e.target.value = null;
                                    return;
                                }
                                setScreenshot(file);
                            }}
                            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 cursor-pointer"
                            required
                        />
                    </div>

                    <button
                        onClick={handleConfirmPayment}
                        disabled={!txnId || !screenshot || loading}
                        className={`mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Processing..." : "Confirm & Finalize Booking"}
                    </button>

                    <p className="text-xs text-gray-500 mt-3">
                        We'll verify your payment and send a confirmation via email.
                    </p>
                </div>



            ) :
                (
                    <form
                        onSubmit={handleFormSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                    >
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                FULL NAME (AS PER GOVERNMENT ID)<span className="text-red-500">*</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your full name"
                            />
                        </div >

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                EMAIL ADDRESS<span className="text-red-500">*</span>
                            </label>
                            <input
                                ref={emailRef}
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                placeholder="name@gmail.com"
                            />
                            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Phone Number<span
                                    className="text-red-500">*</span>
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Field of Interest</label>
                            <input
                                name="fieldOfIntrest"
                                type="text"
                                value={formData.fieldOfIntrest}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                placeholder="e.g. Data Science"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Academic Background<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="academicBackground"
                                rows="3"
                                required
                                value={formData.academicBackground}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                placeholder="Mention your degree, GPA, experience..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">What are you expecting from the call?</label>
                            <textarea
                                name="expectationsFromcall"
                                rows="3"
                                value={formData.expectationsFromcall}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Preferred Mode<span className="text-red-500">*</span></label>
                            <select
                                name="mode"
                                required
                                value={formData.mode}
                                onChange={handleChange}
                                className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">-- Select Mode --</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 relative">
                            <label className="text-sm font-medium text-gray-700">
                                Preferred Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfCall"
                                required
                                value={formData.dateOfCall}
                                onChange={handleChange}
                                min={formatDate(today)}
                                max={formatDate(maxDate)}
                                className="peer text-black w-full p-3 rounded border border-gray-300 mt-1 bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 appearance-none"
                            />

                            {!formData.dateOfCall && (
                                <span className="md:hidden absolute left-3 top-[49px] text-gray-400 text-sm pointer-events-none peer-focus:hidden sm:text-base">
                                    Select a date
                                </span>
                            )}
                        </div>

                        {
                            errors.general && (
                                <div className="col-span-2 text-red-600 text-sm mt-2">{errors.general}</div>
                            )
                        }

                        <div className="md:col-span-2 text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                                    } text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200 shadow-md`}
                            >
                                {loading ? "Proceeding..." : "Pay ₹250 & Book Session"}
                            </button>
                            <p className="text-sm text-gray-500 mt-2">
                                Payment will be processed via secure gateway.
                            </p>
                        </div>
                    </form >
                )
            }

            {
                showPopup && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/20 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative border border-gray-200">
                            <button
                                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                                onClick={() => setShowPopup(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-semibold text-blue-900 mb-3">📅 Booking Timeline & Semester Planning</h2>
                            <p className="text-gray-700 mb-3 leading-relaxed">
                                Germany has two major intakes — <strong>Winter (Oct)</strong> and <strong>Summer (Apr)</strong>. If you're targeting Winter Semester 2025, <span className="text-red-600 font-semibold">book your counselling before July 10</span>.
                            </p>
                            <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
                                <li><strong>Winter Semester 2025:</strong> Deadlines range from <span className="text-blue-700 font-medium">May to July 15</span>.</li>
                                <li><strong>Summer Semester 2026:</strong> Apply between <span className="text-blue-700 font-medium">October and January</span>.</li>
                            </ul>
                            <p className="text-gray-700 text-sm">
                                We'll help you plan a personalized timeline during the call.
                            </p>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

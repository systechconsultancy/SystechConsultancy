import { useState } from 'react'
import { confirmBooking } from "../../utils/api";
import { ClipboardDocumentIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import imageCompression from 'browser-image-compression';

const PaymentForm = ({ studentId, dateOfCall, setFormData, setSuccessMsg, setShowPaymentUI }) => {
    const [txnId, setTxnId] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleConfirmPayment = async () => {

        setLoading(true);

        if (!studentId || !dateOfCall || !txnId.trim()) {
            setLoading(false);
            setErrors({ general: "All fields are required." });
            return;
        }

        try {
            const screenshotForm = new FormData();
            const compressedFile = await imageCompression(screenshot, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1080,
                useWebWorker: true,
            });
            screenshotForm.append("screenshot", compressedFile);
            const uploadRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload-screenshot`, {
                method: "POST",
                body: screenshotForm,
            });

            const uploadData = await uploadRes.json();

            if (!uploadData.url) {
                throw new Error("Screenshot upload failed.");
            }

            const res = await confirmBooking({
                studentId,
                txnId: txnId,
                screenshotUrl: uploadData.url,
                dateOfCall: dateOfCall,
            });

            if (res.success) {
                setLoading(false);
                setSuccessMsg(res.message);
                setShowPaymentUI(false);
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
            console.error("Payment error:", err);
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
                        if (!file) return;
                        if (!["image/png", "image/jpeg"].includes(file.type)) {
                            alert("Only PNG or JPG files are allowed.");
                            e.target.value = null;
                            return;
                        }
                        if (file.size > 750 * 1024) {
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

            {
                errors.general && (
                    <div className="col-span-2 text-red-600 text-sm mt-2">{errors.general}</div>
                )
            }

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
    )
}

export default PaymentForm
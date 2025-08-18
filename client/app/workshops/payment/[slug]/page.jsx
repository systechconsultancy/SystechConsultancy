"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import api from "../../../../lib/api";

export default function WorkshopPaymentPage() {
  const [workshop, setWorkshop] = useState(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const [txnId, setTxnId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const fileInputRef = useRef(null);

  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    async function fetchWorkshopDetails() {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops/${slug}`);
        if (!response.ok) throw new Error('Workshop not found.');
        const data = await response.json();
        setWorkshop(data);

        const statusRes = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops/${data._id}/registration-status`);
        if (statusRes.data.isRegistered) {
          setIsAlreadyRegistered(true);
        }

        // Fetch the QR code based on the workshop's fee
        const qrRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment-qr/${data.fee}`);
        if (!qrRes.data.success) throw new Error("QR not found for this amount.");
        setQrUrl(qrRes.data.data.url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshopDetails();
  }, [slug]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setError("Only valid PNG or JPG images are allowed.");
      e.target.value = null;
      return;
    }

    if (file.size > 750 * 1024) {
      setError("File size exceeds 750KB. Please upload a smaller file.");
      e.target.value = null;
      return;
    }

    setError('');
    setScreenshot(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!txnId || !screenshot) {
      setError('Please provide both a transaction ID and a screenshot.');
      return;
    }
    setStatus('submitting');
    setError('');

    try {
      // 1. Compress and Upload Screenshot
      let compressedFile;
      try {
        compressedFile = await imageCompression(screenshot, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1080,
          useWebWorker: true,
        });

        if (compressedFile.size > 750 * 1024) {
          throw new Error("Compressed file too large.");
        }

        // continue upload...
      } catch (err) {
        setErrors({ general: "Image compression failed or file is too large." });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("screenshot", compressedFile);
      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload-screenshot`, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.url) throw new Error("Screenshot upload failed.");

      // 2. Confirm Registration
      await api.post(`/api/workshops/${workshop._id}/confirm-registration`, {
        txnId,
        screenshotUrl: uploadData.url,
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading payment details...</div>;
  if (error && !workshop) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  if (isAlreadyRegistered) {
    return (
      <div className="text-center p-8 text-black">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">You Are Already Registered!</h2>
        <p className="text-gray-600 mt-2">You have already confirmed your spot for "{workshop?.title}".</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center p-8 text-black">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Registration Confirmed!</h2>
        <p className="text-gray-600 mt-2">You have successfully registered for "{workshop?.title}". A confirmation email will be sent shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-black">
      <h1 className="text-2xl font-bold text-center">Confirm Your Spot</h1>
      <p className="text-center text-gray-600 mt-1">for "{workshop?.title}"</p>

      <div className="my-6 text-center">
        <p className="text-sm text-gray-500">Total Amount</p>
        <p className="text-4xl font-bold text-blue-600">₹{workshop?.fee}</p>
      </div>

      {qrUrl && (
        <div className="mb-6 flex flex-col items-center">
          <Image src={qrUrl} alt="Payment QR Code" width={200} height={200} className="rounded-md border" />
          <p className="text-xs text-gray-500 mt-2">Scan to pay using any UPI app.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Transaction ID</label>
          <input type="text" value={txnId} onChange={(e) => setTxnId(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Payment Screenshot</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            required
          />
        </div>
        <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
          {status === 'submitting' ? 'Confirming...' : 'Confirm Registration'}
        </button>
        {status === 'error' && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
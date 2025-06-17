
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const initiateBooking = async (studentData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/initiate`, studentData);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const confirmBooking = async ({ studentId, dateOfCall, txnId, screenshotUrl }) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/confirm`, { studentId, dateOfCall, txnId, screenshotUrl });
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFullBookingDates = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/bookings/full-dates`);
    return res.data;
  } catch (error) {
    return [];
  }
};

function handleApiError(error) {

  if (error.response?.data) {
    return {
      success: false,
      message: error.response.data.message || "Unexpected error occurred.",
      error: error.response.data.error || "UNKNOWN",
    };
  }


  return {
    success: false,
    message: "Something went wrong. Please check your internet connection.",
    error: "NETWORK_OR_UNKNOWN",
  };
}
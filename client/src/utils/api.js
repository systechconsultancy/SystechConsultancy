import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// INDIVIDUAL BOOKING
export const initiateIndividualBooking = async (studentData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/individual/initiate`, studentData);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const confirmIndividualBooking = async ({ studentId, txnId, screenshotUrl, amount }) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/individual/confirm`, {
      studentId,
      txnId,
      screenshotUrl,
      amount,
    });
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// GROUP BOOKING
export const initiateGroupBooking = async ({ students, date, mode }) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/group/initiate`, {
      students,
      date,
      mode,
    });
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const confirmGroupBooking = async ({ groupId, txnId, screenshotUrl, amount }) => {
  try {
    const res = await axios.post(`${API_BASE}/api/bookings/group/confirm`, {
      groupId,
      txnId,
      screenshotUrl,
      amount,
    });
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// COMMON
export const getFullBookingDates = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/bookings/full-dates`);
    return res.data;
  } catch (error) {
    return [];
  }
};

// ERROR HANDLER
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

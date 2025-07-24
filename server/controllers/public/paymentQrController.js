import QrPaymentUrl from "../../models/QrPaymentUrl.js";

export const getQrByAmount = async (req, res) => {
  try {
    const { amount } = req.params;
    const qr = await QrPaymentUrl.findOne({ amount });

    if (!qr) {
      return res.status(404).json({ success: false, message: "QR not found for this amount." });
    }

    res.status(200).json({ success: true, data: qr });
  } catch (err) {
    console.error("QR Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
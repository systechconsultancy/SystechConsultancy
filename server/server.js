import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import qrRoutes from "./routes/paymentQrRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "https://systechconsultancy.in",
    "https://www.systechconsultancy.in",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

connectDB();

app.use("/api/bookings", bookingRoutes);
app.use('/api', uploadRoutes);
app.use("/api/payment-qr", qrRoutes);


app.get('/', (req, res) => {
    res.send('ERROR 404 : URL NOT FOUND');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

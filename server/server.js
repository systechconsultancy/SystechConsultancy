import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/public/bookingRoutes.js";
import uploadRoutes from './routes/public/uploadRoutes.js';
import qrRoutes from "./routes/public/paymentQrRoutes.js";
import adminAuthRoute from "./routes/admin/adminAuthRoutes.js";
import adminWorkshopRoutes from "./routes/admin/adminWorkshopRoutes.js";
import publicWorkshopRoutes from "./routes/public/publicWorkshopRoutes.js";


dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "https://systechconsultancy.in",
    "https://www.systechconsultancy.in",
    "https://admin.systechconsultancy.in",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

//Public routes
app.use("/api/bookings", bookingRoutes);
app.use('/api', uploadRoutes);
app.use("/api/payment-qr", qrRoutes);
app.use("/api/workshops", publicWorkshopRoutes);

//Admin Routes
app.use("/api/admin", adminAuthRoute);
app.use("/api/admin/workshops", adminWorkshopRoutes);


app.get('/', (req, res) => {
    res.send('ERROR 404 : URL NOT FOUND');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

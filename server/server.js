import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookings.js";
import uploadRoutes from './routes/uploadRoutes.js';

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


app.get('/', (req, res) => {
    res.send('Testing');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

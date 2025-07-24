import cloudinary from "../../config/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadScreenshot = async (req, res) => {
  try {
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "counselling_receipts",
      use_filename: true,
      unique_filename: false,
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({ message: "Screenshot upload failed." });
  }
};

export { uploadScreenshot, upload };

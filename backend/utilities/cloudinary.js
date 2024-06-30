import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File not uploaded");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "communities", // Specify your folder name
      transformation: [
        { height: 300, width: 300, crop: "fit", quality: "auto:eco" }, // Resize and set quality to 'auto:eco' for efficient compression
      ],
    });

    // You can now save result.secure_url to your database
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary: ", error);
    throw new Error("Error uploading file");
  }
};

export default uploadToCloudinary;

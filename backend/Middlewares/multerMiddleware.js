// multerUtility.js
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage }).single("image"); // Update field name to match frontend

export const multerUploadFile = (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(500).json({ message: "Multer error", error });
    } else if (error) {
      return res.status(500).json({ message: "Unknown error", error });
    }

    next();
  });
};

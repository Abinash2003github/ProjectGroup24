import path from "path";
// Create a helper function to mimic __dirnam
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../../public/temp/");
console.log("uploadPath:", uploadPath);

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract original extension (e.g., .jpg)
    const sanitizedName = file.originalname // Sanitize the filename (remove spaces/special characters)
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9\-.]/g, "") // Remove special characters
      .replace(ext, ""); // Remove extension from the name

    const finalName = `${sanitizedName}-${Date.now()}${ext}`;

    cb(null, finalName);
  },
});

export const upload = multer({ storage });

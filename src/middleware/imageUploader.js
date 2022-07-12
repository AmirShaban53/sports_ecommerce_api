import multer from "multer";
import DataURIParser from "datauri/parser";
import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else {
    cb(new Error("only images are allowed"), false);
  }
};

const imageUpload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 3 },
  fileFilter: fileFilter,
}).array("images");

const parser = new DataURIParser();

const dataUri = async (image) => {
  try {
    const img = await parser.format(
      path.extname(image.originalname).toString(),
      image.buffer
    );
    return img.content;
  } catch (error) {}
};

export { imageUpload, dataUri };

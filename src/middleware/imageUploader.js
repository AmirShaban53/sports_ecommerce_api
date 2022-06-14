import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

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

export default imageUpload;

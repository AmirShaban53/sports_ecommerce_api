import { v2,  } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export const cloudinaryConfig = (req, res, next) => {
  
  v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  next();
};

export const uploader = v2.uploader
// export v2.uploader as upload

// export { cloudinaryConfig, v2.uploader as uploader };

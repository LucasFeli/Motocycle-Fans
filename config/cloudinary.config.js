require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'MotocycleFans',
    format: async (req, file) => {
      'mp4', 'jpg', 'png', 'pdf'
    }, 
    public_id: (req, file) => (
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    ),
  },
  
});


const fileParser = multer({storage})

module.exports = fileParser
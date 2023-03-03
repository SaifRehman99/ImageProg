import multer from 'multer';
import path from 'path';




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/"));
    },
    filename: function (req, file, cb) {
      const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
      cb(null, file.originalname);
    },
  });


const multerFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  };





const uploadPhoto = multer({
  storage: storage,
  fileFilter : multerFilter,
  limits: { fileSize: 3000000 }
});



export default uploadPhoto;
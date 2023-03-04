import multer from "multer";
import path from "path";

/**
 * This is a Basic Multer Configuration ( Helper for Image Upload Via Nodejs Server )
 **/




const storage = multer.diskStorage({

    // Destination to save file
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/"));
    },


    // If you make any changes to the filename
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        //   cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
        cb(null, file.originalname);
    },
});



// Multer filter, so that not other than image can be uploaded

const multerFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};


// Summarized into this
const uploadPhoto = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 3000000 },
});



export default uploadPhoto;
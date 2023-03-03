import express, {Router} from 'express';
import uploadPhoto from '../utils/multer'
const router: Router = express.Router();


import {getAllImages, uploadImages} from "../controllers/Image.controller"


router.route('/').get(getAllImages).post(uploadPhoto.single("file"),uploadImages)



export default router;
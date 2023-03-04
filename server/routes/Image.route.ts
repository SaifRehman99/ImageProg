import express, {Router} from 'express';
import uploadPhoto from '../utils/multer'
import {getAllImages, uploadImages} from "../controllers/Image.controller"


const router: Router = express.Router();


/**
 * Exporting all the routes below
 **/


// this is a same route with different method, chaining it here
router.route('/').get(getAllImages).post(uploadPhoto.single("file"),uploadImages)



export default router;
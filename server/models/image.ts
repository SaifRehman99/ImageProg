import mongoose from "mongoose";
import {IImage} from "../types/Image"

  
/**
 * Image schema 
 **/


const ImageSchema = new mongoose.Schema<IImage>({

    name : {
        type : String,
        required: true,
    },
    image : {
        type : String,
        required: true,
    }

})

export default mongoose.model('Image', ImageSchema);
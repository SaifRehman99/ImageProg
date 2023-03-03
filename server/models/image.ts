import mongoose from "mongoose";


interface IImage {
    name  : string;
    image : string
  }


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
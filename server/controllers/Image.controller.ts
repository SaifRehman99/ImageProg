import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Image from "../models/image";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import {UploadType} from "../types/Image"
import fs from "fs";




// @desc      Get All Images [ Filter via name & Pagination ]
// @route     GET /api/v1/image
// @access    Public
export const getAllImages = asyncHandler(async (req:any, res:any) => {


    
    /**
     * ===================== We can also use cloudinary for getting the images ====================== 
     **/

    // https://cloudinary.com/documentation/admin_api#get_resources
    // https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-
    // const options = {prefix:'file-upload', type:"upload", max_results:500};
    
    

    //   try {
    //       // Get details about the asset
    //       const result = await cloudinary.api.resources(options)
    //       console.log(result);
    //       return res.status(200).json({ success:true, data : { images : result} });

    //       } catch (error) {
    //       console.error(error);
    //   }


    // =================================================================================================  //

    try {

        const {name, limit, page} = req.query;

        const queryObject:{name?:any} = {};


        // if name, creating the chain
        if(name){
            queryObject.name = {$regex:name, $options:"i"};
        }



       let result =  Image.find(queryObject);


        // below responsible for pagination

       const currentPage = Number(page) || 1;
       const Limit = Number(limit) || 10;
       const skip  = Number((currentPage - 1 ) * Limit);
        

       result = result.skip(skip).limit(Limit)

       const images = await result;
       const count = await Image.countDocuments(queryObject)

       const totalPages = Math.ceil(count / Limit);
       const nextPage   = (currentPage + 1) > totalPages ? null : (currentPage + 1);

       
       return res.status(200).json({ success:true, data : images, meta:{ 
        totalPages,
        currentPage,
        nextPage 
       } });

        
    } catch (error:any) {
        throw new Error(error)
    }

})




// @desc      Upload Image
// @route     POST /api/v1/image
// @access    Public
export const uploadImages = async (req:Request, res:Response) => {

    const path: string = (req.file?.path) as string;
    const name:string = req.file?.originalname as string;


    try {
        
    const upload : UploadType = cloudinary.uploader.upload;



    const result:UploadApiResponse = await upload(path,
        {
          use_filename: true,
          folder: 'file-upload',
        })

    
    const response = await Image.create({
        name,
        image : result.secure_url
    })
       
      fs.unlinkSync(path);
      return res.status(200).json({ success:true, data : response });
    } catch (error:any) {
        throw new Error(error)
    }
    
}
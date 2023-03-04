import { UploadApiOptions, UploadApiResponse, UploadResponseCallback } from "cloudinary";

/**
 * This is Interface Folder, where we can manage all interfaces
 **/


interface UploadType {
    (file: string, options?: UploadApiOptions | undefined, callback?: UploadResponseCallback | undefined): Promise<UploadApiResponse>;
    (file: string, callback?: UploadResponseCallback | undefined): Promise<any>;
};



interface IImage {
    name  : string;
    image : string
  }



exports = {UploadType, IImage}
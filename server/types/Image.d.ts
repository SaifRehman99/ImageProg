import { UploadApiOptions, UploadApiResponse, UploadResponseCallback } from "cloudinary";

interface UploadType {
    (file: string, options?: UploadApiOptions | undefined, callback?: UploadResponseCallback | undefined): Promise<UploadApiResponse>;
    (file: string, callback?: UploadResponseCallback | undefined): Promise<any>;
};



exports = {UploadType}
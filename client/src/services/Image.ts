import { AxiosResponse } from "axios";
import request from "../utils/axios-request";

export const getAllImages = ({name, page = 1} : { name?: string; page?: number | string  }): Promise<AxiosResponse> => {

    return request("get", `api/v1/image${name ? `?name=${name}&page=${page}` : `?page=${page}`}`);
};

export const uploadImage = (image: FormData): Promise<AxiosResponse> => request("post", "api/v1/image", "", image);

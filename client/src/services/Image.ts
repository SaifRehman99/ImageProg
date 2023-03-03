import { AxiosResponse } from 'axios';
import request from '../utils/axios-request';


export const getAllImages = (): Promise<AxiosResponse> =>
    request(
        'get',
        'api/v1/image'
    );

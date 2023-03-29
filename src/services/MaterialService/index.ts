import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../../api";
import { IMaterial } from "../../models/Material";
import { FileParams, PostParams } from "./materialParams";

export default class MaterialService {
    static fetch = (depId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IMaterial[]>> => {
        return api.get<IMaterial[]>(`/dep_${depId}/content/data`, config);
    };
    static fetchFile = ({ depId, fileName }: FileParams, config?: AxiosRequestConfig): Promise<AxiosResponse<Blob>> => {
        return api.get<Blob>(`/dep_${depId}/content/data/${fileName}`, {
            responseType: "blob",
            headers: { "Content-Type": "application/octet-stream" },
            ...config,
        });
    };
    static delete = ({ depId, fileName }: FileParams, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return api.delete<void>(`/dep_${depId}/content/data/${fileName}`, config);
    };
    static post = (
        { depId, file }: PostParams,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> => {
        return api.post(`/dep_${depId}/content/data`, file, config);
    };
}

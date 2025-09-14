import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "../constants";
import type { KeyStringObject } from "../types/types";
import i18n from "../features/lang/i18n";
import { tryRefreshAccessToken } from "../features/auth/authUtils";

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        config.headers["Accept-Language"] = i18n.language.toLowerCase();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["Accept-Language"] = i18n.language.toLowerCase();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const toQueryString = (params: KeyStringObject) => {
    let queryString = Object.keys(params)
        .map((key) => {
            if (params[key]) {
                let valueString = params[key].toString();
                if (params[key] instanceof Array) {
                    valueString = params[key]
                        .map((value) => {
                            return `${value}`;
                        })
                        .join(",");
                }
                return `${key}=${valueString}`;
            }
        })
        .join("&");
    return queryString !== "" ? "?" + queryString : "";
};

const getApi = (auth = true): AxiosInstance => (auth ? authApi : api);

const getPath = ({
    path,
    key = "",
    queryParams = {},
}: {
    path: string;
    key?: string | number;
    queryParams?: KeyStringObject;
}) => {
    key = key !== "" ? key.toString() + "/" : "";
    return `${path}${key}${toQueryString(queryParams)}`;
};

interface ApiFuncParams {
    path: string;
    key?: string | number;
    queryParams?: KeyStringObject;
    data?: {};
    log?: string;
    auth?: boolean;
}

const apiCall = async (
    callMethod: string,
    {
        path = "",
        key = "",
        queryParams = {},
        data = {},
        log = "",
        auth = true,
    }: ApiFuncParams
): Promise<any> => {
    try {
        if (auth) {
            await tryRefreshAccessToken();
        }
        const config: AxiosRequestConfig<any> = {
            method: callMethod,
            url: getPath({ path, key, queryParams }),
            data,
        };
        if (data instanceof FormData) {
            config.headers = {
                "Content-Type": "multipart/form-data",
            };
        }
        const response = await getApi(auth)(config);
        console.log((log ? log : callMethod) + ":", response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const fetchData = (params: ApiFuncParams): Promise<any> => {
    return apiCall("get", params);
};
export const postData = (params: ApiFuncParams): Promise<any> => {
    return apiCall("post", params);
};
export const patchData = (params: ApiFuncParams): Promise<any> => {
    return apiCall("patch", params);
};
export const deleteData = (params: ApiFuncParams): Promise<any> => {
    return apiCall("delete", params);
};

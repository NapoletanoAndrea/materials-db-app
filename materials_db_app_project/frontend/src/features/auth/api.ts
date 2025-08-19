import { fetchData, postData } from "../../api/api";
import { REFRESH_TOKEN } from "../../constants";

interface AuthParams {
    username: string;
    password: string;
}

export const getTokens = ({ username, password }: AuthParams) =>
    postData({ path: "token/", data: { username, password } });

export const refreshAccessToken = () =>
    postData({
        path: "token/refresh/",
        data: { refresh: localStorage.getItem(REFRESH_TOKEN) },
        auth: false,
    });

export const fetchCurrentUser = () => fetchData({ path: "users/self/" });

export const createUser = (data: AuthParams) =>
    postData({ path: "users/", data: data });

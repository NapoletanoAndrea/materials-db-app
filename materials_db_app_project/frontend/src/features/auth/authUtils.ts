import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, LAST_FRESH_LOGIN, SESSION_DURATION } from "../../constants";
import { refreshAccessToken } from "./api";

export const isSessionExpired = () => {
    const last_fresh_login = localStorage.getItem(LAST_FRESH_LOGIN);
    if (last_fresh_login) {
        return Date.now() - Number(last_fresh_login) > SESSION_DURATION;
    }
    return true;
};

const isAccessTokenInvalidOrExpired = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return true;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp as number;
    const now = Date.now() / 1000;
    return tokenExpiration < now;
};

const refreshAndCacheAccessToken = async () => {
    try {
        const result = await refreshAccessToken();
        localStorage.setItem(ACCESS_TOKEN, result.access);
    } catch (e) {
        console.error("Failed to refresh access token: ", e);
    }
};

export const tryRefreshAccessToken = async () => {
    if (isAccessTokenInvalidOrExpired()) {
        await refreshAndCacheAccessToken();
    }
};

export const getAccessToken = async () => {
    if (isAccessTokenInvalidOrExpired()) {
        await refreshAndCacheAccessToken();
    }
    return localStorage.getItem(ACCESS_TOKEN);
};

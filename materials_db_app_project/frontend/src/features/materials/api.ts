import { toFormData } from "axios";
import { fetchData, postData } from "../../api/api";

const ITEMS_PATH = "items/";

export const analyzeImage = (data: { image: File }) => {
    const fd = new FormData();
    fd.append("image", data.image);
    return postData({ path: "analyze-image/", data: fd });
};

export const fetchItems = () => {
    return fetchData({ path: ITEMS_PATH });
};

export const createItem = (data: Record<string, any>) => {
    return postData({ path: ITEMS_PATH, data: toFormData(data) });
};

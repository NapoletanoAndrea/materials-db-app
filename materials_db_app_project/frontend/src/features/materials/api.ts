import { toFormData } from "axios";
import { deleteData, fetchData, patchData, postData } from "../../api/api";

const ITEMS_PATH = "items/";
const CATEGORIES_PATH = "categories/";

export const analyzeImage = (data: { image: File }) => {
    const fd = new FormData();
    fd.append("image", data.image);
    return postData({ path: "analyze-image/", data: fd });
};

export const fetchItems = () => {
    return fetchData({ path: ITEMS_PATH });
};

export const fetchItem = (uuid: string) => {
    return fetchData({ path: ITEMS_PATH, key: uuid });
};

export const createItem = (data: Record<string, any>) => {
    return postData({ path: ITEMS_PATH, data: toFormData(data) });
};

export const deleteItem = (uuid: string) => {
    return deleteData({ path: ITEMS_PATH, key: uuid });
};

export const patchItem = (uuid: string, data: Record<string, any>) => {
    return patchData({ path: ITEMS_PATH, key: uuid, data: data });
};

export const fetchCategories = () => {
    return fetchData({ path: CATEGORIES_PATH });
};

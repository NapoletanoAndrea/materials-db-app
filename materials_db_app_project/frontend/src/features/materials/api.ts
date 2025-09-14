import { fetchData, postData } from "../../api/api";

export const analyzeImage = (data: { image: File }) => {
    const fd = new FormData();
    fd.append("image", data.image);
    return postData({ path: "analyze-image/", data: fd });
};

export const fetchItems = () => {
    return fetchData({ path: "items/" });
};

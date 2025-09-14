export const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max) + "..." : str;

export const lerp = (start: number, end: number, t: number) => {
    return start + (end - start) * t;
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const toFormData = (data: Record<string, any>): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) {
            // ✅ Handle file or Blob
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            // ✅ Handle arrays (append each item)
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else if (typeof value === "object" && value !== null) {
            // ✅ Handle nested objects (convert to JSON)
            formData.append(key, JSON.stringify(value));
        } else {
            // ✅ Handle primitive values (string, number, boolean)
            formData.append(key, String(value));
        }
    });

    return formData;
};

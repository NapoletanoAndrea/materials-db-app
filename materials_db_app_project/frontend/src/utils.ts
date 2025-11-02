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

/** Utility: compress & resize image using Canvas */
export async function compressImage(
    file: File,
    maxWidth = 1024,
    quality = 0.7
): Promise<File> {
    const imageBitmap = await createImageBitmap(file);
    const ratio = Math.min(1, maxWidth / imageBitmap.width);
    const newWidth = imageBitmap.width * ratio;
    const newHeight = imageBitmap.height * ratio;

    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
    ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob) throw new Error("Image compression failed");

    return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
        type: "image/jpeg",
    });
}

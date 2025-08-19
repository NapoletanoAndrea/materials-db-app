export const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max) + "..." : str;

export const lerp = (start: number, end: number, t: number) => {
    return start + (end - start) * t;
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

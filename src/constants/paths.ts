const isProd = process.env.NODE_ENV === "production";
export const BASE_PATH = isProd ? "/hp" : "";

export const getPath = (path: string): string => {
    if (path.startsWith(BASE_PATH)) return path;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_PATH}${normalizedPath}`;
};
const basePath = process.env.BASE_PATH || "";

export const path = (p: string): string => {
    if (basePath && p.startsWith(basePath)) return p;

    const normalizedPath = p.startsWith("/") ? p : `/${p}`;
    return `${basePath}${normalizedPath}`;
};

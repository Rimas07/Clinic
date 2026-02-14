import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Формирует правильный путь к медиа-файлам из папки public
 * Автоматически добавляет base URL для production
 * @param path - путь к файлу относительно папки public (например, "logo.png")
 * @returns полный путь к файлу
 */
export function getPublicAssetUrl(path: string): string {
    // Убираем начальный слеш, если он есть
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // import.meta.env.BASE_URL автоматически добавит base путь из vite.config
    return `${import.meta.env.BASE_URL}${cleanPath}`;
}














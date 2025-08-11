import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanAdvicePhrases(text: string) {
  return (text || "").replace(/recomendación de compra/gi, "—")
}

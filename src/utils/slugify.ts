export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, `-`) // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ``) // Remove special characters except hyphens
    .replace(/-+/g, `-`) // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ``); // Remove leading/trailing hyphens
};

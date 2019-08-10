export const parseSearch = text =>
  text
    .replace(/\\/g, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

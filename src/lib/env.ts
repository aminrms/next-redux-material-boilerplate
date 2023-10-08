export const isProd = process.env.NODE_ENV === "production";
export const isLocal = process.env.NODE_ENV === "development";

export const BASE_URL = isProd
  ? "https://api.panel.com"
  : "https://jsonplaceholder.typicode.com/";

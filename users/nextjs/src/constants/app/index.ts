const isDevelopment = process.env.NODE_ENV !== "production";

export const ROOT_URL = isDevelopment
  ? `http://localhost:${process.env.NEXT_PUBLIC_PORT}`
  : `${process.env.NEXT_PUBLIC_HOST_FRONTEND}`;

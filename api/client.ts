// Production: api.dockfindr.com
// Development: localhost:3000
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.dockfindr.com"
    : "http://192.168.86.96:3000";

export const customFetch = (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  return fetch(BASE_URL + url, { ...options, headers });
};

export const get = async (url: string) => {
  const response = await customFetch(url);
  return response.json();
};

export const post = async (url: string, body: any) => {
  const response = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.json();
};

export const put = async (url: string, body: any) => {
  const response = await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return response.json();
};

export const remove = async (url: string) => {
  const response = await customFetch(url, { method: "DELETE" });
  return response.json();
};

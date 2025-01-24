// src/services/api.ts
export const BASE_URL = import.meta.env.VITE_MINDQ_SITE_BE;

export async function post<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": document.cookie
      .split("; ")
      .find(row => row.startsWith("auth_token="))?.split("=")[1] 
      ? `${document.cookie.split("; ").find(row => row.startsWith("auth_token="))?.split("=")[1]}` 
      : "",
    }),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// You can add more methods as needed
export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

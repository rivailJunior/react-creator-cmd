import { HttpClient } from "./http-client";

export class FetchAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }
}

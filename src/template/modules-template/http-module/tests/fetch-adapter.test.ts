import { describe, expect, test, vi } from "vitest";
import { FetchAdapter } from "../fetch-adapter";

// just for testing example
const getURL = "https://jsonplaceholder.typicode.com/todos/1";
const postURL = "https://jsonplaceholder.typicode.com/todos";

const body = {
  id: 1,
  title: "This is a simple test",
  completed: false,
};

describe("FetchAdapter", () => {
  test("should send a GET request", async () => {
    const fetchAdapter = new FetchAdapter();
    await vi.spyOn(fetchAdapter, "get").mockResolvedValue(body);
    const response = await fetchAdapter.get(getURL);
    expect(response).toEqual({
      id: 1,
      title: "This is a simple test",
      completed: false,
    });
    expect(fetchAdapter.get).toHaveBeenCalled();
    expect(fetchAdapter.get).toHaveBeenCalledTimes(1);
    expect(fetchAdapter.get).toHaveBeenLastCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  });

  test("should send a POST request", async () => {
    const fetchAdapter = new FetchAdapter();

    await vi.spyOn(fetchAdapter, "post").mockResolvedValue(body);
    const response = await fetchAdapter.post(postURL, body);
    expect(response).toEqual({
      id: 1,
      title: "This is a simple test",
      completed: false,
    });
    expect(fetchAdapter.post).toHaveBeenCalled();
    expect(fetchAdapter.post).toHaveBeenCalledTimes(1);
    expect(fetchAdapter.post).toHaveBeenLastCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
      body
    );
  });

  test("show throw an error when fetch fail", async () => {
    const fetchAdapter = new FetchAdapter();
    await vi.spyOn(fetchAdapter, "get").mockRejectedValue(new Error());
    await expect(fetchAdapter.get(getURL)).rejects.toThrow();
  });

  test("show throw an error when post fail", async () => {
    const fetchAdapter = new FetchAdapter();
    await vi.spyOn(fetchAdapter, "post").mockRejectedValue(new Error());
    await expect(fetchAdapter.post(getURL, body)).rejects.toThrow();
  });
});

import { createFile } from "../usecases/create-file-from-template";
import fs from "fs";
import { vi } from "vitest";

describe("createFile", () => {
  it("should create a file at the specified filepath", () => {
    const filepath = "test-file.txt";
    createFile(filepath);
    const fileExists = fs.existsSync(filepath);
    expect(fileExists).toBe(true);
    fs.unlinkSync(filepath); // Clean up after the test
  });

  it("should throw an error if the file at the template path does not exist", () => {
    let spy;
    try {
      const filepath = "test-file.txt";

      spy = vi.spyOn(fs, "readFileSync").mockImplementation(() => {
        throw new Error("Template not found");
      });
      createFile(filepath);
    } catch (err) {
      expect(err).toEqual(new Error("Template not found"));
    }

    spy.mockRestore(); // Restore the original implementation
  });
});

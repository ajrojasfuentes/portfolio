import { describe, it, expect } from "vitest";
import { parseDateStrings } from "@/lib/content";
import { hexToRgba } from "@/lib/constants";

describe("Content & Helper Utilities", () => {
  describe("parseDateStrings", () => {
    it("correctly parses a single date", () => {
      const result = parseDateStrings("Jan 2025");
      expect(result.start).toBeGreaterThan(0);
      expect(result.end).toBe(result.start);
    });

    it("correctly parses date ranges with standard hyphen", () => {
      const result = parseDateStrings("Jan 2025 - Dec 2025");
      expect(result.start).toBeGreaterThan(0);
      expect(result.end).toBeGreaterThan(result.start);
    });

    it("correctly parses date ranges with en-dash", () => {
      const result = parseDateStrings("Jan 2025 – Dec 2025");
      expect(result.start).toBeGreaterThan(0);
      expect(result.end).toBeGreaterThan(result.start);
    });

    it("treats 'Present' as Infinity for active positions", () => {
      const result = parseDateStrings("Mar 2026 – Present");
      expect(result.start).toBeGreaterThan(0);
      expect(result.end).toBe(Infinity);
    });

    it("handles empty or invalid date strings gracefully", () => {
      const result = parseDateStrings("");
      expect(result.start).toBe(0);
      expect(result.end).toBe(0);
    });
  });

  describe("hexToRgba", () => {
    it("converts 6-character hex to rgba", () => {
      expect(hexToRgba("#2DD4BF", 0.5)).toBe("rgba(45, 212, 191, 0.5)");
    });

    it("converts 3-character hex to rgba", () => {
      expect(hexToRgba("#fff", 1)).toBe("rgba(255, 255, 255, 1)");
    });
  });
});

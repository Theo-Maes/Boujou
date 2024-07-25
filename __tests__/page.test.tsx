import { Vitest, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";
import { useSession } from "next-auth/react";
// Mock the useSession hook
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

test("Page", () => {
  (useSession as any).mockReturnValue({
    data: {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    },
    status: "authenticated",
  });
  render(<Page />);
  expect(screen.getByRole("button")).toBeDefined();
});

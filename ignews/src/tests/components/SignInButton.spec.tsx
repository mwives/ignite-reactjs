import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/client";

import { SignInButton } from "../../components/SignInButton";

jest.mock("next-auth/client");

describe("SignIn button", () => {
  it("renders correctly when user is not authenticated", () => {
    mocked(useSession).mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is not authenticated", () => {
    mocked(useSession).mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "johndoe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

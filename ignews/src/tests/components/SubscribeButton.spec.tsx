import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

import { SubscribeButton } from "../../components/SubscribeButton";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("SignIn button", () => {
  it("renders correctly", () => {
    mocked(useSession).mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const mockedSignIn = mocked(signIn);

    mocked(useSession).mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(mockedSignIn).toHaveBeenCalled();
  });

  it("redirects to posts when user already has as subscription", () => {
    const mockedUseSession = mocked(useSession);
    const mockedUseRouter = mocked(useRouter);
    const mockedPush = jest.fn();

    mockedUseSession.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
        },
        activeSubscription: "face-active-subscription",
        expires: "fake-expires",
      },
      false,
    ]);

    mockedUseRouter.mockReturnValueOnce({
      push: mockedPush,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(mockedPush).toHaveBeenCalledWith("/posts");
  });
});

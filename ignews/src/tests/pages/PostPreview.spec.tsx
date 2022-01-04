import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

jest.mock("next-auth/client");
jest.mock("next/router");
jest.mock("../../services/prismic.ts");

const post = {
  slug: "post-slug",
  title: "Post title",
  content: "<p>Post content</p>",
  updatedAt: "22 de dezembro de 2021",
};

describe("Post Preview page", () => {
  it("renders correctly", () => {
    mocked(useSession).mockReturnValueOnce([null, false]);

    render(<PostPreview post={post} />);

    expect(screen.getByText("Post title")).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const mockedRouterPush = jest.fn();

    mocked(useSession).mockReturnValueOnce([
      {
        activeSubscription: "fake-active-subscription",
      },
      false,
    ]);

    mocked(useRouter).mockReturnValueOnce({
      push: mockedRouterPush,
    } as any);

    render(<PostPreview post={post} />);

    expect(mockedRouterPush).toHaveBeenCalledWith("/posts/post-slug");
  });

  it("loads initial data", async () => {
    mocked(getPrismicClient).mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading",
              text: "Post title",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Post content",
            },
          ],
        },
        last_publication_date: "12-22-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "post-slug",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "post-slug",
            title: "Post title",
            content: "<p>Post content</p>",
            updatedAt: "22 de dezembro de 2021",
          },
        },
      })
    );
  });
});

import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getSession } from "next-auth/client";

import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "post-1",
  title: "Post 1",
  content: "<p>Post content</p>",
  updatedAt: "March, 10th",
};

jest.mock("next-auth/client");
jest.mock("../../services/prismic.ts");

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
  });

  it("redirects user if unsubscribed", async () => {
    mocked(getSession).mockReturnValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: "post-1",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("loads initial data", async () => {
    mocked(getSession).mockReturnValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

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

    const response = await getServerSideProps({
      params: {
        slug: "post-1",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "post-1",
            title: "Post title",
            content: "<p>Post content</p>",
            updatedAt: "22 de dezembro de 2021",
          },
        },
      })
    );
  });
});

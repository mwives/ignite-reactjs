import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "post-1",
    title: "Post 1",
    excerpt: "Post excerpt",
    updatedAt: "March, 10th",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Post 1"));
  });

  it("loads initial data", async () => {
    mocked(getPrismicClient).mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "post-1",
            data: {
              title: [
                {
                  type: "heading",
                  text: "Lorem ipsum dolor",
                },
              ],
              content: [
                {
                  type: "paragraph",
                  text: "Post excerpt",
                },
              ],
            },
            last_publication_date: "12-22-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "post-1",
              title: "Lorem ipsum dolor",
              excerpt: "Post excerpt",
              updatedAt: "22 de dezembro de 2021",
            },
          ],
        },
      })
    );
  });
});

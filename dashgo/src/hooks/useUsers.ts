import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  try {
    const { data, headers } = await api.get<GetUsersResponse>("/users", {
      params: {
        page,
      },
    });

    const totalCount = Number(headers["x-total-count"]);

    const users = data.users.map(({ id, name, email, createdAt }) => {
      return {
        id,
        name,
        email,
        createdAt: new Date(createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    });

    return {
      users,
      totalCount,
    };
  } catch (err) {
    console.log(err.response);
  }
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 min
    ...options,
  });
}

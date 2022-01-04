import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

import { Can } from "../components/Can";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get("me")
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>
        Sair
      </button>

      <Can permissions={["users.create"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get("/me");

  return {
    props: {},
  };
});

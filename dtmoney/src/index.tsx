import { createServer, Model } from "miragejs";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./styles/global.scss";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.create("transaction", {
      id: "t1",
      createdAt: new Date("2020-02-14"),
      title: "New TV",
      amount: 798.90,
      type: "outcome",
      category: "Entertainment",
    });
    server.create("transaction", {
      id: "t2",
      createdAt: new Date("2020-05-28"),
      title: "Freelance Website",
      amount: 2500,
      type: "income",
      category: "Dev",
    });
    server.create("transaction", {
      id: "t3",
      createdAt: new Date("2020-11-12"),
      title: "PS5 on Launch",
      amount: 499.99,
      type: "outcome",
      category: "Entertainment",
    });
    server.create("transaction", {
      id: "t4",
      createdAt: new Date("2021-08-27"),
      title: "House Rent",
      amount: 879.57,
      type: "outcome",
      category: "House",
    });
    server.create("transaction", {
      id: "t5",
      createdAt: new Date("2021-09-17"),
      title: "Freelance Website",
      amount: 1500,
      type: "income",
      category: "Dev",
    });
  },

  routes() {
    this.get("/api/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/api/transactions", (schema, request) => {
      const transactionData = JSON.parse(request.requestBody);
      return this.schema.create("transaction", transactionData);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

import { useFilterTransactions } from "../../hooks/useFilterTransactions";

import styles from "./styles.module.scss";

export function TransactionsTable() {
  const { filteredTransactions } = useFilterTransactions();

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map(
            ({ amount, category, createdAt, id, title, type }) => (
              <tr key={id}>
                <td>{title}</td>
                <td
                  className={type === "income" ? styles.income : styles.outcome}
                >
                  {type === "income" ? "+ " : "- "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(amount)}
                </td>
                <td>{category}</td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(new Date(createdAt))}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

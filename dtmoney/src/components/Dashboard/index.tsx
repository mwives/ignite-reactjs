import { Summary } from "../Summary";
import { TransactionsChart } from "../TransactionsChart";
import { TransactionsTable } from "../TransactionsTable";

import styles from "./styles.module.scss";

export function Dashboard() {
  return (
    <main className={styles.container}>
      <Summary />
      <TransactionsChart />
      <TransactionsTable />
    </main>
  );
}

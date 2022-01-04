import { useEffect, useState } from "react";

import { CgArrowDownO, CgArrowUpO } from "react-icons/cg";
import { FiDollarSign } from "react-icons/fi";

import { useFilterTransactions } from "../../hooks/useFilterTransactions";

import { SummaryTotal } from "./styles";
import styles from "./styles.module.scss";

export function Summary() {
  // TODO: Add animation when state changes
  const [incomes, setIncomes] = useState(0);
  const [outcomes, setOutcomes] = useState(0);
  const [total, setTotal] = useState(0);

  const { filteredTransactions } = useFilterTransactions();

  useEffect(() => {
    setIncomes(0);
    setOutcomes(0);
    setTotal(0);

    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        setIncomes((prev) => prev + transaction.amount);
        setTotal((prev) => prev + transaction.amount);
      } else {
        setOutcomes((prev) => prev + transaction.amount);
        setTotal((prev) => prev - transaction.amount);
      }
    });
  }, [filteredTransactions]);

  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Incomes</p>
          <CgArrowUpO className={styles.incomeIcon} />
        </header>
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(incomes)}
        </strong>
      </div>
      <div>
        <header>
          <p>Outcomes</p>
          <CgArrowDownO className={styles.outcomeIcon} />
        </header>
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(outcomes)}
        </strong>
      </div>
      <SummaryTotal totalIsPositive={total >= 0}>
        <header>
          <p>Total</p>
          <FiDollarSign className={styles.totalIcon} />
        </header>
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </strong>
      </SummaryTotal>
    </div>
  );
}

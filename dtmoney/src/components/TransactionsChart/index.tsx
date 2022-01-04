import { useEffect, useState } from "react";

import { useFilterTransactions } from "../../hooks/useFilterTransactions";

import { BarFill } from "./style";
import styles from "./styles.module.scss";

export function TransactionsChart() {
  const chartMonthData = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Ago", value: 0 },
    { label: "Set", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  const [selectedYear, setSelectedYear] = useState("All");
  const { setFilterYear, filteredTransactions } = useFilterTransactions();

  useEffect(() => {
    setFilterYear(selectedYear);
  }, [selectedYear, setFilterYear]);

  filteredTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    const transactionMonthValue = transactionDate.getMonth();

    chartMonthData[transactionMonthValue].value += transaction.amount;
  });

  const values = chartMonthData.map((data) => data.value);
  let maxValue = Math.max(...values);

  return (
    <div className={styles.container}>
      <div>
        <h2>Filter by year</h2>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className={styles.chart}>
        {chartMonthData.map((monthData) => (
          <div key={monthData.label}>
            <div className={styles.bar}>
              <BarFill value={monthData.value} maxValue={maxValue} />
            </div>
            <span>{monthData.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

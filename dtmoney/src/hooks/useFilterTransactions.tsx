import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useTransactions } from "./useTransactions";

interface Transaction {
  id: string;
  createdAt: Date;
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface FilterContextData {
  filteredTransactions: Transaction[];
  setFilterYear: (year: string) => void;
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterTransactionsProvider({ children }: FilterProviderProps) {
  const [selectedYear, setSelectedYear] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const { transactions } = useTransactions();

  function setFilterYear(year: string) {
    setSelectedYear(year);
  }

  useEffect(() => {
    if (selectedYear === "All") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => {
        const transactionYear = new Date(transaction.createdAt).getFullYear();
        return transactionYear.toString() === selectedYear;
      });

      setFilteredTransactions(filtered);
    }
  }, [selectedYear, transactions]);

  return (
    <FilterContext.Provider value={{ filteredTransactions, setFilterYear }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterTransactions() {
  return useContext(FilterContext);
}

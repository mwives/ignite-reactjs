import { useState } from "react";
import Modal from "react-modal";

import { TransactionsProvider } from "./hooks/useTransactions";

import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { Dashboard } from "./components/Dashboard";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
    document.querySelector("body")!.style.overflow = "hidden";
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
    document.querySelector("body")!.style.overflow = "initial";
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}

export default App;

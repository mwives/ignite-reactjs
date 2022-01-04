import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { CgArrowDownO, CgArrowUpO } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

import { useTransactions } from "../../hooks/useTransactions";

import { RadioBox } from "./styles";
import styles from "./styles.module.scss";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [radioBoxType, setRadioBoxType] = useState("income");
  const [category, setCategory] = useState("");

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({
      createdAt: new Date(),
      title,
      amount,
      type: radioBoxType,
      category,
    });

    onRequestClose();
    
    setTitle("");
    setAmount(0);
    setRadioBoxType("income");
    setCategory("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <IoMdClose />
      </button>

      <form className={styles.container} onSubmit={handleCreateNewTransaction}>
        <h2>Add Transaction</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className={styles.transactionTypeContainer}>
          <RadioBox
            type="button"
            className={styles.RadioBoxButton}
            isActive={radioBoxType === "income"}
            radioBoxType={radioBoxType}
            onClick={() => setRadioBoxType("income")}
          >
            <CgArrowUpO className={styles.incomeIcon} />
            <span>Income</span>
          </RadioBox>
          <RadioBox
            type="button"
            className={styles.RadioBoxButton}
            isActive={radioBoxType === "outcome"}
            radioBoxType={radioBoxType}
            onClick={() => setRadioBoxType("outcome")}
          >
            <CgArrowDownO className={styles.outcomeIcon} />
            <span>Outcome</span>
          </RadioBox>
        </div>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">Add</button>
      </form>
    </Modal>
  );
}

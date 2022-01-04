import { FiDollarSign } from "react-icons/fi";

import styles from "./styles.module.scss";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>
          <span className={styles.icon}>
            <FiDollarSign className={styles.logoIcon} />
          </span>
          dt.money
        </h1>

        <button type="button" onClick={onOpenNewTransactionModal}>
          New transaction
        </button>
      </div>
    </header>
  );
}

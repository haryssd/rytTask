import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import initialTransactions from "../assets/transactions.json";

// Transaction interface
export interface Transaction {
  id: string;
  recipientBank: string;
  accountNumber: string;
  transferMethod: string;
  transferType: string;
  amount: number;
  description: string;
  createdAt: string;
}

interface BalanceContextType {
  balance: number;
  transactions: Transaction[];
  updateBalance: (amount: number) => boolean;
  addTransaction: (transaction: Transaction) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // state
  const [balance, setBalance] = useState(10000.0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //created / lifecycle
  useEffect(() => {
    const sortedTransactions = [...initialTransactions].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) as Transaction[];

    setTransactions(sortedTransactions);
  }, []);

  //methods
  const updateBalance = (amount: number): boolean => {
    if (amount < 0 && Math.abs(amount) > balance) {
      return false;
    }

    setBalance((prevBalance) => prevBalance + amount);
    return true;
  };

  const addTransaction = (transaction: Transaction): void => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
  };

  return (
    <BalanceContext.Provider
      value={{ balance, transactions, updateBalance, addTransaction }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};

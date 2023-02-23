import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface ITransactions {
  id: number;
  title: string,
  amount: number,
  type: 'withdraw' | 'deposit',
  category: string,
  createdAt: string
}

interface ITransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactions[]>([]);

export function TransactionsProvider({children}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  useEffect(() => {
    const fetchTransactionsData = async () => {
      const response = await api.get('transactions')
      setTransactions(response.data.transactions)
    }

    try {
      fetchTransactionsData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}
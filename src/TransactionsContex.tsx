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

interface ITransactionsContextData {
  transactions: ITransactions[];
  createTransaction: (transaction: TransactionsProviderInputType) => void;
}

type TransactionsProviderInputType = Omit<ITransactions, 'id' | 'createdAt'>

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

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

  function createTransaction(transaction: TransactionsProviderInputType) {
    api.post('/transactions', transaction)
  }
  return (
    <TransactionsContext.Provider value={
      {
        transactions,
        createTransaction
      }
    }>
      {children}
    </TransactionsContext.Provider>
  )
}
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./style";

interface ITransactions {
  id: number;
  title: string,
  amount: number,
  type: 'withdraw' | 'deposit',
  category: string,
  createdAt: string
}

export function TransactionsTable() {
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
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
                <td className={transaction.type}>
                 {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                 }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
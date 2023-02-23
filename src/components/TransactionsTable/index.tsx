import { Container } from "./style";

export function TransactionsTable() {
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
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12000,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2023</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1000,00</td>
            <td>Casa</td>
            <td>15/02/2023</td>
          </tr>
        </tbody>
       </table>
    </Container>
  )
}
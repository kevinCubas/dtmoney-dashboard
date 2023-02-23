import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactionsContext";
import Modal from "react-modal";

import { Container, RadioBox, TransactionTypeContainer } from "./style";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type TypeState = 'deposit' | 'withdraw';

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState<TypeState>('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    try {
      await createTransaction({
        title,
        amount,
        category,
        type
      }) 
    } catch (error) {
      console.error(error)
    } finally {
      setAmount(0)
      setTitle('')
      setCategory('')
      setType('deposit')
      onRequestClose();
    }
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
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>

          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor={"green"}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor={"red"}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  )
}
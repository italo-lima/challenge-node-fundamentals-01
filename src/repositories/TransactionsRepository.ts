import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (accumulator: number, transaction: Transaction) => {
        if (transaction.type === 'income') {
          return accumulator + transaction.value;
        }
        return accumulator;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (accumulator: number, transaction: Transaction) => {
        if (transaction.type === 'outcome') {
          return accumulator + transaction.value;
        }
        return accumulator;
      },
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

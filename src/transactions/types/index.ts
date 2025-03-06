type Attachment = {
  url: string;
};

export type CurrenciesRates = {
  [key: string]: number;
};

export type Amounts = {
  [key: string]: string;
};

export type RawTransaction = {
  id: string;
  created_at: string;
  counterparty_name: string;
  debit: string;
  amount: string;
  currency: string;
  operation_type: string;
  attachements: Attachment[];
};

export type TransactionGroup = {
  transactions: RawTransaction[];
};

export type TransactionsTableValue = string | number | Amounts;

export type TransactionsResponse = TransactionGroup[];

export type Transaction = {
  id: string;
  createdAt: string;
  counterpartyName: string;
  amounts: Amounts;
  currency: string;
  operationType: string;
  attachements: number;
};

export type ExchangeRatesResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: CurrenciesRates;
};

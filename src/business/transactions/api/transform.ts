import { format } from 'date-fns';
import { CurrenciesRates, RawTransaction, Transaction } from '../types';
import { DATE_FORMAT } from '../../../config/consts';

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const convertCurrencies = (
  amount: string,
  defaultCurrency: string,
  rate?: number
): { [key: string]: string } => {
  const amountToNumber = parseFloat(amount);
  const formattedAmount = formatCurrency(amountToNumber);

  // GBP conversion is only displayed for negative values
  if (!rate || !amount.startsWith('-')) {
    return { [defaultCurrency]: formattedAmount };
  }

  return {
    [defaultCurrency]: formattedAmount,
    GBP: formatCurrency(amountToNumber * rate),
  };
};

const transformRawTransactionsToTransactions = (
  rawData: { transactions: RawTransaction[] }[],
  rates: CurrenciesRates | undefined
): Transaction[] => {
  const transactions = rawData.flatMap((group) => group.transactions);

  return transactions.map(
    ({
      created_at,
      counterparty_name,
      operation_type,
      attachements,
      amount,
      debit,
      currency,
      ...rest
    }) => ({
      createdAt: format(new Date(created_at), DATE_FORMAT),
      counterpartyName: counterparty_name,
      operationType: operation_type,
      attachements: attachements?.length ?? 0,
      amounts: convertCurrencies(amount, currency, rates?.GBP),
      currency,
      ...rest,
    })
  );
};

export default transformRawTransactionsToTransactions;

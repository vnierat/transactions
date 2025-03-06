import { format } from 'date-fns';
import { CurrenciesRates, RawTransaction, Transaction } from '../types';
import { DATE_FORMAT } from '../../../config/consts';

export const convertCurrencies = (
  amount: string,
  defaultCurrency: string,
  rate?: number
): {
  [key: string]: string;
} => {
  const amountToNumber = parseFloat(amount);

  const formattedAmount = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountToNumber);

  if (!rate) {
    return {
      [defaultCurrency]: formattedAmount,
    };
  }

  const convertedNumber = amountToNumber * rate;

  return {
    [defaultCurrency]: formattedAmount,
    GBP: new Intl.NumberFormat(navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedNumber),
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

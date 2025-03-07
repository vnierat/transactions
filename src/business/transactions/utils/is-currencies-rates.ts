import { TransactionsTableValue } from '../types';

const isCurrenciesRates = (
  value: TransactionsTableValue
): value is Record<string, string> => {
  return typeof value === 'object' && value !== null;
};

export default isCurrenciesRates;

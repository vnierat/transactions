import { ExchangeRatesResponse, TransactionsResponse } from '../types';
import transactionData from './transactions.json';
import currenciesData from './currencies.json';

export const getTransactions = async (): Promise<TransactionsResponse> => {
  return transactionData;
};

// Fake API call to fixer.io API
export const getCurrenciesRates = async (): Promise<ExchangeRatesResponse> => {
  return currenciesData;
};

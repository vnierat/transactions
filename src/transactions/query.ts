import { useQuery } from '@tanstack/react-query';
import transformrawTransactionsToTransactions from './api/transform';
import { getCurrenciesRates, getTransactions } from './api';

const transactionsKeys = {
  allTransactions: ['transactions'] as const,
  curreciesrates: ['rates'],
};

export const useGetCurrenciesRates = () =>
  useQuery({
    queryKey: transactionsKeys.curreciesrates,
    queryFn: getCurrenciesRates,
  });

export const useGetTransactions = () => {
  const { data } = useGetCurrenciesRates();
  const rates = data?.rates;
  return useQuery({
    queryKey: transactionsKeys.allTransactions,
    queryFn: getTransactions,
    select: (transactions) =>
      transformrawTransactionsToTransactions(transactions, rates),
    enabled: !!data?.rates,
  });
};

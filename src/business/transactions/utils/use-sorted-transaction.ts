import { useMemo } from 'react';
import { compareAsc, compareDesc, parse } from 'date-fns';
import { Transaction } from '../types';
import { DATE_FORMAT } from '../../../config/consts';
import isCurrenciesRates from './is-currencies-rates';

const useSortedTransactions = (
  data: Transaction[],
  sortColumn: keyof Transaction,
  sortOrder: 'asc' | 'desc'
) => {
  return useMemo(() => {
    if (!data.length) return [];

    return [...data].sort((a, b) => {
      const currencyA = a.currency;
      const currencyB = b.currency;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue == null || bValue == null) return 0;

      if (sortColumn === 'createdAt') {
        return sortOrder === 'asc'
          ? compareAsc(
              parse(String(aValue), DATE_FORMAT, new Date()),
              parse(String(bValue), DATE_FORMAT, new Date())
            )
          : compareDesc(
              parse(String(aValue), DATE_FORMAT, new Date()),
              parse(String(bValue), DATE_FORMAT, new Date())
            );
      }

      if (isCurrenciesRates(aValue) && isCurrenciesRates(bValue)) {
        if (typeof currencyA === 'string' && typeof currencyB === 'string') {
          const aAmount = aValue[currencyA];
          const bAmount = bValue[currencyB];

          if (typeof aAmount === 'string' && typeof bAmount === 'string') {
            return sortOrder === 'asc'
              ? parseFloat(aAmount) - parseFloat(bAmount)
              : parseFloat(bAmount) - parseFloat(aAmount);
          }
        }
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortColumn, sortOrder]);
};

export default useSortedTransactions;

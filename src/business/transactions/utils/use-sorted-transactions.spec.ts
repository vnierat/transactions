import { renderHook } from '@testing-library/react-hooks';
import { format } from 'date-fns';
import { Transaction } from '../types';
import { DATE_FORMAT } from '../../../config/consts';
import useSortedTransactions from './use-sorted-transaction';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    createdAt: format(new Date(2023, 1, 5), DATE_FORMAT),
    counterpartyName: 'Amazon',
    operationType: 'purchase',
    amounts: { eur: '50.00', usd: '55.00' },
    currency: 'eur',
    attachements: 1,
  },
  {
    id: '2',
    createdAt: format(new Date(2023, 1, 1), DATE_FORMAT),
    counterpartyName: 'Uber',
    operationType: 'refund',
    amounts: { eur: '20.00', usd: '22.00' },
    currency: 'eur',
    attachements: 1,
  },
  {
    id: '3',
    createdAt: format(new Date(2023, 1, 10), DATE_FORMAT),
    counterpartyName: 'Apple',
    operationType: 'purchase',
    amounts: { eur: '100.00', usd: '110.00' },
    currency: 'eur',
    attachements: 1,
  },
];

describe('useSortedTransactions', () => {
  test('should return transactions sorted by createdAt in ascending order', () => {
    const { result } = renderHook(() =>
      useSortedTransactions(mockTransactions, 'createdAt', 'asc')
    );

    expect(result.current.map((t) => t.id)).toEqual(['2', '1', '3']);
  });

  test('should return transactions sorted by createdAt in descending order', () => {
    const { result } = renderHook(() =>
      useSortedTransactions(mockTransactions, 'createdAt', 'desc')
    );

    expect(result.current.map((t) => t.id)).toEqual(['3', '1', '2']);
  });

  test('should return transactions sorted by amount in ascending order', () => {
    const { result } = renderHook(() =>
      useSortedTransactions(mockTransactions, 'amounts', 'asc')
    );

    expect(result.current.map((t) => t.id)).toEqual(['2', '1', '3']);
  });

  test('should return transactions sorted by amount in descending order', () => {
    const { result } = renderHook(() =>
      useSortedTransactions(mockTransactions, 'amounts', 'desc')
    );

    expect(result.current.map((t) => t.id)).toEqual(['3', '1', '2']);
  });

  test('should return an empty array when given an empty data array', () => {
    const { result } = renderHook(() =>
      useSortedTransactions([], 'createdAt', 'asc')
    );

    expect(result.current).toEqual([]);
  });
});

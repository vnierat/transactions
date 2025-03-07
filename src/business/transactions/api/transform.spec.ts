import { CurrenciesRates, RawTransaction } from '../types';
import transformRawTransactionsToTransactions, {
  convertCurrencies,
} from './transform';

describe('transformRawTransactionsToTransactions', () => {
  test('should transform raw transactions to the correct transaction format', () => {
    const rawData: { transactions: RawTransaction[] }[] = [
      {
        transactions: [
          {
            id: '1',
            created_at: '2023-01-01T00:00:00Z',
            counterparty_name: 'Amazon',
            operation_type: 'purchase',
            attachements: [{ url: 'some-url' }],
            amount: '100.00',
            currency: 'EUR',
            debit: '0',
          },
        ],
      },
    ];

    const rates: CurrenciesRates = {
      EUR: 1,
      GBP: 0.85,
    };

    const expectedTransaction = [
      {
        id: '1',
        createdAt: '01-01-2023',
        counterpartyName: 'Amazon',
        operationType: 'purchase',
        attachements: 1,
        amounts: {
          EUR: '100.00',
        },
        currency: 'EUR',
      },
    ];

    const result = transformRawTransactionsToTransactions(rawData, rates);

    expect(result).toEqual(expectedTransaction);
  });

  test('should return the correct format without conversion when no rate is provided', () => {
    const rawData: { transactions: RawTransaction[] }[] = [
      {
        transactions: [
          {
            id: '1',
            created_at: '2023-01-01T00:00:00Z',
            counterparty_name: 'Amazon',
            operation_type: 'purchase',
            attachements: [{ url: 'some-url' }],
            amount: '100.00',
            currency: 'EUR',
            debit: '0',
          },
        ],
      },
    ];

    const rates: CurrenciesRates = {};

    const expectedTransaction = [
      {
        id: '1',
        createdAt: '01-01-2023',
        counterpartyName: 'Amazon',
        operationType: 'purchase',
        attachements: 1,
        amounts: {
          EUR: '100.00',
        },
        currency: 'EUR',
      },
    ];

    const result = transformRawTransactionsToTransactions(rawData, rates);

    expect(result).toEqual(expectedTransaction);
  });

  test('should convert negative amount to GBP when rate is provided', () => {
    const rawData: { transactions: RawTransaction[] }[] = [
      {
        transactions: [
          {
            id: '2',
            created_at: '2023-02-01T00:00:00Z',
            counterparty_name: 'Apple',
            operation_type: 'refund',
            attachements: [],
            amount: '-200.00',
            currency: 'EUR',
            debit: '1',
          },
        ],
      },
    ];

    const rates: CurrenciesRates = {
      EUR: 1,
      GBP: 0.85,
    };

    const expectedTransaction = [
      {
        id: '2',
        createdAt: '01-02-2023',
        counterpartyName: 'Apple',
        operationType: 'refund',
        attachements: 0,
        amounts: {
          EUR: '-200.00',
          GBP: '-170.00',
        },
        currency: 'EUR',
      },
    ];

    const result = transformRawTransactionsToTransactions(rawData, rates);

    expect(result).toEqual(expectedTransaction);
  });

  test('should not convert negative amount if no rate is provided', () => {
    const rawData: { transactions: RawTransaction[] }[] = [
      {
        transactions: [
          {
            id: '3',
            created_at: '2023-03-01T00:00:00Z',
            counterparty_name: 'Netflix',
            operation_type: 'subscription',
            attachements: [],
            amount: '-50.00',
            currency: 'EUR',
            debit: '1',
          },
        ],
      },
    ];

    const rates: CurrenciesRates = {};

    const expectedTransaction = [
      {
        id: '3',
        createdAt: '01-03-2023',
        counterpartyName: 'Netflix',
        operationType: 'subscription',
        attachements: 0,
        amounts: {
          EUR: '-50.00',
        },
        currency: 'EUR',
      },
    ];

    const result = transformRawTransactionsToTransactions(rawData, rates);

    expect(result).toEqual(expectedTransaction);
  });
});

describe('convertCurrencies', () => {
  test('should correctly convert positive amount based on rate', () => {
    const result = convertCurrencies('100.00', 'EUR', 0.85);
    expect(result).toEqual({
      EUR: '100.00',
    });
  });

  test('should return only the default currency when no rate is provided', () => {
    const result = convertCurrencies('100.00', 'EUR');
    expect(result).toEqual({
      EUR: '100.00',
    });
  });

  test('should correctly convert negative amount to GBP when rate is provided', () => {
    const result = convertCurrencies('-100.00', 'EUR', 0.85);
    expect(result).toEqual({
      EUR: '-100.00',
      GBP: '-85.00',
    });
  });

  test('should not convert negative amount if no rate is provided', () => {
    const result = convertCurrencies('-100.00', 'EUR');
    expect(result).toEqual({
      EUR: '-100.00',
    });
  });
});

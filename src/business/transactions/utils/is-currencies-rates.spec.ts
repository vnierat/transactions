import isCurrenciesRates from './is-currencies-rates';

describe('isCurrenciesRates', () => {
  test('should return true for a valid object', () => {
    expect(isCurrenciesRates({ USD: '1.1', EUR: '0.9' })).toBe(true);
  });

  test('should return false for a number', () => {
    expect(isCurrenciesRates(42)).toBe(false);
  });

  test('should return false for a string', () => {
    expect(isCurrenciesRates('not an object')).toBe(false);
  });
});

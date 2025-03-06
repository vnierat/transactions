const isCurrenciesRates = (value: unknown): value is Record<string, string> => {
  return typeof value === 'object' && value !== null;
};

export default isCurrenciesRates;

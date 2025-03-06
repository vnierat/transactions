import { Amounts } from '../../../../business/transactions/types';

interface CurrencyDisplayProps {
  amounts: Amounts;
  defaultCurrency?: string;
}

const CurrencyDisplay = ({
  amounts,
  defaultCurrency = 'EUR',
}: CurrencyDisplayProps) => {
  const separateNegativeSign = (input: string): string => {
    if (input.startsWith('-')) {
      return `- ${input.slice(1)}`;
    }
    return `+ ${input}`;
  };

  const hasNegativeValue = Object.values(amounts).some((value) =>
    value.startsWith('-')
  );

  return (
    <div className="flex flex-col items-end">
      {hasNegativeValue
        ? Object.entries(amounts).map(([key, value]) => (
            <div key={key} className="w-full flex">
              {key === defaultCurrency ? (
                <div className="flex space-x-2 items-center">
                  <div className="font-bold">
                    {separateNegativeSign(value)} {key}
                  </div>
                  <div className="text-red-300">▼</div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm ml-4">
                  {separateNegativeSign(value)} {key}
                </div>
              )}
            </div>
          ))
        : amounts.EUR && (
            <div className="w-full flex">
              <div className="flex space-x-2 items-center">
                <div className="font-bold">
                  {separateNegativeSign(amounts.EUR)} {defaultCurrency}
                </div>
                <div className="text-blue-300">▲</div>
              </div>
            </div>
          )}
    </div>
  );
};

export default CurrencyDisplay;

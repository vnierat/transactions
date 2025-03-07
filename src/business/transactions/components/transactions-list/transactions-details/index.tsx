import CurrencyDisplay from '../../../../../technical/common/components/currency-display';
import { Transaction } from '../../../types';

interface TransactionsDetailsProps {
  selectedTransactions: Set<string>;
  transactions: Transaction[] | undefined;
}

const TransactionsDetails = ({
  selectedTransactions,
  transactions,
}: TransactionsDetailsProps) => {
  const selectedCount = selectedTransactions.size;

  if (selectedCount === 0) {
    return (
      <div className="my-auto px-6">
        <p className="text-gray-500 text-center">
          Click on one or several transactions to see details
        </p>
      </div>
    );
  }

  if (selectedCount === 1) {
    const txId = Array.from(selectedTransactions)[0];
    const tx = transactions?.find((t) => t.id === txId);

    return tx ? (
      <div className="flex flex-col text-gray-500 text-center my-auto px-6">
        <h2 className="font-bold text-lg">Transaction sélectionnée :</h2>
        <div className="text-left py-4 space-y-2 bg-indigo-100 p-4 mt-4 rounded-lg">
          <p className="font-bold">{tx.counterpartyName}</p>
          <CurrencyDisplay amounts={tx.amounts} />
          <p className="font-bold">{tx.createdAt}</p>
          <p className="font-bold">
            Payment type:{' '}
            <span className="font-normal">{tx.operationType}</span>
          </p>
          <p className="font-bold">
            Attachements: <span className="font-normal">{tx.attachements}</span>
          </p>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="flex flex-col items-center text-gray-500 text-center my-auto">
      <h2 className="font-bold text-lg">
        Transactions sélectionnées ({selectedCount}) :
      </h2>
      <hr />
      <div>
        {Array.from(selectedTransactions).map((txId) => (
          <span key={txId}>{txId}, </span>
        ))}
      </div>
    </div>
  );
};

export default TransactionsDetails;

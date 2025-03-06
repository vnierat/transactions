import CurrencyDisplay from '../../../../technical/common/components/currency-display';
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
      <p className="text-gray-500 text-center">
        Click on one or several transactions to see details
      </p>
    );
  }

  if (selectedCount === 1) {
    const txId = Array.from(selectedTransactions)[0];
    const tx = transactions?.find((t) => t.id === txId);

    return tx ? (
      <div className="flex flex-col text-gray-500 text-center">
        <h2 className="font-bold text-lg">Transaction sélectionnée :</h2>
        <div className="text-right py-4 space-y-2">
          <p className="font-bold">{tx.counterpartyName}</p>
          <CurrencyDisplay amounts={tx.amounts} />
          <p className="font-bold">{tx.createdAt}</p>
          <p className="font-bold">Type: {tx.operationType}</p>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="flex flex-col items-center text-gray-500 text-center">
      <h2 className="font-bold text-lg">
        Transactions sélectionnées ({selectedCount}) :
      </h2>
      <hr />
      <div>
        {Array.from(selectedTransactions).map((txId) => (
          <span key={txId}>{txId},</span>
        ))}
      </div>
    </div>
  );
};

export default TransactionsDetails;

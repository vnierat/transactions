import { useState, useCallback } from 'react';
import { LoaderCircle } from 'lucide-react';
import useColumnsDef from '../../utils/transactions-columns-def';
import { Transaction } from '../../types';
import { useGetTransactions } from '../../query';
import DataTable from '../../../technical/common/components/table';
import TransactionsDetails from './transactions-details';
import useSortedTransactions from '../../utils/use-sorted-transaction';

const TransactionsList = () => {
  const { data: transactions, error, isLoading } = useGetTransactions();
  const [sortColumn, setSortColumn] = useState<keyof Transaction>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(
    new Set()
  );

  const getNextSortOrder = (
    currentColumn: keyof Transaction,
    selectedColumn: keyof Transaction,
    currentOrder: 'asc' | 'desc'
  ): 'asc' | 'desc' => {
    if (currentColumn === selectedColumn) {
      return currentOrder === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  };

  const toggleSort = useCallback(
    (column: keyof Transaction) => {
      setSortColumn(() => column);
      setSortOrder((prevOrder) =>
        getNextSortOrder(sortColumn, column, prevOrder)
      );
    },
    [sortColumn]
  );

  const sortedData = useSortedTransactions(
    transactions ?? [],
    sortColumn,
    sortOrder
  );
  const columns = useColumnsDef(toggleSort);

  const handleSelectionChange = (selected: Set<string>) => {
    setSelectedTransactions(selected);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle size="44px" className="animate-spin text-indigo-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error : {error.message}</p>
      </div>
    );

  return (
    <div className="flex w-full">
      <div className="bg-gray-50 py-10 px-30 w-3/4">
        <DataTable
          data={sortedData}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          columns={columns}
          selectedRows={selectedTransactions}
          onSelect={handleSelectionChange}
        />
      </div>
      <div className="w-1/4 h-screen fixed right-0 top-0 flex items-center justify-center bg-white">
        <TransactionsDetails
          transactions={transactions}
          selectedTransactions={selectedTransactions}
        />
      </div>
    </div>
  );
};

export default TransactionsList;

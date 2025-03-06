import { Paperclip } from 'lucide-react';
import { useMemo } from 'react';
import { Transaction, TransactionsTableValue } from '../types';
import TableCell from '../../../technical/common/components/table/table-cell';

const useColumnsDef = (toggleSort: (column: keyof Transaction) => void) => {
  return useMemo(
    () => [
      {
        key: 'createdAt' as keyof Transaction,
        label: 'DD-MM-YYYY',
        sortable: true,
        onSort: () => toggleSort('createdAt'),
        render: (value: TransactionsTableValue) => <TableCell value={value} />,
      },
      {
        key: 'counterpartyName' as keyof Transaction,
        label: 'Counterparty Name',
        sortable: true,
        onSort: () => toggleSort('counterpartyName'),
        render: (value: TransactionsTableValue) => <TableCell value={value} />,
      },
      {
        key: 'operationType' as keyof Transaction,
        label: 'Payment Type',
        sortable: true,
        onSort: () => toggleSort('operationType'),
        render: (value: TransactionsTableValue) => <TableCell value={value} />,
      },
      {
        key: 'amounts' as keyof Transaction,
        label: 'Amount',
        sortable: true,
        onSort: () => toggleSort('amounts'),
        render: (value: TransactionsTableValue) => <TableCell value={value} />,
      },
      {
        key: 'attachements' as keyof Transaction,
        label: <Paperclip size="16px" />,
        sortable: true,
        onSort: () => toggleSort('attachements'),
        render: (value: TransactionsTableValue) => (
          <TableCell value={value} startIcon={<Paperclip size="16px" />} />
        ),
      },
    ],
    [toggleSort]
  );
};

export default useColumnsDef;

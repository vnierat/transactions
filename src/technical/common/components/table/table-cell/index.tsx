import { ReactNode } from 'react';
import { TransactionsTableValue } from '../../../../../business/transactions/types';
import isCurrenciesRates from '../../../../../business/transactions/utils/is-currencies-rates';
import CurrencyDisplay from '../../currency-display';

interface TableCellProps {
  startIcon?: ReactNode;
  value: ReactNode | TransactionsTableValue;
}

const TableCell = ({ value, startIcon = null }: TableCellProps) => {
  return (
    <div className="flex items-center gap-2">
      {startIcon}
      {isCurrenciesRates(value) ? <CurrencyDisplay amounts={value} /> : value}
    </div>
  );
};

export default TableCell;

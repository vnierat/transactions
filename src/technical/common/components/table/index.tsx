import { MouseEvent } from 'react';
import uuid from '../../utils/uuidv4';
import { Columns } from './index.types';

interface TableProps<T> {
  data: T[];
  sortColumn: keyof T;
  sortOrder: 'asc' | 'desc';
  columns: Columns<T>[];
  selectedRows: Set<string>;
  onSelect: (selected: Set<string>) => void;
}

const DataTable = <T extends { id: string }>({
  data,
  columns,
  sortColumn,
  sortOrder,
  selectedRows,
  onSelect,
}: TableProps<T>) => {
  const getSortIcon = (sortCol: keyof T, key: keyof T) => {
    if (sortCol === key) {
      return sortOrder === 'asc' ? (
        <div className="text-yellow-500">▲</div>
      ) : (
        <div className="text-yellow-500">▼</div>
      );
    }
    return null;
  };

  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    rowIndex: number
  ) => {
    const rowId = data[rowIndex].id;
    const newSelectedRows = new Set(selectedRows);

    if (event.shiftKey) {
      // Toggle de la sélection sans affecter les autres
      if (newSelectedRows.has(rowId)) {
        newSelectedRows.delete(rowId);
      } else {
        newSelectedRows.add(rowId);
      }
    } else {
      // Sélection normale : tout réinitialiser et sélectionner uniquement la ligne cliquée
      newSelectedRows.clear();
      newSelectedRows.add(rowId);
    }

    onSelect(newSelectedRows);
  };

  return (
    <div className="overflow-x-auto rounded">
      <table className="min-w-full shadow-md rounded-lg">
        <thead className="border-b-2 border-gray-400">
          <tr>
            {columns.map((col) => (
              <th
                key={uuid()}
                className={`p-4 text-left cursor-pointer select-none ${
                  sortColumn === col.key ? 'font-bold' : 'font-normal'
                }`}
                onClick={col.onSort}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && col.onSort && (
                    <div>{getSortIcon(sortColumn, col.key)}</div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isSelected = selectedRows.has(row.id);

            return (
              <tr
                key={row.id}
                className={`select-none hover:bg-blue-100 border-b border-gray-200 cursor-pointer ${
                  isSelected ? 'bg-blue-100' : ''
                }`}
                onClick={(event) => handleRowClick(event, rowIndex)}
              >
                {columns.map((col) => (
                  <td key={uuid()} className="p-6">
                    {col.render(row[col.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

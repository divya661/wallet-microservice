/* eslint-disable */
import { ITransactionTableRow } from 'components/TransactionPage';
import React from 'react';
import { Row } from 'react-table';

interface TableRowProps {
  row: Row<ITransactionTableRow>;
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell: any) => (
        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
      ))}
    </tr>
  );
};

export default TableRow;

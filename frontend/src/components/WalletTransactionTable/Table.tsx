/* eslint-disable */
import React from 'react';
import { useTable, useSortBy, TableState } from 'react-table';

import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';
import { ITransactionTableRow } from 'components/TransactionPage';
import './Table.css';

interface TableProps {
  columns: any;
  data: any;
}

type CustomTableState = TableState<ITransactionTableRow> & {
  sortBy: {
    id: string;
    desc: boolean;
  }[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const sortees = React.useMemo(
    () => [
      {
        id: 'amount',
        desc: true
      },
      {
        id: 'date',
        desc: true
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable<ITransactionTableRow>(
    {
      columns,
      data,
      initialState: {
        sortBy: sortees
      } as CustomTableState
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="custom-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeaderRow key={column.id} column={column} />
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return <TableRow key={row.id} row={row} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;

import React from 'react';

interface TableHeaderRowProps {
  column: any;
}

const TableHeaderRowProps: React.FC<TableHeaderRowProps> = ({ column }) => (
  <th {...column.getHeaderProps(column.getSortByToggleProps() ?? column)}>
    {column.render('Header')}
    <span key={`${column.id}_sort`}>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
  </th>
);

export default TableHeaderRowProps;

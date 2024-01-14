/* eslint-disable */
import React from 'react';
import { Column } from 'react-table';
import { ITransactionTableRow } from '../TransactionPage';
import { Container } from '../common/molecules/container';
import TransactionsExportButton from '../TransactionsExportButton';
import Pagination from './Pagination';
import Table from './Table';

interface WalletTransactionsProps {
  transactions: ITransactionTableRow[];
  currentPageNo: number;
  pageSize?: number;
  setCurrentPageNo: React.Dispatch<React.SetStateAction<number>>;
  fetchTransactions: (walletId: string, pageNo: number) => Promise<void>;
}

const WalletTransactions: React.FC<WalletTransactionsProps> = ({
  transactions,
  currentPageNo,
  fetchTransactions,
  setCurrentPageNo
}) => {
  const columns: Column<ITransactionTableRow>[] = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Balance', accessor: 'balance' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Description', accessor: 'description' }
    ],
    []
  );

  const data = React.useMemo((): ITransactionTableRow[] => transactions, [transactions]);

  return (
    <>
      <Container width="100%">
        <TransactionsExportButton />
      </Container>
      <Table columns={columns} data={data} />
      <Pagination
        currentPageNo={currentPageNo}
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setCurrentPageNo={setCurrentPageNo}
      />
    </>
  );
};

export default WalletTransactions;

import React from 'react';

import { ITransactionTableRow } from 'components/TransactionPage';
import { Button } from 'components/common/molecules/button';
import { Container } from 'components/common/molecules/container';

const Pagination: React.FC<{
  currentPageNo: number;
  transactions: ITransactionTableRow[];
  fetchTransactions: (walletId: string, pageNo: number) => Promise<void>;
  setCurrentPageNo: React.Dispatch<React.SetStateAction<number>>;
}> = ({ currentPageNo, transactions, fetchTransactions, setCurrentPageNo }) => {
  const previousPage = () => {
    setCurrentPageNo((prev) => prev - 1);
    const storedWalletId: string = localStorage.getItem('walletId') || '0';
    fetchTransactions(storedWalletId, currentPageNo - 1);
  };

  const nextPage = () => {
    setCurrentPageNo((prev) => prev + 1);
    const storedWalletId = localStorage.getItem('walletId') || '0';
    fetchTransactions(storedWalletId, currentPageNo + 1);
  };

  return (
    <Container flexDirection="row" marginTop="24px" gap="12px" justifyContent="center" width="100%">
      <Button
        onClick={previousPage}
        disabled={currentPageNo === 0}
        type="button"
        margin="0"
        height="20px"
        width="auto"
        padding="12px"
        borderRadius="5px"
      >
        Prev
      </Button>
      <Button
        onClick={nextPage}
        disabled={transactions.length === 0}
        type="button"
        margin="0"
        height="20px"
        width="auto"
        padding="12px"
        borderRadius="5px"
      >
        Next
      </Button>
    </Container>
  );
};

export default Pagination;

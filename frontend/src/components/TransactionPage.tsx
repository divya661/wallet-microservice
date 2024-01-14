import React, { useState, useEffect } from 'react';

import WalletTransactions from './WalletTransactionTable/WalletTransactions';
import TransactionForm from './TransactionForm';
import { errorHandler } from 'utils/errorHandlerUtil';
import { TRANSACTION_TYPES } from 'enums/globalEnums';
import { Container } from './common/molecules/container';
import transactionsService from 'services/transactionService';
import Loader from './common/atoms/loader/Loader';
import { useNavigate } from 'react-router-dom';

export interface ITransactionTableRow {
  id: string;
  amount: number;
  type: TRANSACTION_TYPES;
  date: string;
  balance: number;
  description: string;
}

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransactionTableRow[]>([]);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const storedWalletId = localStorage.getItem('walletId');

    if (storedWalletId && storedWalletId !== '0') {
      fetchTransactions(storedWalletId, currentPageNo);
    } else {
      navigate('/');
    }
  }, []);

  const fetchTransactions = async (walletId: string, pageNo: number) => {
    try {
      setIsLoading(true);
      const response = await transactionsService.fetchTransactions(walletId, pageNo, pageSize, pageSize);
      setTransactions(response);
    } catch (error) {
      errorHandler(error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransactions = (transaction: ITransactionTableRow) => {
    setTransactions((prev: ITransactionTableRow[]) => {
      const prevArray = prev.length ? [...prev] : [];
      return [transaction, ...prevArray];
    });
  };

  return (
    <>
      {isLoading && <Loader />}

      <Container
        paddingBottom="24px"
        paddingLeft="24px"
        paddingRight="24px"
        paddingTop="24px"
        width="100%"
        justifyContent="center"
      >
        <h2>Wallet Transactions</h2>
        <TransactionForm updateTransactions={updateTransactions} />
        {(transactions.length || currentPageNo > 0) && (
          <WalletTransactions
            transactions={transactions}
            currentPageNo={currentPageNo}
            setCurrentPageNo={setCurrentPageNo}
            fetchTransactions={fetchTransactions}
          />
        )}
      </Container>
    </>
  );
};

export default TransactionPage;

import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from './common/molecules/button';
import transactionsService from 'services/transactionService';
import { ITransactionTableRow } from './TransactionPage';
import { errorHandler } from 'utils/errorHandlerUtil';

const TransactionsExportButton = () => {
  const [transactions, setTransactions] = useState<ITransactionTableRow[]>([]);
  const [exportButtonClicked, setExportButtonClicked] = useState(false);
  const storedWalletId = localStorage.getItem('walletId') || '0';

  const fetchTransactions = async (walletId: string) => {
    try {
      const response = await transactionsService.fetchTransactions(walletId);
      setTransactions(response);
    } catch (error) {
      errorHandler(error);
      setTransactions([]);
    }
  };

  const exportTransactions = () => {
    //@ts-expect-error dom is always in painted condition what this component is called
    (document as Document).getElementById('csv-export-link').click();
  };

  useEffect(() => {
    if (exportButtonClicked) {
      exportTransactions();
      setExportButtonClicked(false);
    }
  }, [exportButtonClicked]);

  const fetchAndExportTransactions = async () => {
    try {
      await fetchTransactions(storedWalletId);
      setExportButtonClicked(true);
    } catch (error) {
      errorHandler(new Error('Error fetching or exporting transactions'));
      console.error('Error fetching or exporting transactions:', error);
    }
  };

  return (
    <div>
      <Button
        onClick={fetchAndExportTransactions}
        width="100%"
        height="48px"
        margin="0 0 24px 0"
        padding="12px"
        borderRadius="8px"
        type="button"
      >
        Export to CSV
      </Button>
      <CSVLink
        data={transactions}
        filename={`wallet_transactions ${new Date()}.csv`}
        id="csv-export-link"
        style={{ display: 'none' }}
      >
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default TransactionsExportButton;

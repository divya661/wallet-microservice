import React, { ChangeEvent, useState } from 'react';

import { TRANSACTION_TYPES } from '../enums/globalEnums';
import { Form } from './common/molecules/form';
import { Card } from './common/molecules/card';
import { Input } from './common/molecules/input';
import { Button } from './common/molecules/button';
import { Options, Select } from './common/atoms/select/Select';
import { Container } from './common/molecules/container';
import transactionsService from 'services/transactionService';
import { validateAmount, validateDescription } from 'utils/transactFormValidationUtils';
import { errorHandler } from 'utils/errorHandlerUtil';
import { ITransactionTableRow } from './TransactionPage';
import toast from '../components/common/NotificationToaster';
import { ToastTypes } from '../enums/toasterTypes';
import Loader from './common/atoms/loader/Loader';

interface TransactionFormProps {
  updateTransactions: (transaction: ITransactionTableRow) => void;
}

const TransactionForm = ({ updateTransactions }: TransactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState('');
  const [type, setType] = useState<TRANSACTION_TYPES>(TRANSACTION_TYPES.CREDIT);
  const walletId = localStorage.getItem('walletId') || '0';

  const transactionTypeOptions: Options<TRANSACTION_TYPES>[] = [
    { label: 'Credit', value: TRANSACTION_TYPES.CREDIT },
    { label: 'Debit', value: TRANSACTION_TYPES.DEBIT }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const formData = {
        amount: amount ?? 0,
        description,
        walletId
      };

      if (type === TRANSACTION_TYPES.DEBIT) {
        formData.amount *= -1;
      }

      const response = await transactionsService.transactByWalletId(formData);
      const data = response.data;
      updateTransactions({
        id: data.transactionId,
        amount,
        type,
        description,
        balance: data.balance,
        date: new Date().toLocaleDateString('en-IN')
      });
      setAmount(0);
      toast({ type: ToastTypes.SUCCESS, message: 'Transaction created successfully' });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newAmount = Number(e.target.value);
    setErrorAmount(validateAmount(newAmount));
    if (errorAmount.length) newAmount = 0;
    setAmount(newAmount);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    setErrorDescription(validateDescription(value));
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Form onSubmit={handleFormSubmit} width="100%">
        <Card
          width="100%"
          height="40%"
          paddingY="12px"
          paddingX="24px"
          marginX="10px"
          marginY="10px"
          flexDirection="row"
          justifyContent="space-between"
          gap="12px"
        >
          <Input
            id="amount"
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            value={amount ?? 0}
            onChange={handleAmountChange}
            hasError={!!errorAmount.length}
            errorMessage={errorAmount}
            required={true}
            type="number"
            width="25%"
          />

          <Select
            label="Transaction Type"
            options={transactionTypeOptions}
            handleTypeChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value as TRANSACTION_TYPES)}
            width="25%"
          />
          <Input
            id="description"
            name="description"
            label="Description"
            placeholder="Enter description"
            value={description ?? 0}
            onChange={handleDescriptionChange}
            hasError={!!errorDescription.length}
            errorMessage={errorDescription}
            required={true}
            type="string"
            width="25%"
          />
          <Container justifyContent="center" alignItems="center" width="20%" height="unset">
            <Button
              onClick={() => {}}
              type="submit"
              margin="0"
              height="40px"
              width="100%"
              padding="12px"
              borderRadius="5px"
              disabled={!!errorAmount.length || !!errorDescription.length}
            >
              Submit Transaction
            </Button>
          </Container>
        </Card>
      </Form>
    </>
  );
};

export default TransactionForm;

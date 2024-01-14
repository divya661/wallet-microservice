import React, { ChangeEvent, useState } from 'react';

import toast from '../components/common/NotificationToaster';
import { ToastTypes } from '../enums/toasterTypes';
import { Form } from '../components/common/molecules/form';
import { Card } from '../components/common/molecules/card';
import { Input } from '../components/common/molecules/input';
import { Button } from '../components/common/molecules/button';
import { Text } from '../components/common/atoms/text';
import { validateBalance, validateUsername } from '../utils/walletFormValidationUtils';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../constants/walletFormConstants';
import { errorHandler } from 'utils/errorHandlerUtil';
import walletService from 'services/walletService';
import Loader from './common/atoms/loader/Loader';

interface WalletFormProps {
  onSubmit: (id: string) => void;
}

const WalletForm: React.FC<WalletFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [initialBalance, setInitialBalance] = useState<number | null>(null);
  const [errorBalance, setErrorBalance] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setErrorUsername(validateUsername(value));
  };

  const handleBalanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInitialBalance(+value);
    setErrorBalance(validateBalance(+value));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      balance: initialBalance ?? 0,
      name: username
    };

    try {
      setIsLoading(true);
      const response = await walletService.setupWallet(formData);
      const walletId = response.data.id;
      onSubmit(walletId);
      toast({ type: ToastTypes.SUCCESS, message: 'Wallet created successfully' });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Form width="50%" onSubmit={handleFormSubmit}>
        <Card width="100%" height="50%" paddingY="12px" paddingX="24px" marginX="10px" marginY="10px">
          <Input
            id="Username"
            name="Username"
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            hasError={!!errorUsername.length}
            errorMessage={errorUsername}
            required={true}
            type="text"
            minLength={USERNAME_MIN_LENGTH}
            maxLength={USERNAME_MAX_LENGTH}
          />
          <Input
            id="initial_balance"
            name="initial_balance"
            label="Initial Balance"
            placeholder="Enter your initial balance"
            value={String(initialBalance ?? 0)}
            onChange={handleBalanceChange}
            hasError={!!errorBalance.length}
            errorMessage={errorBalance}
            required={false}
            type="number"
          />
          <Button
            onClick={() => {}}
            type="submit"
            margin="0"
            height="20px"
            width="100%"
            padding="12px"
            borderRadius="5px"
            disabled={!!errorBalance.length || !!errorUsername.length}
          >
            <Text>Submit</Text>
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default WalletForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import WalletForm from './WalletForm';
import { Container } from './common/molecules/container';
import { errorHandler } from 'utils/errorHandlerUtil';
import walletService from 'services/walletService';
import Loader from './common/atoms/loader/Loader';
import WalletInfo from './WalletInfo';

export interface IWallet {
  id: string;
  name: string;
  balance: string;
  date: string;
  transactionId: string;
}
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [walletId, setWalletId] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<IWallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedWalletId = localStorage.getItem('walletId');

    if (storedWalletId && storedWalletId !== '0') {
      setWalletId(storedWalletId);
      fetchWalletData(storedWalletId);
    }
  }, []);

  const fetchWalletData = async (walletId: string) => {
    try {
      setIsLoading(true);
      const response = await walletService.getById(walletId);
      setWalletData(response.data as IWallet);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSubmit = (id: string) => {
    setWalletId(id);
    localStorage.setItem('walletId', id);
    navigate('/transactions');
  };

  return (
    <>
      {isLoading && <Loader />}

      <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h2>Wallet Home</h2>
        {!walletId ? <WalletForm onSubmit={handleWalletSubmit} /> : <WalletInfo data={walletData as IWallet} />}
      </Container>
    </>
  );
};

export default HomePage;

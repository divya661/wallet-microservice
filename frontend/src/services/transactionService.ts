import { ITransactionTableRow } from 'components/TransactionPage';
import axiosPublicInstance from 'utils/axiosInstance';

const transactionsService = {
  fetchTransactions: async (walletId: string, pageNo?: number, limit?: number, pageSize?: number) => {
    const paramsObj: {
      walletId: string;
      limit?: number;
      skip?: number;
    } = {
      walletId
    };

    if (limit) {
      paramsObj['limit'] = limit;
    }

    if (pageNo) paramsObj['skip'] = pageNo * (pageSize ?? 0);
    const response = await axiosPublicInstance.get('/transactions', {
      params: paramsObj
    });

    return response.data as ITransactionTableRow[];
  },
  transactByWalletId: async ({
    walletId,
    amount,
    description
  }: {
    walletId: string;
    amount: number;
    description: string;
  }) => {
    const response = await axiosPublicInstance.post(`/transact/${walletId}`, { amount, description });
    return response;
  }
};

export default transactionsService;

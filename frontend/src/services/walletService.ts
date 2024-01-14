import axiosPublicInstance from 'utils/axiosInstance';

const walletService = {
  setupWallet: async (formData: { balance: number; name: string }) => {
    return axiosPublicInstance.post('/wallet/setup', formData);
  },
  getById: async (walletId: string) => {
    return axiosPublicInstance.get(`/wallet/${walletId}`);
  }
};

export default walletService;

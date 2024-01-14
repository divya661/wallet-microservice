import axios from 'axios';

import toast from '../components/common/NotificationToaster';
import { ToastTypes } from '../enums/toasterTypes';

export const errorHandler = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    const { data } = error.response;
    console.error(data);

    let message = '';
    if (data.error && typeof data.error == 'string') message = data.error;
    else if (data.errors && data.errors?.length) message = data.errors[0];
    else if (data?.error?.error) message = data.error.error;
    else message = error.message;

    if (!message.includes('No transactions found for Wallet ID')) {
      toast({ type: ToastTypes.ERROR, message: message });
    }
  } else {
    console.error('Unexpected error:', error);
    const message =
      error.errors & error.errors.length ? error.errors[0] : error.error ? error.error : JSON.stringify(error);
    toast({ type: ToastTypes.ERROR, message: message });
  }
};

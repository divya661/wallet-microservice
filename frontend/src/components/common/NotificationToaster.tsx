import React from 'react';
import { toast } from 'react-toastify';
import { FaInfo, FaCheck, FaExclamationTriangle, FaBug, FaExclamationCircle } from 'react-icons/fa';
import { ToastTypes } from '../../enums/toasterTypes';

export interface Toast {
  message: string;
  type: ToastTypes;
}

export const displayIcon = (type: ToastTypes) => {
  switch (type) {
  case ToastTypes.SUCCESS:
    return <FaCheck />;
  case ToastTypes.INFO:
    return <FaInfo />;
  case ToastTypes.ERROR:
    return <FaExclamationCircle />;
  case ToastTypes.WARNING:
    return <FaExclamationTriangle />;
  case ToastTypes.WARN:
    return <FaBug />;
  }
};

const ToastMessage = ({ type, message }: Toast) => {
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px', overflow:'hidden' }}>{message}</div>
    </div>
  );
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;

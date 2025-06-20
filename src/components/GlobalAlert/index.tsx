import React from 'react';
import {useAlertStore} from '@/lib/alertStore';
import {CustomAlert} from '@/components/CustomAlert';

export const GlobalAlert = () => {
  const {
    visible,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  } = useAlertStore();

  return (
    <CustomAlert
      visible={visible}
      title={title}
      message={message}
      confirmText={confirmText}
      cancelText={cancelText}
      onCancel={() => {
        useAlertStore.getState().hide();
        onCancel?.();
      }}
      onConfirm={() => {
        useAlertStore.getState().hide();
        onConfirm?.();
      }}
    />
  );
};

import {useAlertStore} from '@/lib/alertStore';

export const useAlert = () => {
  const show = useAlertStore(s => s.show);
  const hide = useAlertStore(s => s.hide);
  return {alert: show, dismiss: hide};
};

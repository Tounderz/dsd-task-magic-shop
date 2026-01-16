export type ToastType = 'success' | 'error' | 'warning';

export type ToastConfig = {
  message: string;
  type: ToastType;
  duration?: number;
}

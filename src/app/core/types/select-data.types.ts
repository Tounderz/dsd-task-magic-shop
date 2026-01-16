import {DeliveryMethod} from './delivery-method.types';
import {PaymentMethod} from './payment-method.types';

export type SelectData = {
  name: string | DeliveryMethod | PaymentMethod;
  label: string;
}

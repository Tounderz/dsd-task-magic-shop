import {OrderPotionModal} from './order-potion-modal';

describe('OrderPotionModal логика', () => {
  describe('fieldChanged', () => {
    it('должен принимать field и value параметры', () => {
      const method = OrderPotionModal.prototype.fieldChanged;
      expect(method.length).toBe(1);
    });
  });

  describe('isDisabledBtn', () => {
    it('должен быть функцией без параметров', () => {
      const method = OrderPotionModal.prototype.isDisabledBtn;
      expect(method.length).toBe(0);
    });
  });

  describe('handleClick', () => {
    it('должен быть функцией без параметров', () => {
      const method = OrderPotionModal.prototype.handleClick;
      expect(method.length).toBe(0);
    });
  });
});

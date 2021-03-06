import { ShoppingItem } from './shopping-item';
import { Food } from 'src/app/food';
import {Product} from 'src/app/product';

describe('ShoppingItem', () => {
  let shoppingItem: ShoppingItem;
  let food: Food;
  let food2: Food;
  const givenAmount = 2;

  beforeEach(() => {
    food = new Food(4, 'Kartoffeln', 'kg');
    food2 = new Food(1, 'Butter', 'kg');
    shoppingItem = new ShoppingItem(givenAmount, food);
  });

  it('should create an instance', () => {
    expect(shoppingItem).toBeTruthy();
  });

  describe('.toString()', () => {
    it('should start with the amount', () => {
      expect(shoppingItem.toString()).toBe('2 kg Kartoffeln');
    });

    describe('when product was attached', () => {
      it('should contain the product description', () => {
        let product = new Product(
          'Brandname', 'ProductDescription', 4.44, food.getId()
        );
        shoppingItem.attach(product)
        expect(shoppingItem.toString()).toContain(product.toString());
      });
    });
  });

  describe('#concat', () => {
    let otherShoppingItem: ShoppingItem;

    describe('when foods are the same', () => {
      it('should concatinate the amount', () => {
        let newAmount = 3;
        let otherShoppingItem = new ShoppingItem(newAmount, food);
        shoppingItem.concat(otherShoppingItem);
        expect(shoppingItem.getAmount()).toEqual(newAmount + givenAmount);
      });
    });
  });

  describe('#hasSameFood', () => {
    describe('when food is the same', () => {
      it('should return true', () => {
        const isSame = shoppingItem.hasSameFood(shoppingItem);
        expect(isSame).toEqual(true);
      });
    });

    describe('when food differs', () => {
      it('should return false', () => {
        let otherShoppingItem = new ShoppingItem(2, food2);
        const isSame = shoppingItem.hasSameFood(otherShoppingItem);
        expect(isSame).toEqual(false);
      });
    });
  });

  describe('#onePlus()', () => {
    it('increased the amount by 1', () => {
      shoppingItem.onePlus();
      expect(shoppingItem.getAmount()).toEqual(givenAmount + 1);
    });
  });

  describe('#onePlus()', () => {
    it('decreases the amount by 1', () => {
      shoppingItem.oneMinus();
      expect(shoppingItem.getAmount()).toEqual(givenAmount - 1);
    });

    describe('when amount is 0', () => {
      it('does not descrease the number', () => {
        shoppingItem = new ShoppingItem(0, food);
        shoppingItem.oneMinus();
        expect(shoppingItem.getAmount()).toEqual(0);
      });
    });
  });
});

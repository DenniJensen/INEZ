import { Food } from 'src/app/food';

export class ShoppingItem {
  private checked: boolean;
  private productAttached: boolean;

  static fromObject(shoppingItemObject: Object): ShoppingItem {
    const food = Food.fromObject(shoppingItemObject['food']);
    const amount = shoppingItemObject['amount'];
    return new ShoppingItem(amount, food);
  }

  constructor(private amount: number, private food: Food) {
    this.checked = false;
    this.productAttached = false;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getFoodId(): number {
    return this.food.getId();
  }

  public setChecked(checked: boolean): void {
    this.checked = checked;
  }

  public getChecked(): boolean {
    return this.checked;
  }

  public toString(): string {
    return `${this.amount} ${this.food.toString()}`
  }

  public onePlus() {
    this.amount++;
  }

  public oneMinus() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public hasSameFood(otherItem: ShoppingItem): boolean {
    return this.getFoodDescription() === otherItem.getFoodDescription();
  }

  public hasProductAttached(): boolean {
    return this.productAttached;
  }

  private getFoodDescription(): string {
    return this.food.getDescription();
  }

  public concat(otherItem: ShoppingItem): ShoppingItem {
    const concatAmount = this.amount + otherItem.amount;
    return new ShoppingItem(concatAmount, this.food);
  }
}

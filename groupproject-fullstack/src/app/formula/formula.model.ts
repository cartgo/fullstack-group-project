
export class Formula {
  itemId:number;
  name: string;
  costCode: number;
  constructor(itemId: number,name: string, costCode: number) {
    this.itemId= itemId;
    this.name = name;
    this.costCode = costCode;
  }
}

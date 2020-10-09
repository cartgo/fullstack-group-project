import { Extra } from './extra.model';

export class Formula {
  itemId:number;
  name: string;
  costCode: number;
  editable:string;
  stringExtraColumnMap:Map<String,Extra>;
  constructor(itemId: number,name: string, costCode: number,editable:string,stringExtraColumnMap:Map<String,Extra>) {
    this.itemId= itemId;
    this.name = name;
    this.costCode = costCode;
    this.editable=editable;
    this.stringExtraColumnMap = stringExtraColumnMap;
  }
}

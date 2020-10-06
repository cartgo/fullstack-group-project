export class Template {
    columnName: string;
    columnType: string; 
    formula: string;
    constructor(columnName: string, columnType: string, formula:string) {
      this.columnName = columnName;
      this.columnType = columnType;
      this.formula = formula;
    } 
  }
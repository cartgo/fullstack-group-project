import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Template } from './template.model';
import { FormulaService } from '../service/formula.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

 // displayArray:Array<string>;
  displayArray= new Array();
  uniqueArray= new Array();
  selectedType = '';
  colForm: FormGroup;
  template: Template[];
  getColumnData: string[];

  constructor(private fb: FormBuilder, private formulaService: FormulaService) { }

  ngOnInit() {
    this.colForm = this.fb.group({
      columns: this.fb.array([this.getcolumn()])
    });

    this.formulaService.getColumn().subscribe((data) => {
      //console.log(data);
      this.getColumnData = data;
    });

  }

  get columnForms() {
    return this.colForm.get('columns') as FormArray
    //console.log(this.colForm.get('columns'));
  }

  private getcolumn() {
    return this.fb.group({
      columnName: [],
      columnType: [],
      formula: [],
    });
  }

  addcolumn() {

    const column = this.fb.group({ 
      columnName: [],
      columnType: [],
      formula: [],
    })

    this.columnForms.push(column);
  }

  deleteColumn(i) {
    this.columnForms.removeAt(i)
  }


 onSubmit():void {
    for (var column of this.colForm.value.columns) {
      //let f=column.columnName;
      //let t=column.columnType;
      //let temp:Template;
      //temp=column;
      if(column.columnName!=null && column.columnType!=null)
      {
      console.log(column.columnName,column.columnType,column.formula);
      this.displayArray.push(column.columnName);
      this.formulaService.addColumn(column);
      }
    }
    this.uniqueArray = [...new Set(this.displayArray)];
    console.log(this.uniqueArray);
    this.formulaService.testMethod(this.uniqueArray);
   
    //window.location.replace('/search/formula');
  }
 

  dynamicCheck(data,event){
    if(event.checked==true){
    this.displayArray.push(data);
    console.log(this.displayArray);
    }
    if(event.checked==false){
      const index = this.displayArray.indexOf(data);
      if (index > -1) {
      this.displayArray.splice(index, 1);
        }
      //this.displayArray.pop();
      console.log(this.displayArray)
    }
  }

  //get columnsToDisplay(){
  //  return this.uniqueArray;
 // }
 

}

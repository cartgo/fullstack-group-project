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


  displayArray= new Array();
  selectedType = '';
  colForm: FormGroup;
  template: Template[];

  constructor(private fb: FormBuilder, private formulaService:FormulaService) { }

  ngOnInit() {
    this.colForm = this.fb.group({
      columns: this.fb.array([this.getcolumn()])
    })

  }

  get columnForms() {
    return this.colForm.get('columns') as FormArray
    console.log(this.colForm.get('columns'));
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
      console.log(column.columnName,column.columnType,column.formula);
      this.formulaService.addColumn(column);
      console.log(this.displayArray);
     // window.location.replace('/search/formula');
    }
  }
 
  name(event){
    this.displayArray.push("name");
    console.log(event.checked)
    console.log(this.displayArray);
  }

  cost_code(event){
    this.displayArray.push("cost_code");
    console.log(event.checked)
    console.log(this.displayArray);
  }

  editable(event){
    this.displayArray.push("editable");
    console.log(event.checked)
    console.log(this.displayArray);
  }

  item_id(event){
    this.displayArray.push("item_id");
    console.log(event.checked)
    console.log(this.displayArray);
  }
 

}

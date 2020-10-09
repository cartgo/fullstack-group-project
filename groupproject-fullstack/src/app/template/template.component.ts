import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Template } from './template.model';
import { FormulaService } from '../service/formula.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../project/project.service';

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
  basicColumns=['name','costCode']  
  columnnames;
  constructor(private fb: FormBuilder, private formulaService: FormulaService, private projectservice:ProjectService) { }

  ngOnInit() {

    this.projectservice.getformula().subscribe(data=>{
      console.log(data);
      // this.formulas = data;
      // var testformula =Object.assign(data)[0].stringExtraColumnMap;
      this.columnnames = this.basicColumns.concat(Object.keys(Object.assign(data)[0].stringExtraColumnMap))
      this.getColumnData =this.columnnames
      console.log(this.getColumnData);
      this.getColumnData.push("itemId")
      this.getColumnData.push("editable")
    })
  
    this.colForm = this.fb.group({
      columns: this.fb.array([this.getcolumn()])
    });

    // this.formulaService.getColumn().subscribe((data) => {
    //   //console.log(data);
    //   this.getColumnData = data;
    // });

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



      let fml;
      fml = column.formula;
      if(fml == null){fml = "none"}
      this.formulaService.addformulacolumn(column.columnType,column.columnName,this.projectservice.selectedProjectCode,fml)



      // this.formulaService.addColumn(column);
      }
    }
    this.uniqueArray = [...new Set(this.displayArray)];
    console.log(this.uniqueArray);
    this.formulaService.testMethod(this.uniqueArray);
    console.log(this.formulaService.testMethod2()+"aaaaaaaaaaaaaaaa")
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
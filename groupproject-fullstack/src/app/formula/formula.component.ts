import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { prototype } from 'events';
import { Project } from '../project/project.model';
import { ProjectService } from '../project/project.service';
import { Resource } from '../project/resource.model';
import { FormulaService } from '../service/formula.service';
import { ResourceService } from '../service/resource.service';
import { Extra } from './extra.model';
import { Formula } from './formula.model';
import {MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {


  constructor(public projectservice: ProjectService, 
    public http:HttpClient,
    public resourceservice:ResourceService,
    public route: ActivatedRoute,
    public formulaservice:FormulaService
    ) {
      console.log(123)
      }

testarray = this.formulaservice.testMethod2();
  selectedElement;
  selectedColumn;
  formulas;
  checkformulasource;
  updatedformula = new Array;
  basicColumns=['name','costCode']  
  displayedColumns = ['name','costCode'];
  columnnames;

test = [];
  ngOnInit(): void {
    this.projectservice.getformula().subscribe(data=>{
              console.log(data);
              this.formulas = data;
              // var testformula =Object.assign(data)[0].stringExtraColumnMap;
              this.columnnames = this.basicColumns.concat(Object.keys(Object.assign(data)[0].stringExtraColumnMap))
              console.log(this.columnnames)
              this.displayedColumns = this.columnnames
    


              this.checkformulasource = new MatTableDataSource<any>(Object.assign(this.formulas));
              console.log("formulas:"+JSON.stringify(data))

              this.testarray = this.formulaservice.testMethod2();
              console.log(this.formulaservice.testMethod2()+"aaaaaaaaaaaaaaaa")
              console.log(this.testarray+"bbbbbbbbbbbbbbbbbbbbbbbbb")
              if(this.testarray.length >0 ){this.displayedColumns = this.testarray}
              this.checkformulasource.paginator = this.checkedpaginator;

              })
    console.log(456)
   }

   @ViewChild('checkedpaginator') checkedpaginator: MatPaginator;
   ngAfterViewInit() {
     this.checkformulasource.paginator = this.checkedpaginator;
  }

  
  focusout(x, element,column){
    
  element.costCode = x;

  let has = false;
  for(let f  of this.updatedformula){
    if(f.itemId == element.itemId){
      f.costCode = element.costCode;has = true;
      break;
    }
  }
  if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode,
    element.stringExtraColumnMap));}


  console.log(this.updatedformula);
  this.selectedElement = null;this.selectedColumn = null;

}


keydown(event, element,column){
  if(event.keyCode == 13){
    // console.log("clomun FOR COSTCODE now:"+JSON.stringify(column))

      element.costCode = event.target.value;

      console.log( "xxxxxxxxxxxxxxxxxxxxxxx"+element.costCode)

  let has = false;
  for(let f  of this.updatedformula){
    if(f.itemId == element.itemId){
      f.costCode = element.costCode;has = true;
      break;
    }
  }
  if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode,
  element.stringExtraColumnMap));}


  // this.updatedformula.push(new Formula(element.name, element.costCode));
  console.log(this.updatedformula);
  this.selectedElement = null;this.selectedColumn = null;
  }
  }

  
  keydown2(event, element,column,map){
    if(event.keyCode == 13){
      if(event.target.value == ''){    
        this.selectedElement = null;this.selectedColumn = null;
        return}
      if(map[column].type=="Text"){
        map[column].extraString = event.target.value 
      }
      if(map[column].type=="Number"){map[column].extraNum = event.target.value }
      if(map[column].type=="Formula"){map[column].extraFormula = event.target.value }

      // console.log("type is"+map[column].type);
      // if(map[column].type=="Text"  && Number(event.target.value)==NaN){ 
      // map[column].extraString = event.target.value }
      //   if(map[column].type=="Number"  &&  Number(event.target.value)!=NaN){ 
      //   map[column].extraString = event.target.value }
      //   else if(map[column].type=="Formula"  && Number(event.target.value)==NaN){ 
      //     map[column].extraString = event.target.value }
      //     else{alert("please input"+map[column].type)}


    let has = false;
    for(let f  of this.updatedformula){
      if(f.itemId == element.itemId){
        f.stringExtraColumnMap = map;has = true;
        break;
      }
    }


    if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode,map));}
  
  
    // this.updatedformula.push(new Formula(element.name, element.costCode));
    console.log("updated formula:"+this.updatedformula);
    this.selectedElement = null;this.selectedColumn = null;
    }
    }



  focusout2(x, element,column,map){
    if(x== ''){    
      this.selectedElement = null;this.selectedColumn = null;
      return}
    if(map[column].type=="Text"){
      map[column].extraString = x
    }
    if(map[column].type=="Number"){map[column].extraNum = x}
    if(map[column].type=="Formula"){map[column].extraFormula = x }      
      let has = false;
      for(let f  of this.updatedformula){
        if(f.itemId == element.itemId){
          f.stringExtraColumnMap = map;has = true;
          break;
        }
      }
  
    if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode,map));}
  
  
    console.log(this.updatedformula);
    this.selectedElement = null;this.selectedColumn = null;
  
  }

  

  updateFormula(updatedformula:Formula[]){
    for(let i of updatedformula){
      this.projectservice.updateFormula(i).subscribe();
      // this.projectservice.
    }

  }



  onsubmit(){
    this.updateFormula(this.updatedformula);

  }




 
 
}

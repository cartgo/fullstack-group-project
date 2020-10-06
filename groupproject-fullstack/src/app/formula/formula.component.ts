import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project/project.model';
import { ProjectService } from '../project/project.service';
import { Resource } from '../project/resource.model';
import { ResourceService } from '../service/resource.service';
import { Formula } from './formula.model';

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
    ) {
      console.log(123)
      }



  selectedElement;
  formulas;
  checkformulasource;
  updatedformula = new Array;
  displayedColumns = [  'resourceName','costCode'];

  ngOnInit(): void {
    this.projectservice.getformula().subscribe(data=>{
              console.log(data);
              this.formulas = data;
              this.checkformulasource = new MatTableDataSource<any>(Object.assign(this.formulas));
              console.log("formulas:"+JSON.stringify(data))
              })
    console.log(123)
   }


  focusout(x, element){
  element.costCode = x;

  let has = false;
  for(let f  of this.updatedformula){
    if(f.itemId == element.itemId){
      f.costCode = element.costCode;has = true;
      break;
    }
  }
  if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode));}

  console.log(this.updatedformula);
  this.selectedElement = null;

}

keydown(event, element){
  if(event.keyCode == 13){
  element.costCode = event.target.value;
  let has = false;
  for(let f  of this.updatedformula){
    if(f.itemId == element.itemId){
      f.costCode = element.costCode;has = true;
      break;
    }
  }
  if(has == false){this.updatedformula.push(new Formula(element.itemId, element.name, element.costCode));}


  // this.updatedformula.push(new Formula(element.name, element.costCode));
  console.log(this.updatedformula);
  this.selectedElement = null;
  }
  }

  updateFormula(updatedformula:Formula[]){
    for(let i of updatedformula){
      this.projectservice.updateFormula(i.itemId,i.costCode).subscribe();
      // this.projectservice.
    }

  }



  onsubmit(){
    this.updateFormula(this.updatedformula);

  }





  // addColumn(newC: Array<string>) {
  //   for(let name of newC){
  //     var coulmnName = name;
  //     console.log(coulmnName);
      
  //   for (var val of this.formulas) {
  //     val['columnName'] = '';
  //   }
  //   this.displayedColumns.push(coulmnName);
  //   this.checkformulasource = new MatTableDataSource<any>(Object.assign(this.formulas));
  //   }
  // }

  // test(){
  //   this.addColumn(['aaa','bbb'])
  // }


 
}

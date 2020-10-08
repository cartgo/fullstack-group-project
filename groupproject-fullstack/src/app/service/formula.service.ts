import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../template/template.model';
import { ProjectService } from '../project/project.service';
​
const API_URL = 'http://localhost:8080/projectScope/';
​
@Injectable({
  providedIn: 'root'
})
export class FormulaService {


​  
  templates: Template;
  constructor(private projectservice:ProjectService, private http: HttpClient) { }
​  selectedProjectCode = this.projectservice.selectedProjectCode;
  formula: string;
  test= new Array();
 
  //formulaArray: Template[];
 
​
  addColumn(template:Template){
    //for(let t of template){
        this.formula=template.formula;
        let api = API_URL+"addcolumn?columnName="+template.columnName+ "&columnType="+template.columnType;
        this.http.put<Template>(api,{}).subscribe();
       // }
       //this.formulaArray.push(template);
    }
​
    getColumn(){
      let api = API_URL+'getColumns';
      return this.http.get<string[]>(api);
    }
​
    testMethod(array){
      this.test=array;
      //return this.test;
    }
​
    testMethod2(){
      return this.test;
    }













  ​
    ​addformulacolumn(type, name, projectCode,formula){
      let api = "http://localhost:8080/projectScope/addco?type="+type+"&name="+name+"b&projectCode="+this.selectedProjectCode+"&formula="+formula
      this.http.put(api,{}).subscribe();
    }

  
​
}
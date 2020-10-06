import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../template/template.model';


const API_URL = 'http://localhost:8080/projectScope/';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {


  templates: Template;
  constructor(private http: HttpClient) { }

  formula: string;
 
  //formulaArray: Template[];
 

  addColumn(template:Template){
    //for(let t of template){
        this.formula=template.formula;
        let api = API_URL+"addcolumn?columnName="+template.columnName+ "&columnType="+template.columnType;
        this.http.put<Template>(api,{}).subscribe();
       // }
       //this.formulaArray.push(template);
    }


  

}

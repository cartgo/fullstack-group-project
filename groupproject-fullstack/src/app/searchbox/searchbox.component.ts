 import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup,} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { ProjectService } from '../project/project.service';
// import (ProjectModel)
import { Router } from '@angular/router';

import{Project} from "../project/project.model"
import { HttpClient } from '@angular/common/http';
import{ProjectComponent} from '../project/project.component';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  public searchInput: String = '';

  constructor(private projectservice:ProjectService,public http:HttpClient, public router:Router){

  }
  public seriesList;

  public searchResult: Project[] = [];
  
  flag:boolean;

  ngOnInit() {
    // this.getPost().subscribe
    this.projectservice.getData().subscribe(projectdata => {
      this.seriesList = projectdata,
      console.log(JSON.stringify(this.seriesList))   
        });
    this.flag = true;
  }
  fetchSeries(event: any) {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
   

    this.searchResult = this.seriesList.filter((series) => {
      // console.log(series.projectName);
      return series.projectName.toLowerCase().startsWith(event.target.value.toLowerCase());
    });
    // console.log("searchresult"+this.searchResult)
  }

  selectProject(p){
   this.p = p;
   let v = p.projectCode;
   this.flag = false;
   alert("clicked")
   
   this.router.navigateByUrl("/resource") 
   this.projectservice.selectedProjectCode = v;
   this.router.navigateByUrl("/search/project") 
    
   console.log(v);
  }
  p:Project;

  doIn(): void {
    this.flag = false;
    alert("clicked")
    this.router.navigateByUrl("/search/project") 
    }

}


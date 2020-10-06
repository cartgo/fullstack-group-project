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
  public showallresult: Project[] = [];
  public searchResult: Project[] = [];
  
  flag:boolean;

  ngOnInit() {
    // this.getPost().subscribe
    this.projectservice.getData().subscribe(projectdata => {
      this.seriesList = projectdata;
      console.log(JSON.stringify(this.seriesList))   
        });
    this.flag = true;
    this.click();
    

  }
  fetchSeries(event: any) {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.seriesList.filter((series) => {
       return series.projectName.toLowerCase().startsWith(event.target.value.toLowerCase());
    });
   }
  
   toggleboolean = false;

   click(){
    if (this.toggleboolean===false){
      this.toggleboolean = true;}else{this.toggleboolean = true};

     if(this.toggleboolean){
      this.searchResult = this.seriesList.filter((series) => {
         return series.projectName.toLowerCase();
      });}
      else{this.hideList()}

   }
   hideList(){
     if(this.toselect ===false){
     this.searchResult = [];}
   }

   toselect: boolean

  selectProject(p){
    this.toselect = true;

  this.projectservice.selectp(p)
   window.location.reload();
    }

}
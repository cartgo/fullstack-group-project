import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TokenStorageService } from 'src/app/service/token-storage.service';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import{Project} from "./project.model"
import { environment } from "../../environments/environment";
import { Resource } from './resource.model';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import {ProjectComponent} from './project.component';
import { Observable } from 'rxjs';
import { ResourceService } from '../service/resource.service';
const BACKEND_URL = environment.apiUrl + "/project/";

@Injectable({ providedIn: "root" })
export class ProjectService {
   projects: Project[] = [];
  // var projects;
  // projects;
   project:Project;
   resources: Resource[]=[];
   allresources: Resource[]=[];
   users:Array<any>;
   //username:string = this.token.getUser().username;
   //uId:string = this.token.getUser().id.toString(); 
   username:string
   uId:string
  selectedProjectCode = localStorage.getItem("currentproject");
  //selectedProjectCode=3;
  constructor(public http:HttpClient, private router: Router, private token: TokenStorageService
    ,public userservice:UserService ,public resourceservice:ResourceService ) { }


  p: Project;

  selectp(p){
    
    this.p = p;
    let v = p.projectCode;
    // alert("clicked")
    localStorage.setItem("currentproject", v)
    console.log('now project change to'+this.selectedProjectCode)

    console.log(v);

  }

  getData(){
    this.uId= this.token.getUser().id.toString(); 
    let api = "http://localhost:8080/project/"+"getByUserId?userId="+this.uId ;
    return this.http.get<Project[]>(api);
    // .subscribe(data => console.log(data));//data => this.projects = data
  }


  addResource(rr:Resource[]){
    this.uId= this.token.getUser().id.toString(); 
    for(let r of rr){
        let api = "http://localhost:8080/project/addResource?resourceCode="+r.resourceCode+ "&projectCode="+this.selectedProjectCode+"&userId="+this.uId;
        this.http.put<Resource>(api,{}).subscribe(data => this.resources.push(data))
        }
    }


    getResource(){
      this.uId= this.token.getUser().id.toString(); 
        let api = "http://localhost:8080/project/getProjectResource?projectCode="+this.selectedProjectCode+"&userId="+this.uId;
        return this.http.get<Resource[]>(api);
        // .subscribe(data => this.resources = data);
    }

    getResource2(): Observable<any> {
      this.uId= this.token.getUser().id.toString(); 
      let api = "http://localhost:8080/project/getProjectResource?projectCode="+this.selectedProjectCode+"&userId="+this.uId;

      return this.http.get(api);
    }


    getAllResource(){
        let api = "http://localhost:8080/resource/getAll";
        return this.http.get<Resource[]>(api);
        // .subscribe(data => this.allresources = data)
    }

    getAllResource2():Observable<any>{
      let api = "http://localhost:8080/resource/getAll";
      return this.http.get(api);
      // 
    }



    deleteResource( resourceCode:string, projectCode: string){
        let api = "http://localhost:8080/project/deleteResource?resourceCode="+resourceCode+"&projectCode="+this.selectedProjectCode; 
        return this.http.delete(api).subscribe()
    
    }


/////////【【【【【【【【【【NONONONONONONONONONONONONONONONONONONONONONONONONONO【【【【【【【【【【【【【【【【【【【【【【【【【【【///////
addPost(resource: Project){  //// ///////////////////////test, should be Resource[]
  this.uId= this.token.getUser().id.toString(); 
    let api =BACKEND_URL +"addResource";
    return this.http.put(api+"?resourceCode="+resource.projectCode
    +resource.projectName
    +localStorage.getItem(this.uId),{})
    .subscribe(data => console.log(data));  //?resourceCode=4&projectCode=33&userId=1
  }



/////////【【【【【【【【【【NONONONONONONONONONONONONONONONONONONONONONONONONONO【【【【【【【【【【【【【【【【【【【【【【【【【【【///////
// createData(){
//     let api = "http://localhost:8080/project/add?projectCode=" + 666+"&projectName="+"prj666"+"&userId=1";
//     return this.http.post<Project[]>(api,{}).subscribe(data => this.projects = data); //return this.http.post(api,data)
// }
/////////【【【【【【【【【【NONONONONONONONONONONONONONONONONONONONONONONONONONO【【【【【【【【【【【【【【【【【【【【【【【【【【【///////


}
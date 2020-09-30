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
const BACKEND_URL = environment.apiUrl + "/project/";

@Injectable({ providedIn: "root" })
export class ProjectService {
   projects: Project[] = [];
   project:Project;
   resources: Resource[]=[];
   allresources: Resource[]=[];
   users:Array<any>;
   username:string = this.token.getUser().username;
   uId:string = this.token.getUser().id.toString(); 
    selectedProjectCode:string = "3";

  constructor(public http:HttpClient, private router: Router, private token: TokenStorageService
    ,public userservice:UserService ) { }
    
  getData(){
    let api = "http://localhost:8080/project/"+"getByUserId?userId="+this.uId ;
    return this.http.get<Project[]>(api).subscribe(data => this.projects = data);
  }

  addResource(rr:Resource[]){
    for(let r of rr){
    
        let api = "http://localhost:8080/project/addResource?resourceCode="+r.resourceCode+ "&projectCode="+this.selectedProjectCode+"&userId="+this.uId;
        this.http.put<Resource>(api,{}).subscribe(data => this.resources.push(data))
        }
    }


    getResource(){
        let api = "http://localhost:8080/project/getProjectResource?projectCode="+this.selectedProjectCode+"&userId="+this.uId;
        return this.http.get<Resource[]>(api).subscribe(data => this.resources = data);
    }


    getAllResource(){
        let api = "http://localhost:8080/resource/getAll";
        return this.http.get<Resource[]>(api).subscribe(data => this.allresources = data);
    }


    deleteResource( resourceCode:string, projectCode: string){
        let api = "http://localhost:8080/project/deleteResource?resourceCode="+resourceCode+"&projectCode="+resourceCode; 
        // let api = "http://localhost:8080/project/deleteResource?resourceCode=223&projectCode=3";
        return this.http.delete(api).subscribe()
            // this.resources
            // = data.filter(ele => {return ele.resourceCode !== 4}) );
    }


/////////【【【【【【【【【【NONONONONONONONONONONONONONONONONONONONONONONONONONO【【【【【【【【【【【【【【【【【【【【【【【【【【【///////
addPost(resource: Project){  //// ///////////////////////test, should be Resource[]
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
 


import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy  } from '@angular/core';

import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import{Project} from "./project.model"
// import {MysService} from "./project.service";

import { environment } from "../../environments/environment";
import { Resource } from './resource.model';
// import { Post } from "./post.model";
const BACKEND_URL = environment.apiUrl + "/project/";

@Injectable({ providedIn: "root" })
export class ProjectService {
   projects: Project[] = [];
   project:Project;
   resources: Resource[]=[];
//   private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
//   newPost: Observable<Object>;
  constructor(public http:HttpClient, private router: Router) {}
userId: number = 1;
//////////////////////【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【//////////////////////
test(){
    let api = "http://localhost:8080" + "/test";
    return this.http.get<Project[]>(api);
}
/////////【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【///////

  getData(){
    // let api = BACKEND_URL + "getAll"; //////////////////////////////////////////test
    // let api = BACKEND_URL + " getProjectResource?projectCode=" +"33"+"&userId="+ "1";
    let api = BACKEND_URL+"getAll"
    return this.http.get<Project[]>(api).subscribe(data => this.projects = data);

    // return this.http.get<Project[]>(api).subscribe(data => this.projects = data);

    localStorage.setItem("userId", "1");////////test
    // const userId =localStorage.getItem("userId");////////////////////test

  }
 
/////////【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【///////
// createData(){
//     let api = "http://localhost:8083/project/add?projectCode=" + 666+"&projectName="+"prj666"+"&userId=1";
//     return this.http.post<Project[]>(api,{}).subscribe(data => this.projects = data); //return this.http.post(api,data)
// }

addResource(){
    let api = "http://localhost:8080/project/addResource?resourceCode="+"2"+ "&projectCode=33"+"&userId=1";
    return this.http.put<Resource>(api,{}).subscribe(data => this.resources.push(data))
}

getResource(){
    let api = "http://localhost:8080/project/getProjectResource?projectCode=33&userId=1";
    return this.http.get<Resource[]>(api).subscribe(data => this.resources = data);
}

deleteResource(){
    let api = "http://localhost:8080/project/getProjectResource?projectCode=33&userId=1";
    return this.http.delete<Resource[]>(api).subscribe(data => 
        this.resources= data.filter(ele => {return ele.resourceCode !== 4}) 
         );
}




// //post
  createPost(data) {
    // const data = {
    //   id: this.posts.length,
    //   userId: 23,
    //   title: 'My New Post',
    //   body: 'Hello World!'
    // } 
    let api = "https://jsonplaceholder.typicode.com/posts";
    // return this.http.post(api,data);
     return this.http.post(api,data).subscribe(data => console.log(data));
 }




///////////////////////////////////////////////【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【//////////////////////
  addPost(resource: Project){  //// ///////////////////////test, should be Resource[]
    let api =BACKEND_URL +"addResource";
    return this.http.put(api+"?resourceCode="+resource.projectCode
    +resource.projectName
    +localStorage.getItem("userId"),{})
    .subscribe(data => console.log(data));  //?resourceCode=4&projectCode=33&userId=1
  }

///////////////////////////////////////////////【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【/////////////////////

 //delete
deletePost(id:number){
  let api = "https://jsonplaceholder.typicode.com/posts/";
  // return this.http.delete(api+id);
  return this.http.delete(api+id).subscribe(data => console.log(data));
  
}


//  thispost: any;
// updatePost( id: number,
//   userId?: number,
//   title?: string,
//   body?: string){
//    let api = "https://jsonplaceholder.typicode.com/posts/"+id;
//   return this.http
//       .put(api,this.thispost);
//     }
 
}
 


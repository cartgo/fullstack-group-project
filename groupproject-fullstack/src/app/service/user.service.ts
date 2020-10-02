import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

 

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'getAll');
   // { responseType: 'text' }
  }

  getCreateTime(id): Observable<any> {
    return this.http.get(API_URL + 'getCreateTime?id='+id);
   // { responseType: 'text' }
  }

 /* getData(){
    let api = "http://localhost:8080/project/"+"getByUserId?userId="+this.uId ;
    return this.http.get<Project[]>(api).subscribe(data => this.projects = data);
  }*/

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
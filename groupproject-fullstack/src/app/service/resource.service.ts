import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../resource/resource.model';
import { Subscription } from 'rxjs';

const API_URL = 'http://localhost:8080/resource/';
const API_URL1 = 'http://localhost:8080/projectScope/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  getAllResource(): Observable<any> {
    return this.http.get(API_URL + 'getAll');
  }

  addResource(resource: Resource) {
    return this.http
      .post(
        API_URL +
          'add' +
          '?resourceCode=' +
          resource.resourceCode +
          '&resourceName=' +
          resource.resourceName,

        httpOptions
      )
      .subscribe((data) => console.log(data));
  }

  deleteAllResource(): Observable<any> {
    return this.http.get(API_URL + 'deleteAll');
  }

  // http://localhost:8080/projectScope/resource/addcolumn?columnName=Hola1
  addColumn(coulmnName : string) {
    return this.http.put(API_URL1 + 'resource/addcolumn' +
    '?columnName='+ coulmnName, httpOptions)
  } 
}

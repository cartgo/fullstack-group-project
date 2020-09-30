import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../resource/resource.model';
import { Subscription } from 'rxjs';

const API_URL = 'http://localhost:8080/resource/';

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
}

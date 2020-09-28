import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {
  //public allResource;
  public listResource: Resource[];
  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService
      .getAllResource()
      .subscribe((resourceData) => (this.listResource = resourceData));
  }
  addRow() {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = ` 
      <br> 
      <input type="text">`;
    document.getElementById('this.').appendChild(row);
  }
}

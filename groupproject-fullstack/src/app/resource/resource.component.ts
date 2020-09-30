import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {
  //public allResource;
  listResource: Resource[];
  // resource_code: string;
  // resource_name: string;
  displayedColumns: string[] = ['Resource_Code', 'Resource_Name'];
  discardList: Resource[];
  dataSource;
  //"+" drop down
  addMethods = new FormControl();
  addMethodsList: string[] = ['Add Row', 'Add Column', 'Insert CSV'];
  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.getAllResource().subscribe((resourceData) => {
      console.log(resourceData);
      this.listResource = resourceData;
      this.discardList = resourceData;
      this.dataSource = new MatTableDataSource(this.listResource);
    });
  }

  addRow() {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = ` 
      <br> 
      <input type="text" [(ngModel)] = 'resource_code'>
      <input type="text"  [(ngModel)] = 'resource_name'>`;
    document.getElementById('addRows').appendChild(row);
    // console.log(this.resource_code);
    // console.log(this.resource_name);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @Output()
  submit() {}

  discard() {}
}

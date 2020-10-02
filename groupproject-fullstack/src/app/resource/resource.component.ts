import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NewResource } from './newResource.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {
  listResource: Resource[];

  discardList: Resource[];
  dataSource;
  //"+" drop down
  addMethods = new FormControl();
  resource_code: string;
  resource_name: string;
  displayedColumns: string[] = ['Resource_Code', 'Resource_Name'];
  // addMethodsList: string[] = ['Add Row', 'Add Column', 'Insert CSV'];

  newList: any[]; // regular angular table
  newList1: any[]; // material table

  editable: boolean = true;

  newAddResourceList = new Array(); // store all the user input resources

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.getAllResource().subscribe((resourceData) => {
      console.log(resourceData);
      this.listResource = resourceData;
      this.discardList = resourceData;
      this.dataSource = new MatTableDataSource(this.listResource);
    });
  }

  // change dom structure way: not used
  addRow() {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = ` 
      <br> 
      <input type="text" [(ngModel)] = 'resource_code'>
      <input type="text"  [(ngModel)] = 'resource_name'>`;
    document.getElementById('addRows').appendChild(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @Output()
  discard() {}

  addNewResource() {
    console.log('can add a new resource!');
    let tempList: any[] = this.listResource;
    console.log(tempList.length, tempList[tempList.length - 1]);
    tempList.push(new Resource('', ''));
    //console
    this.newList = tempList;
    console.log(this.newList);
  }
  // angular material table
  addNewResource1() {
    console.log('can add a new resource!');
    this.editable = false;
    this.newList1 = this.listResource;
    this.newList1.push(new Resource('', ''));
    this.dataSource = new MatTableDataSource(this.newList1);
    // console.log(this.resource_code);
    // console.log(this.resource_name);
  }

  typeInResourceCode(event: any) {
    console.log(event);
    console.log(event.target.value);
    this.resource_code = event.target.value;
    //
  }

  typeInResourceName(event: any) {
    console.log(event);
    console.log(event.target.value);
    this.resource_name = event.target.value;
    // resource_code and resource_name are availiable

    this.newAddResourceList.push(
      new Resource(this.resource_code, this.resource_name)
    );
    console.log(this.newAddResourceList);
  }

  submit() {
    for (var resource of this.newAddResourceList) {
      this.resourceService.addResource(resource);
    }
  }
}

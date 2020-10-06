import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NewResource } from './newResource.model';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {
  listResource: Resource[];
  addColumnList: Resource[];
  dataSource;
  //"+" drop down
  addMethods = new FormControl();
  resource_code: string;
  resource_name: string;
  displayedColumns: string[] = ['resourceCode', 'resourceName'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  // addMethodsList: string[] = ['Add Row', 'Add Column', 'Insert CSV'];

  newList: any[]; // regular angular table
  newList1: any[]; // material table

  editable: boolean = true;

  newAddResourceList = new Array(); // store all the user input resources

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.getAllResource().subscribe((resourceData) => {
      console.log(resourceData);

      for (var val of resourceData) {
        val[' '] = '';
        //console.log(val);
      }
      //console.log(resourceData);
      this.listResource = resourceData;
      console.log(this.listResource);
      this.addColumnList = resourceData;
      this.dataSource = new MatTableDataSource(this.listResource); // dataSource is not iterable
    });
  }

  // change dom structure way: not used
  // addRow() {
  //   let row = document.createElement('div');
  //   row.className = 'row';
  //   row.innerHTML = `
  //     <br>
  //     <input type="text" [(ngModel)] = 'resource_code'>
  //     <input type="text"  [(ngModel)] = 'resource_name'>`;
  //   document.getElementById('addRows').appendChild(row);
  // }

  //filter function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  discard() {
    window.location.reload();
  }

  // regular table
  // addNewResource() {
  //   console.log('can add a new resource!');
  //   let tempList: any[] = this.listResource;
  //   console.log(tempList.length, tempList[tempList.length - 1]);
  //   tempList.push(new Resource('', ''));
  //   //console
  //   this.newList = tempList;
  //   console.log(this.newList);
  //

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
    console.log(this.newAddResourceList);
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
    window.location.reload();
  }

  addColumn() {
    var coulmnName = prompt('Name of New Column');
    console.log(coulmnName);
    //: string[] = ['resourceCode', 'resourceName', ' '];

    for (var val of this.listResource) {
      val['columnName'] = '';
    }
    console.log(this.listResource);
    this.displayedColumns.push(coulmnName);
    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource(this.listResource);
    this.editable = false;
    this.columnsToDisplay.push(
      this.displayedColumns[this.displayedColumns.length - 1]
    );
  }

  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
 
    var replace = confirm('Do you want to replace all your resource?');
    console.log(replace);
    if (replace) {
      //overwrite all the existing records
      this.resourceService.deleteAllResource();
      /* wire up file reader */
      console.log(' upload');
      const target: DataTransfer = <DataTransfer>evt.target; // target is a file list
      console.log(target.files);
      if (target.files.length !== 1)
        throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      console.log(reader);

      reader.onload = (e: any) => {
        console.log('in the reader.onload');
        /* read workbook */
        const bstr: string = e.target.result; // The file's text
        // console.log(bstr);
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(this.data);
        for (let i = 1; i < this.data.length; i++) {
          this.resourceService.addResource(
            new Resource(this.data[i][0], this.data[i][1])
          );
        }
      };
      reader.readAsBinaryString(target.files[0]);

      window.location.reload();
    } else {
      window.location.reload();
    }

  }

  deleteColumn() {
    console.log('delete a column');

    //this.dataSource = new MatTableDataSource(this.listResource);
    this.editable = true;
    console.log(this.displayedColumns);
    console.log(this.displayedColumns.pop());
    console.log(this.displayedColumns);
    this.columnsToDisplay = this.displayedColumns.slice();

 
    //   displayedColumns: string[] = ['resourceCode', 'resourceName'];
    // columnsToDisplay: string[] = this.displayedColumns.slice();
  }
}

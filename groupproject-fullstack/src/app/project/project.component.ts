import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DualListComponent } from 'angular-dual-listbox';
import { Subscription } from "rxjs";
import {FormControl, FormGroup,} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import{Project} from "./project.model"
import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
 // import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
 // import {MatPaginator } from '@angular/material';

// import { ResourceComponent } from '../resource/resource.component';
@Component({
  selector: 'app-project',
  templateUrl: 
  './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent  implements OnInit {

  constructor(public projectservice: ProjectService, public http:HttpClient,public resourceservice:ResourceService,
    // public projectservice: ProjectService,
    public route: ActivatedRoute
    // private authService: AuthService
  ) {
	console.log(this.data);
    // private projectservice
    console.log(123)
  }
   
 
   allresourcedata: Resource[]; 
   resourcedata2:Resource[]; 
   resourcedata: Resource[];  
   projectResource; 
   projectdata 
   listResource:[]=[];
   discardList:[]=[];
   checkedData =[];
	//   sth;
	  
  private authStatusSub: Subscription;
  isLoading = false;

  currentresourceid:string[]=[]
  data:[]= [];
  uncheckedData: [] ;
  dataSource  ;
  checkedDataSource;
  projectCode;
 	ngOnInit() {
		//  this.route.params.subscribe((params)=> this.projectCode = params.id.toString())
		// console.log(this.projectCode+"projectcode")
		console.log(123)

		this.projectservice.getResource2().subscribe(projectr=> {
			console.log(projectr),
			this.projectResource = projectr,
			this.checkedDataSource = new MatTableDataSource<any>(Object.assign(this.projectResource));
  console.log('this checkdata before oninit:' + console.log(this.checkedDataSource))
			
			});

			this.doReset();

		this.projectservice.getAllResource().subscribe(allresourcedata => {console.log(allresourcedata)
		, this.allresourcedata = allresourcedata}),     

		this.projectservice.getResource().subscribe(resourcedata => {console.log(resourcedata),this.resourcedata = resourcedata}); 
		
	this.projectservice.getData().subscribe(projectdata => {
		this.projectdata = projectdata,
		console.log(JSON.stringify(this.projectdata))   
			});

			console.log(123)

			this.resourceservice.getAllResource().subscribe((resourceData) => {
				console.log(resourceData);
				this.listResource = Object.assign(resourceData);
				this.discardList = resourceData;
				this.data =Object.assign(this.listResource);
				
				this.dataSource = new MatTableDataSource<Resource>(this.listResource);
				// console.log('haodi_data_listResource'+ this.listResource)

				// console.log('haodi_data'+ JSON.stringify())
				this.uncheckedData = this.data;})
				
				console.log(123)

   }
    // checkedDataSource = new MatTableDataSource<Resource>(this.checkedData); 
	checkedSelection = new SelectionModel<Resource>(true, []);


  dataList = this.projectservice.projects;
  foods: Project[] = this.projectservice.projects;
  

	tab = 1;
	keepSorted = true;
	key: string;
	display: any;
	filter = true;
	source: Array<any>;
	confirmed: Resource[];
	// confirmed: any;
	userAdd = '';
	disabled = false;
  resourceCode:number;
  resourceName: string;
	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

 	private sourceStations: Array<any>;
 
	 private confirmedStations: Resource[];
	//  Array<any>;
 
  type = 'station';


	private stations=this.projectservice.allresources;
	

  
	private resourceLabel(item: any) {
		return item.resourceCode + ',  ' + item.resourceName;
	}

	// private useStations() {
	// 	this.key = 'key';
	// 	this.display = this.resourceLabel;
	// 	this.keepSorted = true;
	// 	this.source = this.sourceStations;
  //   this.confirmed = this.confirmedStations;
 	// }

 

	// swapSource() {
	// 	switch (this.type) {
	// 	case this.arrayType[0].value:
	// 		this.useStations();
	// 		break;
 
	// 	}
	// }
 
	doReset() {
		this.sourceStations = JSON.parse(JSON.stringify(this.stations));

		this.confirmedStations = new Array<any>();
	this.confirmedStations.push( this.stations[4] );
	// this.confirmedStations.push( this.projectservice.resources[2]);
    this.key = 'resourceCode';
		this.display = this.resourceLabel;
		this.keepSorted = true;
		this.source = this.sourceStations;
	this.confirmed =  this.confirmedStations;
 
 	}

	doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	// doCreate() {
	// 	if (typeof this.source[0] === 'object') {
	// 		const o = {};
	// 		o[this.key] = this.source.length + 1;
	// 		o[this.display] = this.userAdd;
	// 		this.source.push( o );
	// 	} else {
	// 		this.source.push(this.userAdd);
	// 	}
	// 	this.userAdd = '';
	// }

	// doAdd() {
	// 	for (let i = 0, len = this.source.length; i < len; i += 1) {
	// 		const o = this.source[i];
	// 		const found = this.confirmed.find( (e: any) => e === o );
	// 		if (!found) {
	// 			this.confirmed.push(o);
	// 			break;
	// 		}
	// 	}
	// }

	// doRemove() {
	// 	if (this.confirmed.length > 0) {
	// 		this.confirmed.splice(0, 1);
	// 	}
	// }

	doFilter() {
		this.filter = !this.filter;
	}

	filterBtn() {
		return (this.filter ? 'Hide Filter' : 'Show Filter');
	}

	doDisable() {
		this.disabled = !this.disabled;
	}

	disableBtn() {
		return (this.disabled ? 'Enable' : 'Disabled');
	}
 
//   ngOnDestroy() {
//     this.authStatusSub.unsubscribe();
//    }

 

  getData(){
    this.projectservice.getData();
    console.log(this.projectservice.projects)

  }
 


addResource(){
	
	this.projectservice.addResource(this.confirmed);
	this.confirmed = this.projectservice.resources;
	// this.projectservice.addResource();
	// this.projectservice.project.
	console.log(this.projectservice.resources);
  }


getResource(){
  this.projectservice.getResource();
}


displayedColumns = ['select', 'resourceCode', 'resourceName'];
 


selection = new SelectionModel<Resource>(true, []);


// checkedDataSource = new MatTableDataSource<Resource>(this.checkedData); 
// checkedSelection = new SelectionModel<Resource>(true, []);

selectedRows = [];
selectedRowsChecked = [];

// @ViewChild('paginator') paginator: MatPaginator;
// @ViewChild('checkedpaginator') checkedpaginator: MatPaginator;

ngAfterViewInit() {
//   this.dataSource.paginator = this.paginator;
//   this.checkedDataSource.paginator = this.checkedpaginator;
}

 
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

isAllCheckedSelected() {
  const numSelected = this.checkedSelection.selected.length;
  const numRows = this.checkedDataSource.data.length;
  return numSelected === numRows;
}


transferSelectedRows() {
	console.log('IM BEFORE checked------: ' + this.checkedData)
  this.selection.selected.forEach(item => {
	  
	
	let index: number = this.uncheckedData.findIndex(d => d === item);
	// this.checkedDataSource = new MatTableDataSource<any>(Object.assign(this.projectResource));
	
	this.checkedData.push(this.uncheckedData[index]);
	  console.log('AFTER PUSH ----'+ JSON.stringify(this.checkedData))
	
	// this.checkedData.push(item);
	this.uncheckedData.splice(index,1);
	// for(let i of this.uncheckedData){
	// 	if (i ===item){this.uncheckedData.splice(this.uncheckedData.indexOf(i),1)}
	// }
	  

  });

  this.selection = new SelectionModel (true, []);
  this.dataSource = new MatTableDataSource (this.uncheckedData);
//   sth = Object.assign({});
  this.checkedDataSource = new MatTableDataSource<Resource> (Object.assign(this.checkedData,this.projectResource));
//   this.dataSource.paginator = this.paginator;
//   this.checkedDataSource.paginator = this.checkedpaginator;
}


removeSelectedRows() {
  this.checkedSelection.selected.forEach(item => {
	//   console.log('this item:' + JSON.stringify(item))
	  console.log('this checkdata:' + (this.checkedDataSource))

	let index: number = this.checkedData.findIndex(d => d === item);

	this.uncheckedData.push(item);
	this.checkedData.splice(index,1);

  });
  this.checkedSelection = new SelectionModel<Resource>(true, []);
  this.dataSource = new MatTableDataSource<Resource>(this.uncheckedData);
  this.checkedDataSource = new MatTableDataSource<Resource>(Object.assign(this.checkedData));
  console.log('this checkdata AFTER insert:' + (this.checkedDataSource))

//   this.dataSource.paginator = this.paginator;
//   this.checkedDataSource.paginator = this.checkedpaginator;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
	this.selection.clear() :
	this.dataSource.data.forEach(row => this.selection.select(row));
  console.log(this.data);
}

masterCheckedToggle() {
  this.isAllCheckedSelected()?
	this.checkedSelection.clear() : this.dataSource.data.forEach(row => this.checkedSelection.select(row));
}


getsubmit(){
	let ids:string[]=[]
	for (let i of this.checkedData){
		ids.push(i.resourceCode)
	}console.log("get id:"+ids)
	return ids;
}
 

submit(){
	this.projectservice.http.delete("http://localhost:8080/project/deleteAllProjectResource?projectCode="+
	this.projectservice.selectedProjectCode).subscribe();
	console.log("cleared"+JSON.stringify(this.checkedData))

	for (let i of this.getsubmit()){
				this.http.put<Resource>("http://localhost:8080/project/addResource?resourceCode="+i+ "&projectCode="+this.projectservice.selectedProjectCode+
				"&userId="+this.projectservice.uId,{}).subscribe(data => this.projectservice.resources.push(data))
			}


 	// if(this.getsubmit().length >0 ){
// 		this.projectservice.http.delete("http://localhost:8080/project/deleteAllProjectResource?projectCode="+
// 		this.projectservice.selectedProjectCode).subscribe();
//  for (let i of this.getsubmit()){
// 		this.http.put<Resource>("http://localhost:8080/project/addResource?resourceCode="+i+ "&projectCode="+this.projectservice.selectedProjectCode+
// 		"&userId="+this.projectservice.uId,{}).subscribe(data => this.projectservice.resources.push(data))
// 	}
	// }
	// else{
	// 	 this.projectservice.http.delete("http://localhost:8080/project/deleteAllProjectResource?projectCode="+
	// this.projectservice.selectedProjectCode).subscribe();
	// console.log("AFTER DELETE"+this.projectResource)}
 
	// for (let i of this.getsubmit()){
	// 	this.http.put<Resource>("http://localhost:8080/project/addResource?resourceCode="+i+ "&projectCode="+this.projectservice.selectedProjectCode+
	// 	"&userId="+this.projectservice.uId,{}).subscribe(data => this.projectservice.resources.push(data))
	// }

} 


}










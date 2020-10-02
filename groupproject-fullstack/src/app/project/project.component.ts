import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DualListComponent } from 'angular-dual-listbox';
import { Subscription } from "rxjs";
import {FormControl} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import{Project} from "./project.model"
import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../service/resource.service';
import { Resource } from './resource.model';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

// import { ResourceComponent } from '../resource/resource.component';
@Component({
  selector: 'app-project',
  templateUrl: 
  './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent  implements OnInit {

  constructor(public projectservice: ProjectService, public http:HttpClient
    // public projectservice: ProjectService,
    // public route: ActivatedRoute,
    // private authService: AuthService
  ) {
    // private projectservice
    console.log(123)
  }


  private authStatusSub: Subscription;
  isLoading = false;
 
	ngOnInit() {
	this.projectservice.getAllResource();     
    this.projectservice.getResource();
    this.projectservice.getData();
	console.log(this.projectservice.projects);
	this.doReset(); 
	// this.confirmed=this.projectservice.resources ;
  }

 
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


	private stations: Array<any>=this.projectservice.allresources;
// 	[
//     {  
//       "resourceCode": 1001,
//       "resourceName": "rs1"
//   },
//   {
//     "resourceCode": 1002,
//     "resourceName": "rs2"
// },
//   {
//       "resourceCode": 1003,
//       "resourceName": "rs3"
//   },
//   {
//       "resourceCode": 1004,
//       "resourceName": "rs4"
//   }


// //   {key: 1,
// //     "projectCode": 1,
// //     "projectName": "a"
// // },
// // {key: 2,
// //     "projectCode": 2,
// //     "projectName": "b"
// // },
// // {key: 3,
// //     "projectCode": 3,
// //     "projectName": "c"
// // }
// 	];
 
  
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
 
  /*ngOnDestroy() {
    this.authStatusSub.unsubscribe();
   }*/

 

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

// deleteResource(){
//   this.projectservice.deleteResource('s','b');
//   console.log(this.projectservice.resources);

// }

}


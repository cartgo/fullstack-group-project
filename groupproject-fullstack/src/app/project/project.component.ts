import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { DualListComponent } from 'angular-dual-listbox';

import { Subscription } from 'rxjs';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(
    public projectservice: ProjectService,
    public http: HttpClient
  ) // public projectservice: ProjectService,
  // public route: ActivatedRoute,
  // private authService: AuthService
  {
    // private projectservice
    console.log(123);
  }

  private authStatusSub: Subscription;
  isLoading = false;
  // projects: Project[]
  // projects = this.http.get<Project[]>( "http://localhost:8080" + "/test");

  ngOnInit() {
    // this.authStatusSub = this.authService
    // .getAuthStatusListener()
    // .subscribe(authStatus => {
    //   this.isLoading = false;
    // })
    this.projectservice.getResource();
    this.projectservice.getData();
    // this.http.get<Project[]>("http://localhost:8080" + "/test").subscribe(data => this.projects = data);
    // this.projectservice.test();
    // .subscribe(data => this.projects = data);
    console.log(this.projectservice.projects);
    this.doReset();
    // for(let i of this.projects){
    //   i.key = 1
    // }
  }

  tab = 1;
  keepSorted = true;
  key: string;
  display: any;
  filter = true;
  source: Array<any>;
  confirmed: Array<any>;
  userAdd = '';
  disabled = false;
  resourceCode: number;
  resourceName: string;
  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;

  // private sourceTube: Array<string>;
  private sourceStations: Array<any>;
  // private sourceChessmen: Array<any>;

  // private confirmedTube: Array<string>;
  private confirmedStations: Array<any>;
  // private confirmedChessmen: Array<any>;

  arrayType = [
    { name: 'Rio Grande', detail: '(object array)', value: 'station' },
    { name: 'Chessmen', detail: '(object array)', value: 'chess' },
    { name: 'Underground', detail: '(string array)', value: 'tube' },
  ];

  // type = this.arrayType[0].value;
  type = 'station';

  private stations: Array<any> = [
    {
      resourceCode: 1001,
      resourceName: 'rs1',
    },
    {
      resourceCode: 1002,
      resourceName: 'rs2',
    },
    {
      resourceCode: 1003,
      resourceName: 'rs3',
    },
    {
      resourceCode: 1004,
      resourceName: 'rs4',
    },

    //   {key: 1,
    //     "projectCode": 1,
    //     "projectName": "a"
    // },
    // {key: 2,
    //     "projectCode": 2,
    //     "projectName": "b"
    // },
    // {key: 3,
    //     "projectCode": 3,
    //     "projectName": "c"
    // }
  ];

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
    this.confirmedStations.push(this.stations[4]);
    this.key = 'resourceCode';
    this.display = this.resourceLabel;
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;

    // switch (this.type) {
    // case this.arrayType[0].value:
    // 	this.useStations();
    // 	break;

    // }
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
    return this.filter ? 'Hide Filter' : 'Show Filter';
  }

  doDisable() {
    this.disabled = !this.disabled;
  }

  disableBtn() {
    return this.disabled ? 'Enable' : 'Disabled';
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    // this.projects.unsubscribe();
  }

  // this.mysservice.getData();  //?
  // console.log(this.mysservice.posts)

  getData() {
    this.projectservice.getData();
    console.log(this.projectservice.projects);
  }
  test() {
    this.projectservice.test();
    console.log(this.projectservice.projects);
  }

  addResource() {
    this.projectservice.addResource();
    // this.projectservice.project.
    console.log(this.projectservice.resources);
  }

  getResource() {
    this.projectservice.getResource();
  }

  deleteResource() {
    this.projectservice.deleteResource();
    console.log(this.projectservice.resources);
  }
}

import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DualListComponent } from 'angular-dual-listbox';
import { Project } from '../project/project.model';
import { ProjectService } from '../project/project.service';
import { Resource } from '../project/resource.model';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

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
  isLoading = false;

  currentresourceid:string[]=[]
  data:[]= [];
  uncheckedData: [] ;
  dataSource  ;
  checkedDataSource;
  projectCode;

  
  ngOnInit(): void {
    console.log(123)

		this.projectservice.getResource2().subscribe(projectr=> {
			console.log(projectr),
			this.projectResource = projectr;
			this.checkedData = Object.assign(this.projectResource);

			this.checkedDataSource = new MatTableDataSource<any>(Object.assign(this.projectResource));
  console.log('this checkdata before oninit:' + console.log(this.checkedDataSource))
			
			});

		 
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
 
 
 displayedColumns = [  'resourceName'];
  
 
 
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
 
 
 
}

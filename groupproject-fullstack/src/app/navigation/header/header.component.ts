import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/project/project.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  role: string;
  id: number;
  create_time= new Date();
  currentProject:any;
  tempString:string;
  yearString:string;
  monthString:string;
  months:string[]= ["January","Febraury","March","April","May","June","July","August","September","October","November","December"]
  finalMonth:string;
  //projectservice;
  constructor(private tokenStorageService: TokenStorageService, private userService:UserService
     ,private projectservice:ProjectService
     ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    
      this.username = user.username;
      this.role = user.role;
      this.id = user.id;
      /*this.projectservice=new ProjectService();
      console.log("before***"+ProjectService)
      
      this.currentProject=this.projectservice.selectedProjectCode;
      console.log("after***"+this.currentProject)*/
      this.userService.getCreateTime(this.id).subscribe((data) => {
        console.log("data  "+data);
        this.create_time = data;
        console.log("createtime "+this.create_time);
        //this.year=this.create_time.getFullYear;
        //console.log("year "+this.year);
        //this.year = this.create_time.toLocaleString('default', { month: 'long' });
        this.tempString=this.create_time.toString();
        //uId:string = this.token.getUser().id.toString();
        this.yearString=this.tempString.slice(0,4);
        console.log("yearstring "+this.yearString);
        this.monthString=this.tempString.slice(5,7)
        console.log("monthstring "+this.monthString);
        var y: number = +this.monthString;
        console.log("y  " + y)
        for(let i=0;i<12;i++){
          if((y-1)==i){
            this.finalMonth=this.months[i];
          }
        }
        console.log("new month **"+this.finalMonth);
      });
      
      
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('/login');
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}

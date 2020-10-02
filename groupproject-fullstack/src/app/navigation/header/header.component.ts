import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  year: any;


  
  constructor(private tokenStorageService: TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    
      this.username = user.username;
      this.role = user.role;
      this.id = user.id;
      

      this.userService.getCreateTime(this.id).subscribe((data) => {
        console.log(data);
        this.create_time = data;
        this.year=this.create_time.getFullYear;
        
        //this.year = this.create_time.toLocaleString('default', { month: 'long' });
        

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

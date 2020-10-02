import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content: string;
  data: Array<any>;
  displayedColumns: string[] = ['id', 'username', 'email', 'role','create_time'];

  constructor(private userService: UserService) {this.data = new Array<any>(); }

  ngOnInit(): void {

    this.userService.getUserBoard().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
   /* this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );*/
  }
  
}




 

import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  constructor( private _http: HttpRequestService ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this._http.get(REST.user).subscribe(
      (response) => {
        this.userList = response.data;
      }
    );
  }

  deleteThis(id: String) {
    console.log(id);
    this._http.delete(REST.user + id).subscribe(
      (response) => {
        this.fetchUsers();
      }
    )
  }

}

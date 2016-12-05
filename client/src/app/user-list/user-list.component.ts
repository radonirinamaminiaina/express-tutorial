import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  userData: any;
  constructor( private _http: HttpRequestService ) { }

  ngOnInit() {
    this.fetchUsers();
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  fetchUsers() {
    this._http.get(REST.user).subscribe(
      (response) => {
        this.userList = response.data;
      }
    );
  }

  deleteThis(id: String) {
    this._http.delete(REST.user + id).subscribe(
      (response) => {
        this.fetchUsers();
        $(".user-removed").addClass("show-alert");
        setTimeout(
          () => {
            $(".user-removed").removeClass("show-alert");
          }, 3000
        );
      }
    )
  }

}

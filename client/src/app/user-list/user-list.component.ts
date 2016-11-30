import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  constructor( private _http: HttpRequestService ) { }

  ngOnInit() {
    this._http.get("http://localhost:5500/user").subscribe(
      (response) => {
        this.userList = response.data;
      }
    )
  }

}

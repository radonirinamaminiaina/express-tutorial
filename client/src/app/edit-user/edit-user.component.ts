import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userData: Object = {
    name: null,
    lastname: null,
    email: null,
    phone: null
  };
  constructor(private _http: HttpRequestService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.forEach(
      (params) => {
        this._http.get(REST.user + params["id"]).subscribe(
          (response) => {
            this.userData = response.data;
            console.log(this.userData)
          }
        );
      }
    )
  }
  update(userData) {
    var params = {
      _id: userData._id,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      phone: userData.phone
    }
    this._http.put(REST.user + userData._id, params).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}

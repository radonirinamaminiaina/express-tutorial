import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: Object = {
    name: null,
    lastname: null,
    email: null,
    phone: null
  };
  userConnected: boolean;
  editThis: Object;
  constructor(private _http: HttpRequestService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.userConnected = JSON.parse(localStorage.getItem("user"));
    let getUserConnected = JSON.parse(localStorage.getItem("user"));
    this._route.params.forEach(
      (params) => {
        let id = params["id"];
        this._http.get(REST.user + id).subscribe(
            (response) => {
              this.userData = response.data;
            }
        );
      }
    )
  }
  edit(field) {
    this.editThis = {};
    this.editThis[field] = true;
    return false;
  }
  save(field) {
    let params = {};
    let value = $("#" + field).val();
    params[field] = value;
    this._http.put(REST.user + this.userData["_id"], params).subscribe(
      (response) => {
        this.editThis[field] = false;;
        $(".user-updated").addClass("show-alert");
        this.userData[field] = value;
        setTimeout(
          () => {
            $(".user-updated").removeClass("show-alert");
          }, 3000
        );
      }
    );
    return false;
  }
}

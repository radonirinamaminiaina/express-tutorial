import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";
declare var $: any;
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
  constructor(private _http: HttpRequestService, private _route: ActivatedRoute, private _router: Router) { }

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
        $(".user-updated").addClass("show-alert");
        this._router.navigate(['/user']);
        setTimeout(
          () => {
            $(".user-updated").removeClass("show-alert");
          }, 3000
        );
      }
    )
  }

}

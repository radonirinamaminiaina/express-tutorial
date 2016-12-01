import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";

declare var $: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userData: Object = {
    name: null,
    lastname: null,
    email: null,
    phone: null,
    passowrd: null,
    confirm: null
  }
  message: string;
  constructor(private _http: HttpRequestService, private _router: Router) { }

  ngOnInit() {
  }
  createUser(user: Object) {
    delete user["confirm"];
    this._http.post(REST.user, user).subscribe(
      (response) => {
        this.userData = null;
        this.message = response.message;
        $(".user-created").addClass("show-alert");
        this._router.navigate(['/user']);
        setTimeout(
          () => {
            $(".user-created").removeClass("show-alert");
          }, 3000
        )
      }
    );
  }
}

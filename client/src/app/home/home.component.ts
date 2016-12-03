import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { REST } from "../../config/config";
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogin: Object = {
    email: null,
    passowrd: null
  };
  userData: Object;
  constructor(private _http: HttpRequestService) { }
  ngOnInit() {
  }
  onLogin(user: Object) {
    this._http.post(REST.login, user).subscribe(
      (response) => {
        localStorage.setItem("user", JSON.stringify(response));
        this.userData = JSON.parse(localStorage.getItem("user"));
        $(document).trigger("user", [this.userData["data"]]);
      }
    );
  }
}

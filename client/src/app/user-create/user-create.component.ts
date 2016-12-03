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
  hasErrorClass: boolean;
  isValidEntry: boolean;
  isOnFocus: boolean;
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
  checkDuplicateEntry(event, email) {
    let emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|immo|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
    if(emailPattern.test(event.target.value)) {
      this._http.post(REST.checkmail, {email: email}).subscribe(
        (result) => {
          console.log(result);
          if(result.code === 409) {
            this.hasErrorClass = true;
            this.isValidEntry = false;
          } else {
            this.hasErrorClass = false;
            this.isValidEntry = true;
          }
        }
      );
    }
  }
  checkPassWord(event, password) {
    let patternPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
    if(patternPassword.test(event.target.value)) {
      event.target.classList.remove("has-error");
      event.target.classList.add("is-valid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("has-error");
    }
  }
  onFocus() {
    this.isOnFocus = true;
  }
}

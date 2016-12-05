import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from './http-request.service';
declare var jQuery: any;
var $ = jQuery;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    userData: Object;
    constructor(private http: HttpRequestService, private _router: Router) { }
    ngOnInit() {
        let getUser = JSON.parse(localStorage.getItem("user"));
        if(getUser) {
            this.userData = getUser.data;
        }
        $(document).on("user", (e, data) => {
            if(data.code == 404) {
                this.userData = null;
            } else {
                this.userData = data;
            }
        });
    }
    onLogout() {
        localStorage.removeItem("user");
        this.userData = null;
        this._router.navigate(['/']);
        return false;
    }
}

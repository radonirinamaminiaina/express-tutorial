import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
    constructor(private http: HttpRequestService) { }
    ngOnInit() {
        let getUser = JSON.parse(localStorage.getItem("user"));
        if(getUser) {
            this.userData = getUser;
        }
        $(document).on("user", (e, data) => {
            console.log(data)
            this.userData = data;
        });
    }
}

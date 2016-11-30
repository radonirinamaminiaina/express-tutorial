import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpRequestService } from './http-request.service';
declare var jQuery: any;
var $ = jQuery;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private http: HttpRequestService) { }
    // option to override our Object
    options: Object = {
        header: {
            left: 'month,agendaWeek,agendaDay',
            center: ' prev,title,next',
            right: 'today'
        }
    }
    /**
     * fetchMonthEvent
     * 
     * fetch event and render it when load or navigate to next or prev month
     * 
     * @param data {Object}
     */
    fetchMonthEvent(data) {
        // remove event to prevent duplicate value
        $(".fullcalendar").fullCalendar("removeEvents");
        // get month name 
        // our data json is month name
        // or you just need to set your own url
        let getMonth = data._view.title.split(" ")[0].toLowerCase();
        // Ajax to fetch event
        this.http.get("/data/" + getMonth + ".json").subscribe(
            (response) => {
                for (let i = 0; i < response["length"]; i++) {
                    this.renderEvent(response[i]);
                }
            }
        );
    }
    /**
     * addEvent
     * 
     * Add event when click on calendar cell
     * 
     * @param data {Object} 
     */
    addEvent(data) {
        // unfortunately, it should be an ajax and send data to server then re-render our event
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
            eventData = {
                title: title,
                start: data._start,
                end: data._start
            };
            this.renderEvent(eventData);
        }
        $(".fullcalendar").fullCalendar('unselect');
    }
    /**
     * renderEvent
     * 
     * @param data {Object}
     */
    renderEvent(data) {
        $(".fullcalendar").fullCalendar("renderEvent", data, true);
    }
}

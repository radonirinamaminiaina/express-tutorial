import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {
  @Input() message: string;
  @Input() msgClass: string;
  constructor() { }

  ngOnInit() {
  }

}

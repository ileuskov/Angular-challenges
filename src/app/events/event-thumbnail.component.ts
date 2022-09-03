import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [
    `
      .someClass {
        background: red;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event: any;
  @Output() eventClick = new EventEmitter();
  someRandomProperty: any = 'some value';

  handleClickMe() {
    this.eventClick.emit(this.event.name);
  }

  logFoo() {
    console.log('foo');
  }
}

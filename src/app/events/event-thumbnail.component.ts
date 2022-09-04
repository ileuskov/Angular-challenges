import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [
    `
      .green {
        background: green !important;
      }
      .bold {
        font-weight: bold;
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
  getStartTimeClass() {
    if (this.event && this.event.time === '8:00 am') return ['green', 'bold'];
    return [];
  }
  getStartTimeClassNgStyle(): any {
    if (this.event && this.event.time === '8:00 am')
      return [
        {
          color: '#003300',
          'font-weight': 'bold',
        },
      ];
    return {};
  }
}

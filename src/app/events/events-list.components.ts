import { toastrService } from './../common/toastr.service';
import { eventService } from './shared/event.service';
import { Component, OnInit } from '@angular/core';
import { EventThumbnailComponent } from './event-thumbnail.component';

@Component({
  templateUrl: './events-list.template.html',
  providers: [EventThumbnailComponent],
})
export class EventListComponent implements OnInit {
  eventData: any[] = [];
  constructor(
    private eventService: eventService,
    private toastrService: toastrService
  ) {}

  ngOnInit() {
    this.eventData = this.eventService.getEvents();
  }

  handleEventClicked(someData: any) {
    console.log('Just recieved this:', someData);
  }
  handleThumbnailClick(eventName: string) {
    this.toastrService.success(eventName);
  }
}

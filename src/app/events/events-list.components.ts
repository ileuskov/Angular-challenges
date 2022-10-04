import { ActivatedRoute } from '@angular/router';
import { eventService } from './shared/event.service';
import { Component, OnInit } from '@angular/core';
import { EventThumbnailComponent } from './event-thumbnail.component';
import { IEvent } from './shared';

@Component({
  templateUrl: './events-list.template.html',
  providers: [EventThumbnailComponent],
})
export class EventListComponent implements OnInit {
  eventData: IEvent[] = [];
  constructor(
    private eventService: eventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventData = this.route.snapshot.data['events'];
  }

  handleEventClicked(someData: any) {
    console.log('Just recieved this:', someData);
  }
}

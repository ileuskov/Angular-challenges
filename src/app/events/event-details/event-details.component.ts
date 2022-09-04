import { eventService } from './../shared/event.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding: 0 20px;
      }
      .event-image {
        height: 100px;
      }
    `,
  ],
})
export class eventDetailsComponent {
  event: any;
  constructor(
    private eventService: eventService,
    private activRouteService: ActivatedRoute
  ) {}
  ngOnInit() {
    this.event = this.eventService.getSpecificEvent(
      +this.activRouteService.snapshot.params['id']
    );
  }
}

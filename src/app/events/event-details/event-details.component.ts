import { IEvent, ISession } from './../shared/event.model';
import { eventService } from './../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class eventDetailsComponent implements OnInit {
  event!: IEvent | any;
  addMode = false;

  filterBy = 'all';
  sortBy = 'votes';

  constructor(
    private eventService: eventService,
    private activRouteService: ActivatedRoute
  ) {}
  ngOnInit() {
    //subscribing to route parameters for navigation. Doing this requires taking care of other pieces of state like addMode
    this.activRouteService.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    });

    //cause bug of only listening to events/id for the 1 time component loads => not changing ids later on search for example

    // this.event = this.eventService.getSpecificEvent(
    //   +this.activRouteService.snapshot.params['id']
    // );
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((s: { id: any }) => s.id)
    );
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}

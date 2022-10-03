import { IEvent, ISession } from './../shared/event.model';
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
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class eventDetailsComponent {
  event!: IEvent | any;
  addMode: boolean = false;
  constructor(
    private eventService: eventService,
    private activRouteService: ActivatedRoute
  ) {}
  ngOnInit() {
    this.event = this.eventService.getSpecificEvent(
      +this.activRouteService.snapshot.params['id']
    );
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
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}

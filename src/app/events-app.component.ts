import { Component } from '@angular/core';
import { EventListComponent } from './events/events-list.components';

@Component({
  selector: 'events-app',
  template: `<events-list></events-list>`,
  providers: [EventListComponent],
})
export class EventsAppComponent {}

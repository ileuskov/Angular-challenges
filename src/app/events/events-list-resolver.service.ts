import { eventService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: eventService) {}
  resolve() {
    //angular will automatically subscribe because the return of getEvents is an observable
    return this.eventService.getEvents();
  }
}

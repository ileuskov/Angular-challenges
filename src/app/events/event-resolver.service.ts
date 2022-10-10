import { eventService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService: eventService) {}
  resolve(route: ActivatedRouteSnapshot) {
    //angular will automatically subscribe because the return of getEvents is an observable
    return this.eventService.getSpecificEvent(route.params['id']);
  }
}

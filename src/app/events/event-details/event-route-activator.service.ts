import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { eventService } from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor(private eventService: eventService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): any {
    const eventExists = this.eventService.getSpecificEvent(+route.params['id']);

    if (!eventExists) this.router.navigate(['/404']);
    return eventExists;
  }
}

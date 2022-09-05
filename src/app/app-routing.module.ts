import { EventListResolver } from './events/events-list-resolver.service';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { CreateEventComponent } from './events/create-event.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eventDetailsComponent } from './events/event-details/event-details.component';
import { EventListComponent } from './events/events-list.components';
import { Error404Component } from './errors/404.component';

const routes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  {
    path: 'events',
    component: EventListComponent,
    resolve: { events: EventListResolver },
  },
  {
    path: 'events/:id',
    component: eventDetailsComponent,
    canActivate: [EventRouteActivator],
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CreateSessionComponent } from './events/event-details/create-session.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  EventListResolver,
  CreateEventComponent,
  eventDetailsComponent,
  EventListComponent,
  EventRouteActivator,
} from './events/index';
import { Error404Component } from './errors/404.component';

const routes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    //prevents from leaving this router (aka Page) simply by click
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
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
  }, // returns a promise that load with dynamic import user module
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

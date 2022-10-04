import { DurationPipe } from './events/shared/duration.pipe';
import { SessionLinstComponent } from './events/event-details/session-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './user/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TOASTR_TOKEN, Toastr } from './common/toastr.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';

import {
  EventListResolver,
  CreateEventComponent,
  eventDetailsComponent,
  EventThumbnailComponent,
  EventListComponent,
  eventService,
  EventRouteActivator,
  CollapsibleWellComponent,
} from './events/index';

// let toastr: Toastr = window['toastr'];
declare let toastr: Toastr;

@NgModule({
  declarations: [
    AppComponent,
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    eventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionLinstComponent,
    CollapsibleWellComponent,
    DurationPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    eventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: EventRouteActivator, useClass: EventRouteActivator }, // shorter version is "EventRouteActivator"
    EventListResolver,
    AuthService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  return true;
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { toastrService } from './common/toastr.service';

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
} from './events/index';

@NgModule({
  declarations: [
    AppComponent,
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    eventDetailsComponent,
    CreateEventComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    eventService,
    toastrService,
    EventRouteActivator,
    EventListResolver,
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

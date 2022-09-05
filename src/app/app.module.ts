import { EventListResolver } from './events/events-list-resolver.service';
import { CreateEventComponent } from './events/create-event.component';
import { eventDetailsComponent } from './events/event-details/event-details.component';
import { toastrService } from './common/toastr.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsAppComponent } from './events-app.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventListComponent } from './events/events-list.components';
import { eventService } from './events/shared/event.service';
import { NavBarComponent } from './nav/navbar.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';

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

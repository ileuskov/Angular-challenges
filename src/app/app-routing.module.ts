import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eventDetailsComponent } from './events/event-details/event-details.component';
import { EventListComponent } from './events/events-list.components';

const routes: Routes = [
  {
    path: 'events',
    component: EventListComponent,
  },
  { path: 'events/:id', component: eventDetailsComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

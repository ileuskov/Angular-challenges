import { Component } from '@angular/core';
import { EventThumbnailComponent } from './event-thumbnail.component';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.template.html',
  providers: [EventThumbnailComponent],
})
export class EventListComponent {
  eventData = {
    id: 1,
    name: 'Angular Course',
    date: '02.09.2022',
    time: '16:54',
    price: 420.69,
    imageUrl: '',
    location: {
      address: '1089 BE',
      city: 'Belfast',
      country: 'England',
    },
  };

  handleEventClicked(someData: any) {
    console.log('Just recieved this:', someData);
  }
}

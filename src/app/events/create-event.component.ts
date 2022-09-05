import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  templateUrl: './create-event.template.html',
})
export class CreateEventComponent {
  isDirty: boolean = true;
  constructor(private router: Router) {}
  cancel() {
    this.router.navigate(['/events']);
  }
}

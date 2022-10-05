import { eventService } from './../events/shared/event.service';
import { ISession } from './../events/shared/event.model';
import { Router } from '@angular/router';
import { AuthService } from './../user/auth.service';
import { Component, Inject, InjectionToken } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
    `,
  ],
})
export class NavBarComponent {
  searchTerm: string = '';
  foundSessions!: ISession[];

  constructor(
    public AuthService: AuthService,
    private eventService: eventService
  ) {}

  searchSessions(searchTerm: string) {
    this.foundSessions = this.eventService.searchSessions(searchTerm);
  }
}

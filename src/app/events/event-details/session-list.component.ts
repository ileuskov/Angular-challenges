import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { ISession } from './../shared/event.model';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionLinstComponent implements OnChanges {
  @Input()
  sessions!: ISession[];
  @Input() filterBy!: string;
  visibleSessions: ISession[] = [];
  @Input() sortBy!: string;

  constructor(
    public authService: AuthService,
    private voterService: VoterService
  ) {}
  //needed so that we can filter dynamically when the category to filter changes
  ngOnChanges() {
    //if sessions exist (=set)
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        session,
        this.authService.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        session,
        this.authService.currentUser.userName
      );
    }

    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.authService.currentUser.userName
    );
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0); // .slice(9) creates a copy of an array with all the same elements
    } else {
      //filter visible sessions to difficulty level
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  // possible as voters is a number and will return 1 if s2 has more voters than s1
  return s2.voters.length - s1.voters.length;
}

import { UpvoteComponent } from './upvote.component';
import { CollapsibleWellComponent } from './../../common/collapsible-well.component';
import { DurationPipe } from './../shared/duration.pipe';
import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionLinstComponent } from './session-list.component';
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
  let component: SessionLinstComponent;
  let mockAuthService: any, mockVoterService: any;

  let fixture: ComponentFixture<SessionLinstComponent>;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(() => {
    //better to initialized services in beforeEach loop so they values are pristine each test run
    mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Joe' },
    };
    mockVoterService = { userHasVoted: () => true };
    TestBed.configureTestingModule({
      //collapsible well and upvote can be added to avoid test errors due to the custom component unknown
      // it is then possible to make a deep integration test by testing those components as well
      declarations: [
        SessionLinstComponent,
        DurationPipe,
        CollapsibleWellComponent,
        UpvoteComponent,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: VoterService,
          useValue: mockVoterService,
        },
      ],
      //another solution to git rid of errors due to unknown custom components like upvote and collapsible well
      // however only use if we are sure they won't be needed or used in the test
      //schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SessionLinstComponent);

    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should have the correct name', () => {
      component.sessions = [
        {
          id: 3,
          name: 'Session 1',
          presenter: 'Joe',
          duration: 1,
          level: 'beginner',
          abstract: 'abstract',
          voters: ['john', 'bob'],
        },
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      //we have to call it to fill visibleSession with data from sessions.
      component.ngOnChanges();
      //This way we can get visibleSession rendered in the template. Because bindings are not updated until change detection runs
      fixture.detectChanges();

      //idea is to check line 14 in template {{session.name}}
      // expect(element.querySelector('[well-title]')?.textContent).toContain(
      //   'Session 1'
      // );
      //same test done with debugEl
      expect(
        debugEl.query(By.css('[well-title]')).nativeElement.textContent
      ).toContain('Session 1');
    });
  });
});

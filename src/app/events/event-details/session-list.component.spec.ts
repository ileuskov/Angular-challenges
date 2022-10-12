import { ISession } from '../shared/event.model';
import { SessionLinstComponent } from './session-list.component';
describe('SessionListComponent', () => {
  let component: SessionLinstComponent;
  let mockAuthService: any, mockVoterService: any;

  beforeEach(() => {
    component = new SessionLinstComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correclty', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'beginner' },
        { name: 'session 3', level: 'intermediate' },
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it('should sort the sessions correclty', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' },
        { name: 'session 2', level: 'intermediate' },
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      //if sort executed correctly, then session 3 will be the last element in the array
      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  });
});

import { of } from 'rxjs';
import { ISession } from '../shared/event.model';
import { VoterService } from './voter.service';

describe('VoterService', () => {
  let voterService: VoterService, mockHttp: any;

  beforeEach(() => {
    //createSpyObj takes a name and a list of functions of this mock object
    // since the real httpClient for VoterService uses only .post() and .delete() there
    // we give these function here as well

    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      var session = {
        id: 6,
        voters: ['joe', 'john'],
      };

      //explicitly saying what value should the service return. Here an observable of value false
      // otherwise it is undefined and undefine cannot have .pipe() like an observable
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call http.delete with the right URL', () => {
      var session = {
        id: 6,
        voters: ['joe', 'john'],
      };

      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session, 'joe');

      //values from the call above ^
      expect(mockHttp.delete).toHaveBeenCalledWith(
        '/api/events/3/sessions/6/voters/joe'
      );
    });
  });

  describe('addVoter', () => {
    it('should call http.post with the right URL', () => {
      var session = {
        id: 6,
        voters: ['john'],
      };

      mockHttp.post.and.returnValue(of(false));
      voterService.addVoter(3, <ISession>session, 'joe');

      //values from the call above ^
      // third paramete is options but we cannot access it from here. The code is simple, we simulate an Object with jasmine
      expect(mockHttp.post).toHaveBeenCalledWith(
        '/api/events/3/sessions/6/voters/joe',
        {},
        jasmine.any(Object)
      );
    });
  });
});

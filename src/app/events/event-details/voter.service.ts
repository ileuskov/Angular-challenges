import { ISession } from './../shared/event.model';
import { Injectable } from '@angular/core';

@Injectable()
export class VoterService {
  addVoter(session: ISession, voterName: string) {
    session.voters.push(voterName);
  }
  deleteVoter(session: ISession, voterName: string) {
    session.voters = session.voters.filter((voter) => voter !== voterName);
  }
  userHasVoted(session: ISession, voterName: string): boolean {
    return session.voters.some((voter) => voter === voterName);
  }
}

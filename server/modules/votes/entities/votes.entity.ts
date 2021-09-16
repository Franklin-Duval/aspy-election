export interface VoteEntityJSON {
  _id: string;
  voter: string;
  candidate: string;
  voteDate: string;
}

export class VoteEntity implements VoteEntityJSON {
  _id: string;
  voter: string;
  candidate: string;
  voteDate: string;

  constructor(vote: VoteEntityJSON) {
    this._id = vote._id;
    this.voter = vote.voter;
    this.candidate = vote.candidate;
    this.voteDate = vote.voteDate;
  }
}

import {
  VoterEntity,
  VoterEntityJSON,
} from 'server/modules/voter/entities/voter.entity';

interface CandidateEntityJSON extends VoterEntityJSON {
  planOfAction: string;
  manifesto: string;
  post: string;
  likes?: string[];
  dislikes?: string[];
  numberVotes: number;
}

export class CandidateEntity
  extends VoterEntity
  implements CandidateEntityJSON
{
  planOfAction: string;
  manifesto: string;
  post: string;
  likes?: string[];
  dislikes?: string[];
  numberVotes: number;
  constructor(candidate: CandidateEntityJSON) {
    super({
      _id: candidate._id,
      name: candidate.name,
      surename: candidate.surename,
      contact: candidate.contact,
      email: candidate.email,
      matricule: candidate.matricule,
      department: candidate.department,
      level: candidate.level,
      image: candidate.image,
      creation_date: candidate.creation_date,
      secret_code: candidate.secret_code,
      password: candidate.password,
      voted: candidate.voted,
    });

    this.planOfAction = candidate.planOfAction;
    this.manifesto = candidate.manifesto;
    this.post = candidate.post;
    this.likes = candidate.likes;
    this.dislikes = candidate.dislikes;
    this.numberVotes = candidate.numberVotes;
  }
}

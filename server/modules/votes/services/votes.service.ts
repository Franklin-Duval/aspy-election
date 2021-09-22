import { VoteEntity } from '../entities/votes.entity';
import { votesDbService } from './votesdb.service';

class VotesService {
  getAllVotes = async () => {
    return await votesDbService.getAll();
  };
  addVote = async (vote: VoteEntity) => {
    return await votesDbService.addVote(vote);
  };
  addMultipleVote = async (vote: VoteEntity[]) => {
    return await votesDbService.addMultipleVote(vote);
  };
}

export const votesService = new VotesService();

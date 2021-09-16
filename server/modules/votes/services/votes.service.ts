import { VoteEntity } from '../entities/votes.entity';
import { votesDbService } from './votesdb.service';

class VotesService {
  getAllPosts = async () => {
    return await votesDbService.getAll();
  };
  addPost = async (vote: VoteEntity) => {
    return await votesDbService.addVote(vote);
  };
}

export const votesService = new VotesService();

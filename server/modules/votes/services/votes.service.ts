import { candidateService } from 'server/modules/candidate/services/candidate.service';
import { voterService } from 'server/modules/voter/services/voter.service';
import { VoteEntity } from '../entities/votes.entity';
import { votesDbService } from './votesdb.service';

class VotesService {
  getAllVotes = async () => {
    return await votesDbService.getAll();
  };
  addVote = async (vote: VoteEntity) => {
    return await votesDbService.addVote(vote);
  };
  addMultipleVote = async (votes: VoteEntity[]) => {
    const resultVotes = await votesDbService.addMultipleVote(votes);
    for (let vote of votes) {
      if (vote.candidate !== '----') {
        await candidateService.addNumberVotes(vote.candidate);
      }
    }
    await voterService.finishVote(votes[0].voter);
    return resultVotes;
  };
}

export const votesService = new VotesService();

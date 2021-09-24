import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { candidateService } from 'server/modules/candidate/services/candidate.service';
import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { voterService } from 'server/modules/voter/services/voter.service';
import { ErrorType } from 'server/shared/customTypes';
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
    const voter = (await voterService.getVoter(votes[0].voter)) as VoterEntity;
    if (voter?.voted) {
      return { message: 'You have already voted' } as ErrorType;
    }
    const candidate = (await candidateService.getCandidate(
      votes[0].voter,
    )) as CandidateEntity;
    if (candidate?.voted) {
      return { message: 'You have already voted' } as ErrorType;
    }
    const resultVotes = await votesDbService.addMultipleVote(votes);
    for (let vote of votes) {
      if (vote.candidate !== '----') {
        await candidateService.addNumberVotes(vote.candidate);
      }
    }
    if (voter) {
      await voterService.finishVote(votes[0].voter);
    } else {
      await candidateService.finishVote(votes[0].voter);
    }
    return resultVotes;
  };
}

export const votesService = new VotesService();

import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { CandidateCard } from './candidateCard';

export const DisplayPost = ({
  post,
  candidates,
}: {
  post: string;
  candidates: CandidateEntity[];
}) => {
  return (
    <div>
      <h2>{post} </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

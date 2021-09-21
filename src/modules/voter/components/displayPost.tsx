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
    <div style={{ marginBottom: 10 }}>
      <h2 style={{ marginLeft: 5 }}>{post} </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
        {candidates.length == 0 && (
          <h4 style={{ color: 'red', textAlign: 'center' }}>
            No registered candidate
          </h4>
        )}
      </div>
    </div>
  );
};

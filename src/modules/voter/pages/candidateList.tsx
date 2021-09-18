import { Layout } from 'src/modules/shared/Layout';
import { DisplayPost } from '../components/displayPost';

export const CandidateList = () => {
  return (
    <Layout>
      <h2>List of all Candidates</h2>
      <DisplayPost
        post='President'
        candidates={[
          {
            secret_code: '5159',
            contact: '658605674',
            department: 'Art Numerique Department',
            email: 'ralph.jr.nj@gmail.com',
            _id: '14',
            image: '614578d30c225f33028e96cf',
            level: 'Level 1',
            matricule: '19p230',
            name: 'Nonga fidolin',
            surename: 'Nonga fidolin',
            numberVotes: 82,
            planOfAction: 'test',
            post: 'test',
            voted: false,
            manifesto: 'test',
            creation_date: '',
          },
          {
            secret_code: '5159',
            contact: '658605674',
            department: 'Art Numerique Department',
            email: 'ralph.jr.nj@gmail.com',
            _id: '14',
            image: '61457b740c225f33028e96e1',
            level: 'Level 1',
            matricule: '19p230',
            name: 'Nonga fidolin',
            surename: 'Nonga fidolin',
            numberVotes: 82,
            planOfAction: 'test',
            post: 'test',
            voted: false,
            manifesto: 'test',
            creation_date: '',
          },
        ]}
      />
    </Layout>
  );
};

import { useEffect, useState } from 'react';
import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { Layout } from 'src/modules/shared/Layout';
import { fetchVoters } from 'src/modules/voter/network/voter.network';
import { UserCard } from '../components/userCard';

export const UsersPage = () => {
  const [users, setUsers] = useState<VoterEntity[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers: VoterEntity[] = [];
      await fetchCandidates().then((candidates) => {
        allUsers = allUsers.concat(candidates);
      });
      await fetchVoters().then((voters) => {
        allUsers = allUsers.concat(voters);
      });
      setUsers(allUsers);
    };
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h2>List of all registered users</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </Layout>
  );
};

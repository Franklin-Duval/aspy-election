import { Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { Layout } from 'src/modules/shared/Layout';
import { fetchVoters } from 'src/modules/voter/network/voter.network';
import { ROUTES } from 'src/routes';
import { UserCard } from '../components/userCard';

export const UsersPage = () => {
  const router = useRouter();
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
      <Space style={{ flexWrap: 'wrap' }}>
        <Button onClick={() => router.push(ROUTES.ADMIN.USER_PAGE)}>
          View Users
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.RESULT_PAGE)}>
          View Results
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.ASPIANS)}>
          View Aspians
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.POST)}>
          View Posts
        </Button>
      </Space>
      <h2>List of all registered users</h2>
      <div>
        <h3>
          <FaAngleRight
            color='red'
            style={{ marginBottom: -3, marginRight: 5 }}
          />
          N° Total users: {users.length}{' '}
        </h3>
        <h3>
          <FaAngleRight
            color='red'
            style={{ marginBottom: -3, marginRight: 5 }}
          />
          N° of users who voted:{' '}
          {users.filter((user) => user.voted == true).length}
        </h3>
        <h3>
          <FaAngleRight
            color='red'
            style={{ marginBottom: -3, marginRight: 5 }}
          />
          N° of users who have not voted:{' '}
          {users.filter((user) => user.voted == false).length}
        </h3>
        <h3>
          <FaAngleRight
            color='red'
            style={{ marginBottom: -3, marginRight: 5 }}
          />
          Percentage of participation:{' '}
          {Math.round(
            ((users.filter((user) => user.voted == true).length * 100) /
              users.length) *
              100,
          ) / 100}{' '}
          %
        </h3>
        <Space style={{ flexWrap: 'wrap' }} size={50}>
          <h3>
            <FaAngleRight
              color='red'
              style={{ marginBottom: -3, marginRight: 5 }}
            />
            Level 1 :{' '}
            {users.filter((filter) => filter.level == 'Level 1').length}
          </h3>
          <h3>
            <FaAngleRight
              color='red'
              style={{ marginBottom: -3, marginRight: 5 }}
            />
            Level 2 :{' '}
            {users.filter((filter) => filter.level == 'Level 2').length}
          </h3>
          <h3>
            <FaAngleRight
              color='red'
              style={{ marginBottom: -3, marginRight: 5 }}
            />
            Level 3 :{' '}
            {users.filter((filter) => filter.level == 'Level 3').length}
          </h3>
          <h3>
            <FaAngleRight
              color='red'
              style={{ marginBottom: -3, marginRight: 5 }}
            />
            Level 4 :{' '}
            {users.filter((filter) => filter.level == 'Level 4').length}
          </h3>
          <h3>
            <FaAngleRight
              color='red'
              style={{ marginBottom: -3, marginRight: 5 }}
            />
            Level 5 :{' '}
            {users.filter((filter) => filter.level == 'Level 5').length}
          </h3>
        </Space>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </Layout>
  );
};

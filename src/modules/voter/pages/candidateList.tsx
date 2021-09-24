import { Button, Space } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { ConnectedUser } from 'server/shared/customTypes';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { CandidateGuard } from 'src/modules/shared/AuthGuard';
import { Layout } from 'src/modules/shared/Layout';
import { ROUTES } from 'src/routes';
import { PRIMARY } from 'src/shared/colors';
import { DisplayPost } from '../components/displayPost';

export const CandidateList = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [candidates, setCandidates] = useState<CandidateEntity[]>([]);
  const [connectedUser, setConnectedUser] = useState<ConnectedUser>();

  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
    fetchCandidates().then((candidates) => setCandidates(candidates));
  }, []);

  useEffect(() => {
    if (session) {
      setConnectedUser(session.user as ConnectedUser);
    }
  }, [session]);

  return (
    <Layout>
      <CandidateGuard>
        <Space style={{ borderWidth: 2, borderColor: 'black' }}>
          {connectedUser?.apply && (
            <>
              <h2 style={{ margin: 0 }}>
                Complete your application to a given post
              </h2>
              <Button
                type='primary'
                size='large'
                style={{
                  width: '100%',
                  backgroundColor: PRIMARY,
                  borderColor: 'transparent',
                }}
                onClick={() => router.push(ROUTES.CANDIDATE.APPLICATION)}
              >
                Application
              </Button>
            </>
          )}
        </Space>
      </CandidateGuard>
      <h2>List of all Candidates</h2>
      {posts.map((post) => (
        <DisplayPost
          key={post._id}
          post={post.name}
          candidates={candidates.filter(
            (candidate) => candidate.post == post._id,
          )}
        />
      ))}
    </Layout>
  );
};

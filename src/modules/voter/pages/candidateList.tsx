import { useEffect, useState } from 'react';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { Layout } from 'src/modules/shared/Layout';
import { DisplayPost } from '../components/displayPost';

export const CandidateList = () => {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [candidates, setCandidates] = useState<CandidateEntity[]>([]);

  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
    fetchCandidates().then((candidates) => setCandidates(candidates));
  }, []);

  return (
    <Layout>
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

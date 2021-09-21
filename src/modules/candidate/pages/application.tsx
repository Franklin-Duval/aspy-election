import { Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { Application } from 'server/shared/customTypes';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { Layout } from 'src/modules/shared/Layout';
import { RichEditor } from 'src/modules/shared/RichEditor';
import { submitApplication } from '../network/candidate.network';

export const CandidateApplication = () => {
  const [manifesto, setManifesto] = useState('');
  const [planOfAction, setPlanOfAction] = useState('');
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [postId, setPostId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Layout>
      <h2 style={{ textAlign: 'center' }}>Application for ASPY Election</h2>

      <h2>Post</h2>
      <Select
        placeholder='post'
        style={{ width: 300, marginBottom: 20 }}
        onChange={(value) => setPostId(value?.toString() as string)}
      >
        {posts.map((post) => (
          <Select.Option key={post._id} value={post._id}>
            {post.name}
          </Select.Option>
        ))}
      </Select>

      <h2>Manifesto</h2>
      <RichEditor content={manifesto} setContent={setManifesto} />

      <h2>Plan of Action</h2>
      <RichEditor content={planOfAction} setContent={setPlanOfAction} />

      <Button
        type='primary'
        size='large'
        loading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          const dataToPost: Application = {
            _id: '61457b740c225f33028e96e4',
            manifesto: manifesto,
            planOfAction: planOfAction,
            post: postId,
          };
          await submitApplication(dataToPost).then((data) => {
            if (data.modifiedCount) {
              notification.success({
                message: 'Success',
                description: 'Your application has been registered',
              });
            }
          });
          setIsLoading(false);
        }}
      >
        Submit
      </Button>
    </Layout>
  );
};

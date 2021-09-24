import { Button, Input, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { Application } from 'server/shared/customTypes';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { CandidateGuard } from 'src/modules/shared/AuthGuard';
import { Layout } from 'src/modules/shared/Layout';
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
      <CandidateGuard displayMessage={true}>
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
        {/* <RichEditor content={manifesto} setContent={setManifesto} /> */}
        <Input.TextArea
          rows={10}
          value={manifesto}
          onChange={(event) => setManifesto(event.target.value)}
        />

        <h2>Plan of Action</h2>
        {/* <RichEditor content={planOfAction} setContent={setPlanOfAction} /> */}
        <Input.TextArea
          rows={10}
          value={planOfAction}
          onChange={(event) => setPlanOfAction(event.target.value)}
        />

        <Button
          type='primary'
          size='large'
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const dataToPost: Application = {
              _id: '614a2b2117215399af0355ee',
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
      </CandidateGuard>
    </Layout>
  );
};

import { Button, Input, notification, Select } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { Application, ConnectedUser } from 'server/shared/customTypes';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { CandidateGuard } from 'src/modules/shared/AuthGuard';
import { Layout } from 'src/modules/shared/Layout';
import { PRIMARY } from 'src/shared/colors';
import { submitApplication } from '../network/candidate.network';

export const CandidateApplication = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [manifesto, setManifesto] = useState('');
  const [planOfAction, setPlanOfAction] = useState('');
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [postId, setPostId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectedUser, setConnectedUser] = useState<ConnectedUser>();

  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    if (session) {
      setConnectedUser(session.user as ConnectedUser);
    }
  }, [session]);

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

        <h2>Manifesto (present yourself) </h2>
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
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: PRIMARY,
            borderColor: 'transparent',
          }}
          onClick={async () => {
            setIsLoading(true);
            const dataToPost: Application = {
              _id: connectedUser?._id as string,
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
                router.back();
              } else if (data.message) {
                notification.error({
                  message: 'Error',
                  description: data.message,
                });
                router.back();
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

import { Button, Form, notification, Select } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { ConnectedUser } from 'server/shared/customTypes';
import { fetchPosts } from 'src/modules/admin/network/admin.network';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { Layout } from 'src/modules/shared/Layout';
import { ROUTES } from 'src/routes';
import { addVotes } from '../network/voter.network';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const VotePage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [candidates, setCandidates] = useState<CandidateEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      <p>Start voting </p>
      <Form
        layout={formLayout}
        form={form}
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 25 }}
        initialValues={{}}
        scrollToFirstError
        onFinish={async (data) => {
          setIsLoading(true);
          let votes: any[] = [];
          Object.keys(data).map((postId) => {
            votes.push({
              voter: connectedUser?._id as string,
              post: postId,
              candidate: data[postId],
              voteDate: new Date().toISOString(),
            });
          });
          addVotes(votes).then((data) => {
            if (data.acknowledged) {
              notification.success({
                message: 'Success',
                description: 'Your vote has been registered',
              });
              router.push(ROUTES.VOTER.CANDIDATE_LIST);
            } else if (data.message) {
              notification.error({
                message: 'Error',
                description: 'Your have already voted!!!',
              });
            } else {
              notification.error({
                message: 'Error',
                description: 'An error occured. Try again!!!',
              });
            }
          });
          setIsLoading(false);
        }}
      >
        {posts.map((post) => (
          <Form.Item
            key={post._id}
            name={post._id}
            label={<h2>{post.name} </h2>}
            rules={[
              {
                required: true,
                message: 'Select a field',
              },
            ]}
          >
            <Select placeholder='select your candidate'>
              {candidates
                .filter((candidate) => candidate.post == post._id)
                .map((candidate) => (
                  <Select.Option key={candidate._id} value={candidate._id}>
                    {candidate.name}
                  </Select.Option>
                ))}
              <Select.Option key='none' value='----'>
                ----
              </Select.Option>
            </Select>
          </Form.Item>
        ))}

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

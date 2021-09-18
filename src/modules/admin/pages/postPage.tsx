import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { ButtonWithModal } from 'src/modules/shared/ButtonWithModal/ButtonWithModal';
import { DataTable } from 'src/modules/shared/DataTable';
import { Layout } from 'src/modules/shared/Layout';
import { PostForm } from '../components/postForm';
import { fetchPosts } from '../network/admin.network';

export const PostPage = () => {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Layout>
      <Space>
        <Button>View Stats</Button>
        <Button>View Results</Button>
      </Space>
      <h2>List of different posts in the bureau</h2>
      <DataTable<PostEntity>
        columns={postsColumns}
        filterFunction={(post: PostEntity, filterValue: string) =>
          post.name.toLowerCase().includes(filterValue)
        }
        data={[...posts]}
        AddButton={
          <ButtonWithModal
            buttonText='Add a new Post'
            modalProps={{ title: 'Add a new Post' }}
          >
            {(closeModal) => (
              <PostForm
                closeModal={closeModal}
                onAdd={(post: PostEntity) => {
                  setPosts([...posts, post]);
                }}
              />
            )}
          </ButtonWithModal>
        }
      />
    </Layout>
  );
};

const postsColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Number of Candidates',
    dataIndex: 'numberCandidates',
    key: 'numberCandidates',
  },
];

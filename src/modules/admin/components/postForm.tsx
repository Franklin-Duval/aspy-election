import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { addPost } from '../network/admin.network';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const PostForm = ({
  closeModal,
  onAdd,
}: {
  closeModal: () => void;
  onAdd: (post: PostEntity) => void;
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data: PostEntity) => {
        setIsLoading(true);
        data.numberCandidates = 0;
        const response = await addPost(data);
        if (response._id) {
          notification.success({
            message: 'Success',
            description: 'You have added a new post',
            duration: 10,
          });
          closeModal();
          onAdd(response);
        } else {
          notification.error({
            message: 'Error',
            description: 'Sorry!!! An error has occured. Try again once more..',
            duration: 10,
          });
        }

        setIsLoading(false);
      }}
    >
      <Form.Item
        label='Name'
        name='name'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your name is necessary',
          },
        ]}
      >
        <Input placeholder='name' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

/* eslint-disable no-unused-vars */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, Upload } from 'antd';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { PRIMARY } from 'src/shared/colors';
import { DEPARTMENTS, LEVELS } from 'src/shared/constants';
import { addCandidate } from '../network/candidate.network';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const RegistrationForm = () => {
  const router = useRouter();
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
      onFinish={async (data) => {
        setIsLoading(true);
        const profilePicture = data.upload?.fileList[0]?.originFileObj;
        const postData = {
          ...data,
          image: profilePicture,
        } as CandidateEntity;

        const response = await addCandidate(postData);
        if (response._id) {
          notification.success({
            message: 'Success',
            description:
              'Your have been registered as a candidate. Login into your account',
            duration: 10,
          });
          setIsLoading(false);
          signIn('credentials');
        } else if (response.message) {
          notification.error({
            message: 'Error',
            description: response.message,
            duration: null,
          });
          setIsLoading(false);
        } else {
          notification.error({
            message: 'Error',
            description: 'Sorry!!! An error has occured. Try again once more..',
            duration: 10,
          });
        }
      }}
    >
      <Form.Item name='upload' label='Profile picture'>
        <Upload name='image' listType='picture'>
          <Button icon={<UploadOutlined />}>Load your profile picture</Button>
        </Upload>
      </Form.Item>
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

      <Form.Item
        label='Surename'
        name='surename'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your surename is necessary',
          },
        ]}
      >
        <Input placeholder='surename' />
      </Form.Item>

      <Form.Item
        label='Contact'
        name='contact'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your contact is necessary',
          },
        ]}
      >
        <Input placeholder='contact' />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        hasFeedback
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Your email is necessary',
          },
        ]}
      >
        <Input placeholder='email' />
      </Form.Item>

      <Form.Item
        label='Matricule'
        name='matricule'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your matricule is necessary',
          },
        ]}
      >
        <Input placeholder='matricule' />
      </Form.Item>

      <Form.Item
        label='Department'
        name='department'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your department must be precised',
          },
        ]}
      >
        <Select placeholder='department'>
          {DEPARTMENTS.map((department) => (
            <Select.Option key={department.value} value={department.value}>
              {department.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='Level'
        name='level'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your level must be precised',
          },
        ]}
      >
        <Select placeholder='level'>
          {LEVELS.map((level) => (
            <Select.Option key={level.value} value={level.value}>
              {level.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
      >
        <Input.Password placeholder='password' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          size='large'
          style={{
            width: '100%',
            backgroundColor: PRIMARY,
            borderColor: 'transparent',
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

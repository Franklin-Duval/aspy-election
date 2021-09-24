import styled from '@emotion/styled';
import { Button, Form, Image, Input } from 'antd';
import { CtxOrReq, getCsrfToken, signIn } from 'next-auth/client';
import { useState } from 'react';
import { ROUTES } from 'src/routes';
import { defaultImage } from 'src/shared/defaultImage';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: gold;
  background-image: linear-gradient(to bottom, #263238, white);

  > div {
    background-color: white;
    width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 20px;
  }

  @media (min-width: 768px) {
    padding: 0px;
    > div {
      width: 400px;
    }
  }
`;

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  return (
    <SignInContainer>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            alt='logo'
            src='/logo.png'
            height={120}
            width={120}
            preview={false}
            style={{ objectFit: 'cover' }}
            fallback={defaultImage}
          />
        </div>
        <Form
          layout={formLayout}
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 25 }}
          initialValues={{ csrfToken }}
          scrollToFirstError
          onFinish={async (data) => {
            const { matricule, password } = data;
            signIn('credentials', {
              matricule,
              password,
              register: false,
              callbackUrl: `${window.location.origin}${ROUTES.VOTER.CANDIDATE_LIST}`,
              redirect: true,
            });
          }}
        >
          <Form.Item name='csrfToken'>
            <Input name='csrfToken' type='hidden' />
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
              size='large'
              style={{
                width: '100%',
                backgroundColor: '#263238',
                borderColor: 'transparent',
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </SignInContainer>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

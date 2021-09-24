import styled from '@emotion/styled';
import { Button, Image } from 'antd';
import { signIn } from 'next-auth/client';
import { PRIMARY } from 'src/shared/colors';
import { defaultImage } from 'src/shared/defaultImage';

const UnauthorizedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;

  .title {
    font-size: 25px;
    text-align: center;
    color: red;
  }

  .text-description {
    font-size: 16px;
    text-align: center;
    color: grey;
    margin-bottom: 20px;
  }

  > div {
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  @media (min-width: 768px) {
    > div {
      width: 500px;
    }
  }
`;

export const Unauthorized = () => {
  return (
    <UnauthorizedContainer>
      <div>
        <h3 className='title'>Warning!!!</h3>
        <Image
          alt='unauthorized'
          src='/401.svg'
          width={250}
          style={{ objectFit: 'cover' }}
          fallback={defaultImage}
          preview={false}
        />
        <h3 className='text-description'>
          You are not authorized to access this page without being
          authenticated. Go to the login page
        </h3>
        <Button
          size='large'
          type='primary'
          onClick={() => signIn('credentials')}
          style={{
            backgroundColor: PRIMARY,
            borderColor: 'transparent',
            width: '90%',
          }}
        >
          SignIn
        </Button>
      </div>
    </UnauthorizedContainer>
  );
};

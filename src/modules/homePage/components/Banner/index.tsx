import styled from '@emotion/styled';
import { Space } from 'antd';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ROUTES } from 'src/routes';
import { ButtonOutline } from '../../styles/Button';

const BannerContainer = styled.div`
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  background-color: #263238;

  > .title {
    color: white;
    font-size: 40px;
    max-width: 900px;
    text-align: center;
  }

  > .description {
    color: #eceff1;
    font-size: 18px;
    text-align: center;
    max-width: 750px;
  }

  @media (min-width: 768px) {
    > .title {
      font-size: 60px;
    }
  }
`;

export const Banner = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const router = useRouter();
  return (
    <BannerContainer>
      <h1 className='title'>{title}</h1>
      <p className='description'>{description}</p>
      <Space style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <ButtonOutline onClick={() => signIn('credentials')}>
          Login
        </ButtonOutline>
        <ButtonOutline onClick={() => router.push(ROUTES.VOTER.REGISTRATION)}>
          Register as Voter
        </ButtonOutline>
        <ButtonOutline
          onClick={() => router.push(ROUTES.CANDIDATE.REGISTRATION)}
        >
          Register as Candidate
        </ButtonOutline>
      </Space>
    </BannerContainer>
  );
};

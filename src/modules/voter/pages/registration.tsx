/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Image } from 'antd';
import { PRIMARY } from 'src/shared/colors';
import { defaultImage } from 'src/shared/defaultImage';
import { RegistrationForm } from '../components/registrationForm';

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, ${PRIMARY}, white);

  > div {
    background-color: white;
    width: 300px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  @media (min-width: 768px) {
    > div {
      width: 450px;
    }
  }
`;

export const Registration = () => {
  return (
    <RegistrationContainer>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Image
            alt='logo'
            src='/logo.png'
            height={100}
            width={120}
            preview={false}
            style={{ objectFit: 'contain' }}
            fallback={defaultImage}
          />
        </div>
        <RegistrationForm />
      </div>
    </RegistrationContainer>
  );
};

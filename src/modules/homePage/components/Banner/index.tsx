import styled from '@emotion/styled';
import { Button } from '../../styles/Button';

const BannerContainer = styled.div`
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  > .title {
    color: #48347c;
    font-size: 40px;
    max-width: 900px;
    text-align: center;
  }

  > .description {
    color: #6b707a;
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
  buttonProps,
}: {
  title: string;
  description: string;
  buttonProps: { text: string; onClick: () => void };
}) => {
  return (
    <BannerContainer>
      <h1 className='title'>{title}</h1>
      <p className='description'>{description}</p>
      {buttonProps.text && (
        <Button onClick={() => buttonProps?.onClick()}>
          {buttonProps.text}
        </Button>
      )}
    </BannerContainer>
  );
};

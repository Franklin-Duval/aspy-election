import styled from '@emotion/styled';

const AdvantageBlockContainer = styled.div`
  width: 300px;
  margin: 10px;

  > .title {
    font-size: 24px;
    line-height: 40px;
    text-align: center;
    color: white;
  }

  > .content {
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  > .icon {
    display: flex;
    justify-content: center;
  }
`;

export const AdvantageBlock = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <AdvantageBlockContainer>
      <div className='icon'>{icon}</div>
      <h3 className='title'>{title} </h3>
      <p className='content'>{content} </p>
    </AdvantageBlockContainer>
  );
};

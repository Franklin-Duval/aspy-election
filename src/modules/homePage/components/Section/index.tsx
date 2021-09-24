import styled from '@emotion/styled';
import { Image } from 'antd';
import { PRIMARY } from 'src/shared/colors';
import { defaultImage } from 'src/shared/defaultImage';

const SectionContainer = styled.div<{ reverse?: boolean }>`
  min-height: 400px;
  display: flex;
  flex-direction: ${(props) =>
    props.reverse === true ? 'row-reverse' : 'row'};
  padding: 20px;
  padding-left: 5%;
  padding-right: 5%;
  flex-wrap: wrap;

  > .block {
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 300px;
  }

  > .textBox {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > .title {
      font-size: 30px;
      color: ${PRIMARY};
    }

    > .content {
      font-size: 18px;
      color: #777;
    }

    @media (min-width: 1200px) {
      > .title {
        font-size: 35px;
      }

      > .content {
        font-size: 20px;
      }
    }
  }
`;

export const Section = ({
  textBeforeImage,
  imageUrl,
  title,
  content,
}: {
  textBeforeImage?: boolean;
  imageUrl: string;
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <SectionContainer reverse={textBeforeImage} id='about'>
      <div className='block'>
        <Image
          src={imageUrl}
          alt='website'
          preview={false}
          fallback={defaultImage}
          width={330}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className='block textBox'>
        <h1 className='title'>{title}</h1>
        <p className='content'>{content}</p>
      </div>
    </SectionContainer>
  );
};

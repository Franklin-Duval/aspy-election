import styled from '@emotion/styled';
import { Card, Image, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { FaBook, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { ROUTES } from 'src/routes';
import { defaultImage } from 'src/shared/defaultImage';

const CardContainer = styled.div`
  margin: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);

  .name {
    font-size: 16px;
    margin-bottom: 5px;
    font-family: 'Montserrat';
  }

  .department {
    color: #777;
    font-size: 14px;
    margin-bottom: 5px;
    font-family: 'Tauri';
  }

  .level {
    color: #777;
    font-size: 14px;
    margin-bottom: 0;
    font-family: 'Tauri';
  }
`;

export const CandidateCard = ({
  candidate,
}: {
  candidate: CandidateEntity;
}) => {
  const router = useRouter();
  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 300 }}
        actions={[
          <Tooltip key='book' title='View details'>
            <FaBook
              size={20}
              onClick={() =>
                router.push(ROUTES.VOTER.CANDIDATE_DETAILS(candidate._id))
              }
            />
          </Tooltip>,
          <span key='heart'>
            <FaHeart size={20} color='red' />
            <sub style={{ color: 'black', fontSize: 12 }}>0</sub>
          </span>,
          <span key='heartb'>
            <FaHeartBroken size={20} color='red' />
            <sub style={{ color: 'black', fontSize: 12 }}>0</sub>
          </span>,
        ]}
        cover={
          <Image
            alt='profil_image'
            height={200}
            width='100%'
            style={{ objectFit: 'cover' }}
            src={API_ROUTES.IMAGES.GET(candidate.image)}
            fallback={defaultImage}
          />
        }
      >
        <div>
          <p className='name'>
            {candidate.name} {candidate.surename}
          </p>
          <p className='department'>{candidate.department} </p>
          <p className='level'>{candidate.level} </p>
        </div>
      </Card>
    </CardContainer>
  );
};

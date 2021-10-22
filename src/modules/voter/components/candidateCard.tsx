import styled from '@emotion/styled';
import { Card, Image, Tooltip } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBook, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { ConnectedUser } from 'server/shared/customTypes';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { ROUTES } from 'src/routes';
import { defaultImage } from 'src/shared/defaultImage';
import { addDislike, addLike } from '../network/voter.network';

const CardContainer = styled.div`
  margin: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  height: 100%;

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
  const [session, loading] = useSession();
  const [likes, setLikes] = useState(candidate.likes);
  const [dislikes, setDislikes] = useState(candidate.dislikes);
  const [connectedUser, setConnectedUser] = useState<ConnectedUser>();

  useEffect(() => {
    if (session) {
      setConnectedUser(session.user as ConnectedUser);
    }
  }, [session]);

  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 300 }}
        actions={[
          <Tooltip key='book' title='View details'>
            <span
              onClick={() =>
                router.push(ROUTES.VOTER.CANDIDATE_DETAILS(candidate._id))
              }
            >
              <FaBook size={20} />
              <p style={{ margin: 0, fontSize: 12, color: 'black' }}>Details</p>
            </span>
          </Tooltip>,
          <span
            key='heart'
            onClick={async () => {
              await addLike(candidate._id, connectedUser?._id as string).then(
                (data: CandidateEntity) => {
                  setLikes(data.likes);
                  setDislikes(data.dislikes);
                },
              );
            }}
          >
            {likes?.includes(connectedUser?._id as string) ? (
              <FaHeart size={20} color='red' />
            ) : (
              <FiHeart size={20} color='black' />
            )}
            <sub style={{ color: 'black', fontSize: 12 }}>
              {likes?.length || 0}
            </sub>
          </span>,
          <span
            key='heartb'
            onClick={async () => {
              await addDislike(
                candidate._id,
                connectedUser?._id as string,
              ).then((data: CandidateEntity) => {
                setLikes(data.likes);
                setDislikes(data.dislikes);
              });
            }}
          >
            <FaHeartBroken size={20} color='red' />
            <sub style={{ color: 'black', fontSize: 12 }}>
              {dislikes?.length || 0}
            </sub>
          </span>,
        ]}
        cover={
          <Image
            alt='profil_image'
            height={200}
            width='100%'
            style={{ objectFit: 'cover' }}
            src={
              candidate.image
                ? API_ROUTES.IMAGES.GET(candidate.image)
                : defaultImage
            }
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

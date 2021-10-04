import styled from '@emotion/styled';
import { Card, Image } from 'antd';
import { VoterEntity } from 'server/modules/voter/entities/voter.entity';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
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

export const UserCard = ({ user }: { user: VoterEntity }) => {
  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <Image
            alt='profil_image'
            height={200}
            width='100%'
            style={{ objectFit: 'cover' }}
            src={user.image ? API_ROUTES.IMAGES.GET(user.image) : defaultImage}
            fallback={defaultImage}
          />
        }
      >
        <div>
          <p className='name'>
            {user.name} {user.surename}
          </p>
          <p className='department'>{user.department} </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='level'>{user.level} </p>
            <p className='level'>{user.contact} </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='level'>
              Voted:{' '}
              <span style={{ color: 'red' }}> {user.voted ? 'YES' : 'NO'}</span>
            </p>
            <p className='level'>{user.matricule}</p>
          </div>
        </div>
      </Card>
    </CardContainer>
  );
};

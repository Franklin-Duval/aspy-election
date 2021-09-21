import styled from '@emotion/styled';
import { Image, Space, Tooltip } from 'antd';
import parser from 'html-react-parser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAngleRight, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { getCandidate } from 'src/modules/candidate/network/candidate.network';
import { API_ROUTES } from 'src/modules/shared/ApiRoutes/API_ROUTES';
import { Layout } from 'src/modules/shared/Layout';
import { defaultImage } from 'src/shared/defaultImage';

const CandidateDetailContainer = styled.div`
  padding-top: 30px;
  .image {
    width: 300px;
    height: 300px;
  }

  .like {
    cursor: pointer;
  }

  .infoContainer {
    font-family: 'Montserrat';
    display: flex;
    flex-direction: column-reverse;
  }

  .topContainer {
    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .image {
      width: 300px;
      height: 315px;
    }

    .infoContainer {
      margin-left: 20px;
      flex-direction: column;
    }
  }
`;

export const CandidateDetails = () => {
  const router = useRouter();
  const candidateId = router.query.candidateId as string;
  const [candidate, setCandidate] = useState<CandidateEntity>();

  useEffect(() => {
    if (candidateId) {
      getCandidate(candidateId).then((data) => setCandidate(data));
    }
  }, [candidateId]);

  return (
    <Layout>
      {!candidate ? (
        <BeatLoader size={30} loading={true} />
      ) : (
        <CandidateDetailContainer>
          <div className='topContainer'>
            <Image
              alt='logo'
              className='image'
              src={API_ROUTES.IMAGES.GET(candidate.image)}
              style={{ objectFit: 'cover' }}
              fallback={defaultImage}
            />
            <div className='infoContainer'>
              <div>
                <h2>
                  <span style={{ textTransform: 'uppercase' }}>
                    {candidate.name}
                  </span>{' '}
                  <span style={{ textTransform: 'capitalize' }}>
                    {candidate.surename}
                  </span>
                </h2>
                <h3>{candidate.post} </h3>
                <p>{candidate.department} </p>
                <p>{candidate.level} </p>
                <p>Contact : {candidate.contact} </p>
                <p>Email : {candidate.email} </p>
                <p>Matricule : {candidate.matricule} </p>
              </div>
              <div>
                <hr />
                <Space size={20}>
                  <Tooltip title='Like'>
                    <span className='like'>
                      <FaHeart size={30} color='red' />
                      <sub>0</sub>
                    </span>
                  </Tooltip>
                  <Tooltip title='Dislike'>
                    <span className='like'>
                      <FaHeartBroken size={30} color='red' />
                      <sub>0</sub>
                    </span>
                  </Tooltip>
                </Space>
                <hr />
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Montserrat' }}>
              <FaAngleRight color='red' style={{ marginBottom: -2 }} />
              Manifesto
            </h2>
            {parser(candidate.manifesto)}
          </div>
          <div>
            <h2 style={{ fontFamily: 'Montserrat' }}>
              <FaAngleRight color='red' style={{ marginBottom: -2 }} /> Plan of
              action
            </h2>
            {parser(candidate.planOfAction)}
          </div>
        </CandidateDetailContainer>
      )}
    </Layout>
  );
};

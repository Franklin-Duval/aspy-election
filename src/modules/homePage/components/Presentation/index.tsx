import styled from '@emotion/styled';
import { FaBuilding, FaLaptop, FaQrcode } from 'react-icons/fa';
import { AdvantageBlock } from './Advantage';

const PresentationContainer = styled.div`
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #48347c;
  width: 100%;
  color: white;
  padding: 40px;

  > .title {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    margin-bottom: 50px;
  }
`;

const advantageList = [
  {
    Icon: FaBuilding,
    title: 'Espace sécurisé',
    content:
      "Enregistrez votre entreprise et bénéficiez d'un espace entièrement sécurisé pour vos différentes activités",
  },
  {
    Icon: FaLaptop,
    title: 'Application Desktop',
    content:
      "Bénéficiez également d'une application desktop fonctionnel sur vos ordinateurs hors connexion",
  },
  {
    Icon: FaQrcode,
    title: 'QR Code',
    content:
      'Vous avez également a votre disposition un QR code sur vos équipement pour une identification rapide',
  },
];

export const Presentation = () => {
  return (
    <PresentationContainer id='presentation'>
      <h2 className='title'>Pourquoi MAEL ?</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {advantageList.map(({ Icon, ...advantage }) => (
          <AdvantageBlock
            key={advantage.title}
            icon={<Icon size={50} />}
            title={advantage.title}
            content={advantage.content}
          />
        ))}
      </div>
    </PresentationContainer>
  );
};

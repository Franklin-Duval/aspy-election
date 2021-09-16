import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from 'src/routes/constants';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { Presentation } from './components/Presentation';
import { Section } from './components/Section';
import { TopNavBar } from './components/TopNavBar';

const sectionList = [
  {
    textBeforeImage: false,
    imageUrl: '/mapLocation.svg',
    title: 'Localisez vos équipements à tout instant',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas omnis minus alias maiores doloribus cumque odio! Consectetur maiores voluptates quasi odio porro, soluta nesciunt eius. Consequuntur ipsamvoluptatibus nemo.',
  },
  {
    textBeforeImage: true,
    imageUrl: '/userAnalytic.svg',
    title: 'Gardez le control du système',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas omnis minus alias maiores doloribus cumque odio! Consectetur maiores voluptates quasi odio porro, soluta nesciunt eius. Consequuntur ipsamvoluptatibus nemo.',
  },
  {
    textBeforeImage: false,
    imageUrl: '/mapLocation.svg',
    title: 'Localisez vos équipements à tout instant',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas omnis minus alias maiores doloribus cumque odio! Consectetur maiores voluptates quasi odio porro, soluta nesciunt eius. Consequuntur ipsamvoluptatibus nemo.',
  },
];

export const Home = () => {
  const router = useRouter();
  return (
    <div>
      <div style={{ maxWidth: '85%', margin: 'auto' }}>
        <TopNavBar />
        <Banner
          title='Bienvenue sur MArk Equipment and Location'
          description='MAEL est une application qui permet le suivi et la localisation des
        équipements de votre entreprise à tout instant, disponible sur sa
        plateforme web et version Desktop pour vos ordinateurs'
          buttonProps={{
            text: 'Commencer',
            onClick: () => router.push(ROUTES.COMPANY.NEW_COMPANY),
          }}
        />
      </div>
      <Presentation />
      {sectionList.map(({ title, imageUrl, content, textBeforeImage }) => (
        <Section
          key={title}
          textBeforeImage={textBeforeImage}
          imageUrl={imageUrl}
          title={title}
          content={content}
        />
      ))}
      <Footer />
    </div>
  );
};

import { useRouter } from 'next/router';
import React from 'react';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { TopNavBar } from './components/TopNavBar';

const sectionList = [
  {
    textBeforeImage: false,
    imageUrl: '/voter.svg',
    title: 'Elect your candidates to the designed posts',
    content:
      'Register and create an account inorder to take part in ASPY Election and elect your different candidates',
  },
  {
    textBeforeImage: true,
    imageUrl: '/candidate.svg',
    title: 'Become a Candidate to participate in ASPY Election',
    content:
      'You can have the opportunity to parcipate and take part in the daily tasks and activities of ASPY, while managing the different affaires of the association',
  },
  {
    textBeforeImage: false,
    imageUrl: '/login.svg',
    title: 'Access to all informations concerning the election',
    content:
      'You have access to real time information about the election, and can consult the results whenever you want',
  },
];

export const Home = () => {
  const router = useRouter();
  return (
    <div>
      <div style={{ maxWidth: '85%', margin: 'auto' }}>
        <TopNavBar />
      </div>
      <Banner
        title='ASPY Voting Platform'
        description='This platform is precisely built inorder to manage the elections in ASPY, for a better and more efficient management of elections'
      />
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

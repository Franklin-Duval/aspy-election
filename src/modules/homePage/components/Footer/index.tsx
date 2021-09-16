import styled from '@emotion/styled';
import { Space } from 'antd';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #48347c;
  color: white;

  > .row {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    h3 {
      color: white;
      font-size: 20px;
    }

    > div {
      min-width: 250px;
      margin: 5px;
      > p {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 0.8;
      }
    }
  }

  .social-icon {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > p {
      font-size: 16px;
    }
  }
`;

const socialLinks = [
  {
    link: 'https://www.facebook.com/uzenze',
    icon: <FaFacebook size={25} />,
  },
  {
    link: 'https://www.instagram.com/uzenze_group/?hl=fr',
    icon: <FaInstagram size={25} />,
  },
  {
    link: 'https://www.linkedin.com/company/uzenze/',
    icon: <FaLinkedin size={25} />,
  },
  {
    link: 'https://www.youtube.com/channel/UCdbcCa8Z3_AU6rCTmG86llA',
    icon: <FaYoutube size={25} />,
  },
];

export const Footer = () => {
  return (
    <FooterContainer id='contact'>
      <div className='row'>
        <div>
          <h3>MAEL par Uzenze</h3>
          <p>Mael logo</p>
        </div>
        <div>
          <h3>Services</h3>
          <p>Télécharger version desktop</p>
          <p>Comment ça marche</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>Adresse: Chateau NGOA EKELE,Yaoundé</p>
          <p>Téléphone: (+237) 677 40 40 40</p>
          <p>Adresse Mail: contact@uzenze.com</p>
        </div>
      </div>

      <div>
        <hr />
        <div className='social-icon'>
          <Space>
            {socialLinks.map(({ link, icon }) => (
              <a key={link} href={link} target='_blank' rel='noreferrer'>
                {icon}
              </a>
            ))}
          </Space>
          <p>Copyright © 2021 - Uzenze.</p>
        </div>
      </div>
    </FooterContainer>
  );
};

import styled from '@emotion/styled';
import { Space } from 'antd';
import React from 'react';
import { FaChrome, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PRIMARY } from 'src/shared/colors';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: ${PRIMARY};
  color: white;

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
    link: 'https://www.facebook.com/ASPYonline',
    icon: <FaFacebook size={25} />,
  },
  {
    link: 'https://www.instagram.com/aspy_2000/',
    icon: <FaInstagram size={25} />,
  },
  {
    link: 'https://www.linkedin.com/company/aspy-official/',
    icon: <FaLinkedin size={25} />,
  },
  {
    link: 'https://www.aspyonline.org/',
    icon: <FaChrome size={25} />,
  },
  {
    link: 'officialaspy@gmail.com',
    icon: <MdEmail size={25} />,
  },
];

export const Footer = () => {
  return (
    <FooterContainer id='contact'>
      <div className='social-icon'>
        <Space size={30}>
          {socialLinks.map(({ link, icon }) => (
            <a key={link} href={link} target='_blank' rel='noreferrer'>
              {icon}
            </a>
          ))}
        </Space>
        <p>Copyright © 2021 - ASPY.</p>
      </div>
    </FooterContainer>
  );
};

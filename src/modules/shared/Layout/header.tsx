import styled from '@emotion/styled';
import { Image, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { ROUTES } from 'src/routes';
import { defaultImage } from 'src/shared/defaultImage';

const NavLink = styled.p`
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #263238;

  > .logo {
    flex: 2;

    h2 {
      color: white;
    }
  }

  > .linkContainer {
    display: none;
  }

  > .menu-button {
    display: block;
    cursor: pointer;
  }

  .user-info {
    line-height: 1.3;

    > h3 {
      color: white;
      margin: 0;
    }

    > h5 {
      color: white;
      margin-bottom: 5px;
    }
  }

  @media (min-width: 768px) {
    > .linkContainer {
      display: flex;
      flex: 5;
      justify-content: space-around;
      align-items: center;
      padding-left: 0px;
    }

    > .menu-button {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    > .linkContainer {
      flex: 3;
      padding-left: 20%;
    }
  }

  .menu {
    height: 300px;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #263238;
    overflow-x: hidden;
    transition: 0.5s;
    padding: 30px;
  }

  .menu-close {
    height: 0px;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #263238;
    overflow-x: hidden;
    transition: 0.5s;
  }

  .menu-linkContainer {
    display: flex;
    flex-direction: column;
  }
`;

const MenuContent = ({ closeMenu }: { closeMenu?: () => void }) => {
  const router = useRouter();
  return (
    <div className={closeMenu ? 'menu-linkContainer' : 'linkContainer'}>
      <NavLink
        onClick={() => {
          closeMenu?.();
          router.push(ROUTES.HOME_PAGE);
        }}
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => {
          closeMenu?.();
          router.push(ROUTES.VOTER.CANDIDATE_LIST);
        }}
      >
        Candidate list
      </NavLink>
      <NavLink onClick={() => router.push(ROUTES.HOME_PAGE)}>
        <Space>
          <FaSignOutAlt size={20} style={{ marginBottom: -5 }} /> Log out
        </Space>
      </NavLink>
      <Space>
        <FaUserCircle size={40} color='white' />
        <div className='user-info'>
          <h3>Talom Franklin</h3>
          <h5>Level 5</h5>
        </div>
      </Space>
    </div>
  );
};

export const Header = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <HeaderContainer>
      <Space className='logo'>
        <Image
          alt='logo'
          src='/logo.png'
          height={40}
          width={50}
          preview={false}
          style={{ objectFit: 'contain' }}
          fallback={defaultImage}
          onClick={() => router.push(ROUTES.HOME_PAGE)}
        />
        <h2>ASPY Election</h2>
      </Space>
      <MenuContent />

      <div className={showMenu ? 'menu' : 'menu-close'}>
        <AiOutlineClose
          size={30}
          color='white'
          style={{ cursor: 'pointer' }}
          onClick={() => setShowMenu(false)}
        />
        <MenuContent closeMenu={() => setShowMenu(false)} />
      </div>
      <div className='menu-button' onClick={() => setShowMenu(true)}>
        <FaBars size={30} color='white' />
      </div>
    </HeaderContainer>
  );
};

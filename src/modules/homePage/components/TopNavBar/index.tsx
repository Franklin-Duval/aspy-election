import styled from '@emotion/styled';
import { Image, Space } from 'antd';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { ROUTES } from 'src/routes';
import { defaultImage } from 'src/shared/defaultImage';
import { Button } from '../../styles/Button';

const NavLink = styled.a`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TopNavBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  padding-top: 30px;

  > .logo {
    flex: 2;
  }

  > .linkContainer {
    display: none;
  }

  > .menu-button {
    display: block;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    > .linkContainer {
      display: flex;
      flex: 6;
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
    background-color: #f7f7f7;
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
    background-color: #f7f7f7;
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
      <NavLink href='#presentation' onClick={closeMenu}>
        Home
      </NavLink>
      <NavLink href='#contact' onClick={closeMenu}>
        Contact
      </NavLink>
      <Button onClick={() => signIn('credentials')}>Login</Button>
    </div>
  );
};

export const TopNavBar = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <TopNavBarContainer>
      <Space className='logo'>
        <Image
          alt='logo'
          src='/logo.png'
          height={55}
          width={60}
          preview={false}
          style={{ objectFit: 'cover' }}
          fallback={defaultImage}
          onClick={() => router.push(ROUTES.HOME_PAGE)}
        />
        <h2>ASPY Election</h2>
      </Space>
      <MenuContent />

      <div className={showMenu ? 'menu' : 'menu-close'}>
        <AiOutlineClose
          size={30}
          style={{ cursor: 'pointer' }}
          onClick={() => setShowMenu(false)}
        />
        <MenuContent closeMenu={() => setShowMenu(false)} />
      </div>
      <div className='menu-button' onClick={() => setShowMenu(true)}>
        <FaBars size={30} />
      </div>
    </TopNavBarContainer>
  );
};

import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../hooks/onClickOutsideNavBar';
import { MenuContext } from '../context/navState';
import HamburgerButton from './HamburgerButton';
import { SideMenu } from './SideMenu';

import {AuthContext} from '../context/AuthContext'

import {useHistory} from 'react-router-dom'

const Navbar = styled.div`
  display: flex;
  // position: fixed;
  left: 0;
  right: 0;
  box-sizing: border-box;
  outline: currentcolor none medium;
  max-width: 100%;
  margin: 0px;
  align-items: center;
  // background: #082bff none repeat scroll 0% 0%;
  // color: rgb(248, 248, 248);
  background-image: linear-gradient(to top right, rgb(31, 50, 255), 
  rgb(47, 55, 247), rgb(63, 60, 239), rgb(79, 66, 231), 
  rgb(95, 71, 223), rgb(111, 76, 215), rgb(126, 81, 208), rgb(142, 86, 200), 
  rgb(158, 91, 192), rgb(174, 97, 184), rgb(190, 102, 176), rgb(206, 107, 168));
  min-width: 0px;
  min-height: 0px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
  z-index: 500;
`;


const Nav_title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Close_icons = styled.i`
:hover {
  cursor: pointer;
}
`

const Main_logo_p = styled.p`
  font-size: 30px;
`

const Main_logo_span = styled.span`
  font-size: 30px;
  color: green;
`


const MainMenu = () => {
  const history = useHistory()

  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/'); // redirect to default page
  }


  const node = useRef();
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  useOnClickOutside(node, () => {
    // Only if menu is open
    if (isMenuOpen) {
      toggleMenuMode();
    }
  });

  return (
    <header ref={node}>
      <Navbar>
        <Nav_title>
            <HamburgerButton />
            <Main_logo_p>
              Finanse
            </Main_logo_p>
            <Main_logo_span>
              Guru
            </Main_logo_span>
         
        </Nav_title>
        <Close_icons onClick={logoutHandler} className="material-icons dp48">close</Close_icons>

      </Navbar>
      <SideMenu />
    </header>
  );
};

export default MainMenu;
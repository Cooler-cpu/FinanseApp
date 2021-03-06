import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { MenuContext } from '../context/navState';
import arrow from '../img/arrow.svg';
import {NavLink} from 'react-router-dom'


const Menu = styled.nav`
  position: absolute;
  // top: 0px;
  top: 60px;
  left: 0px;
  bottom: 0px;
  z-index: 293;
  display: block;
  width: 120px;
  max-width: 100%;
  margin-top: 0px;
  padding-top: 0px;
  padding-right: 0px;
  align-items: stretch;
  // background-color: #001698;
  background-image: linear-gradient(to bottom, rgb(50, 60, 168), rgb(62, 70, 169), 
  rgb(74, 79, 169), rgb(87, 89, 170), rgb(99, 98, 171), rgb(111, 108, 172), rgb(123, 117, 172), 
  rgb(135, 127, 173), rgb(147, 136, 174), rgb(160, 146, 175), rgb(172, 155, 175), rgb(184, 165, 176));
  transform: translateX(-100%);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 280px;
  border-radius: 10px;
  ${(props) =>
    props.open &&
    css`
      transform: translateX(0);
    `}
`;

export const MenuLink = styled.a`
  position: relative;
  display: block;
  text-align: left;
  max-width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 5%;
  background-image: url(${arrow});
  background-position: 88% 50%;
  background-size: 36px;
  background-repeat: no-repeat;
  transition: background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  text-decoration: none;
  color: #fff;
  font-size: 13px;
  line-height: 120%;
  font-weight: 500;
  color: black;
  :hover {
    background-position: 90% 50%;
  }
`;

export const SideMenu = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);

  return <Menu open={isMenuOpen}>{children}</Menu>;
};

SideMenu.propTypes = {
  children: PropTypes.node,
};

SideMenu.defaultProps = {
  children: (
    <>
      <MenuLink href="/app">Главная</MenuLink>
      <MenuLink>
        <NavLink to="/profile"> Профиль </NavLink>
      </MenuLink>
      <MenuLink href="/about">О сайте</MenuLink>
      <MenuLink href="/contact">Контакт</MenuLink>
    </>
  ),
};
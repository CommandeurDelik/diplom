import React from 'react';
import PropTypes from 'prop-types';

import { Icon, AboutTooltip } from 'shared/components';

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const UserExit =  () => {
    localStorage.clear()
    window.location.href = '/'
}

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>

    <Item onClick={issueSearchModalOpen}>
      <Icon type="search" size={22} top={1} left={3} />
      <ItemText>Поиск задачи</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Создать задачу</ItemText>
    </Item>

        <Item onClick={() => UserExit()}>
            <Icon type="help" size={25} />
            <ItemText>Новый сотрудник</ItemText>
        </Item>
      <Bottom>
        <Item onClick={() => UserExit()}>
            <Icon type="help" size={25} />
            <ItemText>Выйти</ItemText>
        </Item>
    </Bottom>
  </NavLeft>
);

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;

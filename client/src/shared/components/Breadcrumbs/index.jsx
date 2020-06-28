import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Container, Divider } from './Styles';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const Breadcrumbs = ({ items }) => (
  <Container>
    {items.map((item, index) => (
      <Fragment key={index}>
        {index !== 0 && <Divider>/</Divider>}
        {item}
      </Fragment>
    ))}
  </Container>
);

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;

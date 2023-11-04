import React from 'react';
import { Badge, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Step = ({
  url = '',
  isActive = false,
  disable = false,
  innerText = '',
}) => {
  return (
    <Badge
      pill
      bg={isActive ? 'dark' : 'light'}
      className='mx-2'
    >
      <LinkContainer to={url}>
        <Nav.Link
          className={isActive && 'text-white'}
          disabled={disable}
        >
          {innerText}
        </Nav.Link>
      </LinkContainer>
    </Badge>
  );
};

export default Step;

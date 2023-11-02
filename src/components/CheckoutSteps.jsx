import { Badge, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <Badge
            pill
            bg='light'
            className='ms-2'
          >
            <LinkContainer to='/login'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          </Badge>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Badge
            pill
            bg='light'
            className='ms-2'
          >
            <LinkContainer to='/shipping'>
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          </Badge>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Badge
            pill
            bg='light'
            className='ms-2'
          >
            <LinkContainer to='/payment'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          </Badge>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Badge
            pill
            bg='light'
            className='ms-2'
          >
            <LinkContainer to='/placeorder'>
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          </Badge>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;

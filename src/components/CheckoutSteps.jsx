import { Nav } from 'react-bootstrap';

import { FaArrowRight } from 'react-icons/fa';

import Step from './Step';

const CheckoutSteps = ({ stepNumber = 1 }) => {
  const navItems = [
    {
      url: '/login',
      innerText: 'Sign In',
    },
    {
      url: '/shipping',
      innerText: 'Shipping',
    },
    {
      url: '/payment',
      innerText: 'Payment',
    },
    {
      url: '/placeorder',
      innerText: 'Place Order',
    },
  ];

  const items = navItems.map((item, index) => (
    <Nav.Item key={index + 1}>
      <Step
        url={item.url}
        isActive={index + 1 === stepNumber}
        disable={index + 1 > stepNumber}
        innerText={item.innerText}
      />
      {index < navItems.length - 1 && <FaArrowRight />}
    </Nav.Item>
  ));
  return <Nav className='justify-content-center mb-4'>{items}</Nav>;
};

export default CheckoutSteps;

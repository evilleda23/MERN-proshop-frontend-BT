import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';

import { addToCart, removeFromCart } from '../slices/cart.slice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  let disableCheckout = cartItems.length === 0;
  return (
    <Row>
      <Col md={8}>
        <h1 className='mb-20'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      type='number'
                      value={item.qty}
                      max={item.countInStock}
                      min={1}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue >= 0 && newValue <= item.countInStock) {
                          e.target.value = newValue;
                          addToCartHandler(item, newValue);
                        }
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => {
                        removeFromCartHandler(item._id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='m-0 p-0'>
                Subtotal (
                {cartItems.reduce((acc, item) => {
                  if (item.qty === 0) disableCheckout = true;
                  return item.qty + acc;
                }, 0)}
                ) items
              </h2>
              <p className='fs-5 mt-2'>
                ${' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={disableCheckout}
                onClick={() => {
                  checkoutHandler();
                }}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;

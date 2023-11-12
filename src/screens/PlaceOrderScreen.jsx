import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/order.api.slice';
import { clearCartItems } from '../slices/cart.slice';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  useEffect(() => {
    if (!paymentMethod) navigate('/payment');

    if (!shippingAddress.address) navigate('/shipping');
  }, [paymentMethod, shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const { data } = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error, {
        position: 'bottom-right',
      });
    }
  };
  return (
    <>
      <CheckoutSteps stepNumber={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping </h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items </h2>
              <>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <>
                    <strong>Items: </strong>
                    <ListGroup variant='flush'>
                      {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              ></Image>
                            </Col>
                            <Col>
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}
              </>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>

                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ fontWeight: 'bold' }}>Total:</Col>
                  <Col style={{ fontWeight: 'bold' }}>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

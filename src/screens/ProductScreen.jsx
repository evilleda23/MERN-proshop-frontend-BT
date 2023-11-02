import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import { useGetProductByIdQuery } from '../slices/products.api.slice';
import { addToCart } from '../slices/cart.slice';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(productId);

  const { data: product } = data || {};

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate(`/cart`);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error || 'Error'}
        </Message>
      ) : (
        <>
          <Link
            className='btn btn-light my-3'
            to='/'
          >
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                fluid
              ></Image>
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            type='number'
                            value={qty}
                            max={product.countInStock}
                            min={1}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              if (
                                newValue >= 0 &&
                                newValue <= product.countInStock
                              ) {
                                e.target.value = newValue;
                                setQty(newValue);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      disabled={product.countInStock === 0}
                      type='button'
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

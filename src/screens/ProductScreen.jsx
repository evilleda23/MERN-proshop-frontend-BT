import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import environment from '../environments';
import { get } from '../utils/http-request';

import Rating from '../components/Rating';

function ProductScreen() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${environment.getProductByIdUrl}/${productId}`;
      const { data } = await get(url);
      console.log(data);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);
  return (
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
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  disabled={product.countInStock === 0}
                  type='button'
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;

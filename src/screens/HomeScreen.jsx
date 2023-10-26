import { Row, Col } from 'react-bootstrap';

import { useGetProductsQuery } from '../slices/products.api.slice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeScreen() {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const { data: products } = data || {};
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
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={product._id}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;

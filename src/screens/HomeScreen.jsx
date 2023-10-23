import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

import { useGetProductsQuery } from '../slices/products.slice';
import Loader from '../components/Loader';

function HomeScreen() {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const { data: products } = data || {};
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h1>{error?.data?.message || error?.error || 'Error'}</h1>
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

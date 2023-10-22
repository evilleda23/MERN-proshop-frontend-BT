import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

import { get } from '../utils/http-request';
import { BASE_URL, PRODUCTS_URL } from '../environments/environment';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = BASE_URL + PRODUCTS_URL;
    const fetchProducts = async () => {
      const { data } = await get(url);
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
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
  );
}

export default HomeScreen;

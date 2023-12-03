import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '../../slices/products.api.slice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const {
    data: { data: products } = {},
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const createProductHandler = async () => {
    try {
      //TODO: create a new screen to create a product
      await createProduct({
        name: 'Sample name',
        price: 0,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        description: 'Sample description',
      });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error, {
        position: 'bottom-right',
      });
    }
  };
  const deleteHandler = (id) => {};
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button
            className='btn-sm  m-3'
            onClick={() => createProductHandler()}
          >
            <FaPlus className='pb-1 me-2' />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product?.name}</td>
                <td>${product?.price}</td>
                <td>{product?.category}</td>
                <td>{product?.brand}</td>
                <td className='d-flex justify-content-around'>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button
                      variant='light'
                      className='btn-sm'
                    >
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash className='text-light' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;

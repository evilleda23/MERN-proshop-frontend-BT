import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/products.api.slice';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: { data: product } = {},
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        id: productId,
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated successfully', {
        position: 'bottom-right',
      });
      refetch();
      navigate('/admin/productlist');
    } catch (error) {
      toast.error(error?.data?.message || error?.error, {
        position: 'bottom-right',
      });
    }
  };

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const { data: { image } = {}, message } = await uploadProductImage(
        formData
      ).unwrap();
      toast.success(message);
      setImage(image);
    } catch (err) {
      toast.error(error?.data?.message || error?.error, {
        position: 'bottom-right',
      });
    }
  };
  return (
    <>
      <Link
        className='btn btn-light my-3'
        to='/admin/productlist'
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId='name'
              className='my-1'
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId='price'
              className='my-1'
            >
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0}
                step={0.01}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId='image'
              className='my-1'
            >
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className='my-1'
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
                className='my-1'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group
              controlId='brand'
              className='my-1'
            >
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId='category'
              className='my-1'
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId='inStock'
              className='my-1'
            >
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                min={0}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId='description'
              className='my-1'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as={'textarea'}
                rows={5}
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              className='my-1'
              disabled={isLoading}
            >
              Update
            </Button>
            {isLoading && <Loader />}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

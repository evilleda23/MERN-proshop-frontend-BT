import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

import { useLoginMutation } from '../slices/users.api.slice';
import { setCredentials } from '../slices/auth.slice';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, message } = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...data }));

      toast.success(message);

      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <Card className='py-5 '>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group
            controlId='email'
            className='my-3'
          >
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-3'
            disabled={isLoading}
          >
            Sign In
          </Button>
          {isLoading && <Loader />}
        </Form>
        <Row className='py-3'>
          <Col>
            New to our site?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : `/register`}
            >
              Register now!
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Card>
  );
};

export default LoginScreen;

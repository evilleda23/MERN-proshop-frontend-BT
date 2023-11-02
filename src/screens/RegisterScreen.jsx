import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

import { useRegisterMutation } from '../slices/users.api.slice';
import { setCredentials } from '../slices/auth.slice';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      toast.warning('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }

    try {
      const { data, message } = await register({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();

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
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group
            controlId='name'
            className='my-3'
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-3'
            disabled={isLoading}
          >
            Register
          </Button>
          {isLoading && <Loader />}
        </Form>
        <Row className='py-3'>
          <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
              Login here!
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Card>
  );
};

export default RegisterScreen;

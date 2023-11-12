import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { useProfileMutation } from '../slices/users.api.slice';
import { setCredentials } from '../slices/auth.slice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile, error, data }] =
    useProfileMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const { data } = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(data));
        toast.success('Profile Updated Successfully', {
          position: 'bottom-right',
        });
      } catch (error) {
        toast.error(error?.data?.message || error?.error, {
          position: 'bottom-right',
        });
      }
    }
  };
  return (
    <Row>
      <Col md={4}>
        <Form onSubmit={submitHandler}>
          <Form.Group
            controlId='name'
            className='my-2'
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            controlId='email'
            className='my-2'
          >
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId='password'
            className='my-2'
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId='confirmPassword'
            className='my-2'
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='passowrd'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
            <Button
              type='submit'
              variant='primary'
              className='my-2 '
            >
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form.Group>
        </Form>
      </Col>
      <Col md={8}>Column</Col>
    </Row>
  );
};

export default ProfileScreen;

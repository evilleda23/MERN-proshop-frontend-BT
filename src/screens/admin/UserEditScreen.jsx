import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/users.api.slice';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const {
    data: { data: user } = {},
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setAdmin(user.isAdmin);
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log({
        id: userId,
        name,
        email,
        isAdmin,
      });
      await updateUser({
        id: userId,
        name,
        email,
        isAdmin,
      });
      toast.success('User updated successfully', {
        position: 'bottom-right',
      });
      refetch();
      navigate('/admin/userlist');
    } catch (error) {
      toast.error(error?.data?.message || error?.error, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <Link
        className='btn btn-light my-3'
        to='/admin/userlist'
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
              controlId='email'
              className='my-1'
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId='isAdmin'
              className='my-1'
            >
              <Form.Label>Admin</Form.Label>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;

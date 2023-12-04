import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, FormCheck } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/users.api.slice';

const UserListScreen = () => {
  const {
    data: { data: users } = {},
    isLoading,
    error,
    refetch,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully', {
          position: 'bottom-right',
        });
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error, {
          position: 'bottom-right',
        });
      }
    }
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user?.name}</td>
                <td>
                  <a
                    href={`mailto:${user?.email}`}
                    className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
                  >
                    {user?.email}
                  </a>
                </td>
                <td>
                  <FormCheck>
                    <FormCheck.Input
                      type='checkbox'
                      checked={user?.isAdmin}
                      disabled
                    />
                  </FormCheck>
                </td>
                <td className='d-flex justify-content-around'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
                    onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;

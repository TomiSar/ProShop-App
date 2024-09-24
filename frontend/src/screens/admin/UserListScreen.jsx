import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete user?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table className='table-sm' striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Button
                    className='btn-sm'
                    variant='light'
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
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

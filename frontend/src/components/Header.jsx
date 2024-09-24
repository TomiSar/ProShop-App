import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import SearchBox from './SearchBox';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      //Clear items after logout
      dispatch(clearCartItems());
      dispatch(logout());
      navigate('/');
      toast.success('User Logout', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='proshop' />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <Nav.Link as={Link} to='/cart'>
                <FaShoppingCart style={{ marginRight: '4px' }} />
                Cart
                {cartItems.length > 0 && (
                  <Badge style={{ marginLeft: '5px' }} pill bg='success'>
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser style={{ marginRight: '4px' }} />
                  Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

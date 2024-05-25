import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form className='d-flex' onSubmit={submitHandler}>
      <Form.Control
        className='mr-sm-2 ml-sm-5'
        type='text'
        name='q'
        value={keyword}
        placeholder='Search products...'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button className='p-2 mx-2' variant='outline-light' type='submit'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

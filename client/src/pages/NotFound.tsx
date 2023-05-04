import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>404 Not Found</h1>
      <Button onClick={() => navigate('/')} type='primary'>
        Go Home
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export default NotFound;

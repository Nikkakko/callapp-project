import { useEffect } from 'react';
import userStore from '../store';
import styled from 'styled-components';
import { Userstable } from '../components';

const Home = () => {
  const { fetchUsers } = userStore(state => state);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Userstable />
    </Container>
  );
};

const Container = styled.div``;

export default Home;

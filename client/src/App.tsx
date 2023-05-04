import { useEffect } from 'react';
import userStore from './store';
import styled from 'styled-components';
import { Header, Userstable } from './components';

const App = () => {
  const { fetchUsers, users } = userStore(state => state);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, users.length]);

  return (
    <Container>
      <Header />
      <Userstable />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export default App;

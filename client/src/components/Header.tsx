import styled from 'styled-components';
import CallAppLogo from '../assets/callapp-logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo
        src={CallAppLogo}
        alt='CallApp Logo'
        onClick={() => navigate('/')}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 20px;
  background-color: #f5f5f5;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

export default Header;

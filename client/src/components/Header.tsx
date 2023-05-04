import styled from 'styled-components';
import CallAppLogo from '../assets/callapp-logo.png';

const Header = () => {
  return (
    <Container>
      <Logo src={CallAppLogo} alt='CallApp Logo' />
      <Title>CallApp Challenge Project</Title>
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
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;

export default Header;

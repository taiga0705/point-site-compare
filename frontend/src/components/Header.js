import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #4a6da7;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  
  a {
    color: white;
    text-decoration: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #4a6da7;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    z-index: 10;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    margin: 0;
    padding: 1rem;
    text-align: center;
    
    &:hover {
      background-color: #3a5d97;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link to="/">ポイントサイト比較</Link>
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          ☰
        </MobileMenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavItem>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>ホーム</Link>
          </NavItem>
          <NavItem>
            <Link to="/settings" onClick={() => setIsMenuOpen(false)}>設定</Link>
          </NavItem>
          <NavItem>
            <Link to="/ranking" onClick={() => setIsMenuOpen(false)}>ランキング</Link>
          </NavItem>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

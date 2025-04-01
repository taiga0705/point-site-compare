import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ddd;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} ポイントサイト比較 | どこがお得？ All Rights Reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

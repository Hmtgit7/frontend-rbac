import React from "react";
import styled from "styled-components";
import { useTheme } from "../../Context/ThemeContext";

// Footer container 
const FooterContainer = styled.footer`
  padding: 1rem;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-top: 1px solid ${(props) => (props.$isDarkMode ? "#555" : "#ddd")};
  position: relative;
  text-align: center;
  font-size: calc(0.8rem + 0.3vw);


  @media (max-width: 768px) {
    font-size: 1rem;
    flex-direction: column;
    text-align: center;
  }
`;

// Heart icon styling
const HeartIcon = styled.span`
  color: #ffd700;
  margin:0 0.5rem;
  padding: 0.5rem 0; 
`;


const TextContainer = styled.div`
  display: flex;
  flex-direction: row;  
  align-items: center;
  justify-content: center;


  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <FooterContainer $isDarkMode={isDarkMode}>
      <TextContainer>
        <div>Copyright with </div>
        <HeartIcon>  ❤️ </HeartIcon>
        <div>by Team VRV</div>
      </TextContainer>
    </FooterContainer>
  );
}

export default Footer;

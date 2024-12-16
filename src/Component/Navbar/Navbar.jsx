import React, { useState } from "react";
import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../../Context/ThemeContext";
import SignInPage from "../../Pages/Singin.jsx/SignInPage";
import SignUpPage from "../../Pages/SignUpPage.jsx/SignUpPage";

// Styled Components
const NavbarContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isDarkMode",
})`
  display: flex;
  height: 7vh;
  width: auto;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: bold;
  font-family: Calibri;
  color: #2e86c1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 19px;
  color: inherit;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: inherit;
`;

const AuthButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
  background-color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Line = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 7vh;
  right: 0;
  width: 100%;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  padding: 1rem;
  gap: 10px;

  @media (max-width: 768px) {
    position: absolute;
    top: 7vh;
    right: 0;
    width: 100%;
    background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 10px;
  }
`;

function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [showMenu, setShowMenu] = useState(false);

    const [showSignInPage, setShowSignInPage] = useState(false);
    const [showSignUpPage, setShowSignUpPage] = useState(false);

    // Functions to open/close Pages
    const openSignInPage = () => setShowSignInPage(true);
    const closeSignInPage = () => setShowSignInPage(false);

    const openSignUpPage = () => setShowSignUpPage(true);
    const closeSignUpPage = () => setShowSignUpPage(false);

    // Toggle the mobile menu
    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <>
            {/* Navbar Component */}
            <NavbarContainer $isDarkMode={isDarkMode}>
                <Heading>VRV Security</Heading>
                <ButtonContainer>
                    {/* Toggle Mode */}
                    <ToggleButton
                        $isDarkMode={isDarkMode}
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                    </ToggleButton>

                    {/* Notification Button */}
                    <IconButton $isDarkMode={isDarkMode} aria-label="Notifications">
                        <FaRegBell />
                    </IconButton>

                    {/* Auth Buttons */}
                    <AuthButton $isDarkMode={isDarkMode} onClick={openSignInPage}>
                        SignIn
                    </AuthButton>
                    <AuthButton $isDarkMode={isDarkMode} onClick={openSignUpPage}>
                        SignUp
                    </AuthButton>
                </ButtonContainer>

                {/* Hamburger Icon */}
                <HamburgerMenu onClick={toggleMenu}>
                    <Line $isDarkMode={isDarkMode} />
                    <Line $isDarkMode={isDarkMode} />
                    <Line $isDarkMode={isDarkMode} />
                </HamburgerMenu>
            </NavbarContainer>

            {/* Mobile Menu */}
            <MobileMenu $isDarkMode={isDarkMode} show={showMenu}>
                <ToggleButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
                    {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                </ToggleButton>
                <IconButton aria-label="Notifications">
                    <FaRegBell />
                </IconButton>
                <AuthButton $isDarkMode={isDarkMode} onClick={openSignInPage}>
                    SignIn
                </AuthButton>
                <AuthButton $isDarkMode={isDarkMode} onClick={openSignUpPage}>
                    SignUp
                </AuthButton>
            </MobileMenu>
            {/* Authentication Page */}
            {/* Pages */}
            <SignInPage show={showSignInPage} closeSignInPage={closeSignInPage} />
            <SignUpPage show={showSignUpPage} closeSignUpPage={closeSignUpPage} />

        </>
    );
}

export default Navbar;

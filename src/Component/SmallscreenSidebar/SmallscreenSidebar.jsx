import React, { useState } from "react";
import styled from "styled-components";
import { FaUsers, FaUserCog, FaUserLock } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useTheme } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

// Styled Components for small screen sidebar
const SidebarContainer = styled.div`
  height: 100vh;
  background-color: ${(props) => (props.$isDarkMode ? "#2d2d2d" : "#f4f4f4")};
  display: ${(props) => (props.isSidebarOpen ? "flex" : "none")};
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  z-index: 999;
  padding: 20px;
  transform: translateX(0);
`;

const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 20px;
`;

const MenuItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  }

  & svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
`;

const HamburgerIcon = styled.div`
  display: block;
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  padding: 20px;
  margin-top: 10px;

  @media (min-width: 769px) {
    display: none; /* Hide on large screens */
  }
`;

const SidebarOverlay = styled.div`
  display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function SmallscreenSidebar() {
    const { isDarkMode } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <HamburgerIcon $isDarkMode={isDarkMode} onClick={toggleSidebar}>
                &#9776;
            </HamburgerIcon>

            <SidebarOverlay isSidebarOpen={isSidebarOpen} onClick={toggleSidebar} />

            <SidebarContainer $isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen}>
                <Menu>
                    <MenuItem $isDarkMode={isDarkMode}>
                        <StyledLink to="/">
                            <MdDashboard />
                            Dashboard
                        </StyledLink>
                    </MenuItem>
                    <MenuItem $isDarkMode={isDarkMode}>
                        <StyledLink to="/manageuser">
                            <FaUsers />
                            Users
                        </StyledLink>
                    </MenuItem>
                    <MenuItem $isDarkMode={isDarkMode}>
                        <StyledLink to="/managerole">
                            <FaUserCog />
                            Roles
                        </StyledLink>
                    </MenuItem>
                    <MenuItem $isDarkMode={isDarkMode}>
                        <StyledLink to="/managepermission">
                            <FaUserLock />
                            Permissions
                        </StyledLink>
                    </MenuItem>
                </Menu>
            </SidebarContainer>
        </>
    );
}

export default SmallscreenSidebar;

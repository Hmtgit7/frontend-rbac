import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

//Importing ThemeContext
import { useTheme } from "../../Context/ThemeContext";

//Importing components
import Sidebar from "../../Component/Sidebar/Sidebar";
import AddRoleModal from "../ManagerRoles/AddRole";
import SmallscreenSidebar from "../../Component/SmallscreenSidebar/SmallscreenSidebar";
// Importing images for user avatars
import img1 from "../../assets/Avatar1.png";
import img2 from "../../assets/Avatar2.png";
import img3 from "../../assets/Avatar3.png";
import img4 from "../../assets/Avatar4.png";
import img5 from "../../assets/Avatar5.png";
import img6 from "../../assets/Avatar6.png";
import img7 from "../../assets/Avatar7.jpg";
import img8 from "../../assets/Avatar8.png";
import img9 from "../../assets/Avatar9.png";
import img10 from "../../assets/Avatar10.png";

// Styled Components
const ManageRolesContainer = styled.div`
  display: flex;
  height: 80vh;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContainer = styled.div`
  width: 14vw;
  height: 100%;
`;

const MainContent = styled.div`
  width: 86vw;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  font-family: "Arial", sans-serif;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Separator = styled.hr`
  border: none;
  height: 2px;
  background-color: #808b96;
  margin-bottom: 1.5rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SectionHeading = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${(props) => (props.$isDarkMode ? "#fff" : "#ddd")};
  border-radius: 5px;
  background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
    font-size: 16px;
    margin-left: 10px;
    flex: 1;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHead = styled.thead`
  background-color: #2e86c1;
  color: #fff;

  th {
    padding: 12px 10px;
    text-align: left;
    font-size: 16px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#f9f9f9")};
  }

  td {
    padding: 10px 10px;
    color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const AvatarUsernameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  margin-top: 2px;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;
const DeleteIcon = styled(MdOutlineDelete)`
  font-size: 17px;
`;
const ActionIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 14px;
`;

const AddNewRoleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    padding: 1px;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  background-color: #2e86c1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #1e6e99;
  }
`;

// Styled components specific to small screens

const SmallScreenContainer = styled.div`
  @media (max-width: 768px) {
    min-height: 77.5vh;
    display: block;
    padding: 20px;
    color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
    background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  }
  display: none;
`;

const Container = styled.div`
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom:0;
  }
`;

const UserCard = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const UserMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 5px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const SmallScreenCardContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    gap: 20px;
  }
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const CardUsername = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const CardEmail = styled.p`
  font-size: 14px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const CardLowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${(props) => (props.className === "active" ? "#28a745" : "#dc3545")};
`;

const ManageRoles = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "Akash Jain",
            email: "akash.jain@gmail.com",
            role: "Admin",
            permission: "Read, Write, Delete",
            createdDate: "2023-11-12",
            status: "Inactive",
            imageUrl: img1,
          },
          {
            id: 2,
            username: "Tanvi Bhatt",
            email: "tanvibhatt@gmail.com",
            role: "Manager",
            permission: "Read, Write",
            createdDate: "2023-12-22",
            status: "Active",
            imageUrl: img2,
          },
          {
            id: 3,
            username: "Pranav Singh",
            email: "pranav.singh@gmail.com",
            role: "User",
            permission: "Read",
            createdDate: "2024-01-15",
            status: "Active",
            imageUrl: img3,
          },
          {
            id: 4,
            username: "Ritika Sinha",
            email: "ritikasinha@gmail.com",
            role: "Moderator",
            permission: "Read, Delete",
            createdDate: "2024-02-07",
            status: "Inactive",
            imageUrl: img4,
          },
          {
            id: 5,
            username: "Kunal Kapoor",
            email: "kunal.kapoor@gmail.com",
            role: "Admin",
            permission: "Read, Write, Delete",
            createdDate: "2024-03-02",
            status: "Active",
            imageUrl: img5,
          },
          {
            id: 6,
            username: "Naina Joshi",
            email: "nainajoshi@gmail.com",
            role: "User",
            permission: "Read",
            createdDate: "2024-04-09",
            status: "Inactive",
            imageUrl: img6,
          },
          {
            id: 7,
            username: "Varun Mehta",
            email: "varunmehta@gmail.com",
            role: "Manager",
            permission: "Read, Write",
            createdDate: "2024-05-18",
            status: "Active",
            imageUrl: img7,
          },
          {
            id: 8,
            username: "Ira Sharma",
            email: "ira.sharma@gmail.com",
            role: "Moderator",
            permission: "Read, Delete",
            createdDate: "2024-06-25",
            status: "Active",
            imageUrl: img8,
          },
          {
            id: 9,
            username: "Ayaan Khan",
            email: "ayaan.khan@gmail.com",
            role: "User",
            permission: "Read",
            createdDate: "2024-07-15",
            status: "Inactive",
            imageUrl: img9,
          },
          {
            id: 10,
            username: "Pooja Verma",
            email: "pooja.verma@gmail.com",
            role: "Admin",
            permission: "Read, Write, Delete",
            createdDate: "2024-08-01",
            status: "Active",
            imageUrl: img10,
          },
    ]);

    const [roles, setRoles] = useState([
        { id: 1, roleName: "Admin" },
        { id: 2, roleName: "User" },
        { id: 3, roleName: "Moderator" },
    ]);

    const [modalState, setModalState] = useState({
        isOpen: false,
        isEditMode: false,
        userToEdit: null,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredUsers = useMemo(
        () =>
            users.filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery, users]
    );

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRoleChange = (userId, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const handleAddRole = (newRole) => {
        setRoles((prevRoles) => [...prevRoles, newRole]);
        setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
    };

    const handleDeleteUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    return (
        <>
            <ManageRolesContainer>
                <SidebarContainer>
                    <Sidebar />
                </SidebarContainer>
                <MainContent $isDarkMode={isDarkMode}>
                    <Header>Manage Roles</Header>
                    <Separator />
                    <TopBar>
                        <SectionHeading>Users & Roles List</SectionHeading>
                        <TopBarRight>
                            <SearchContainer $isDarkMode={isDarkMode}>
                                <IoSearchOutline />
                                <input
                                    type="text"
                                    placeholder="Search User..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </SearchContainer>
                            <button
                                onClick={() =>
                                    setModalState({ isOpen: true, isEditMode: false })
                                }
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    padding: "6px 12px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                <AddNewRoleWrapper>
                                    <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                                    Add New Role
                                </AddNewRoleWrapper>
                            </button>
                        </TopBarRight>
                    </TopBar>

                    {filteredUsers.length === 0 && searchQuery !== "" ? (
                        <ErrorMessage>No users found matching "{searchQuery}"</ErrorMessage>
                    ) : (
                        <TableContainer $isDarkMode={isDarkMode}>
                            <Table>
                                <TableHead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </TableHead>
                                <TableBody $isDarkMode={isDarkMode}>
                                    {currentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>
                                                <AvatarUsernameWrapper>
                                                    <Avatar src={user.imageUrl} alt="avatar" />
                                                    {user.username}
                                                </AvatarUsernameWrapper>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <select
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        handleRoleChange(user.id, e.target.value)
                                                    }
                                                >
                                                    {roles.map((role) => (
                                                        <option key={role.id} value={role.roleName}>
                                                            {role.roleName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                                                    <ActionIcon>
                                                        {" "}
                                                        <DeleteIcon /> Delete
                                                    </ActionIcon>
                                                </DeleteButton>
                                            </td>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    <PaginationWrapper>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageButton
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PageButton>
                        ))}
                    </PaginationWrapper>

                    {modalState.isOpen && !modalState.isEditMode && (
                        <AddRoleModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSave={handleAddRole}
                        />
                    )}
                </MainContent>
            </ManageRolesContainer>

            {/* SmallScreen Layout */}

            <SmallScreenContainer $isDarkMode={isDarkMode}>
                <SmallScreenCardContainer $isDarkMode={isDarkMode}>
                    <Container $isDarkMode={isDarkMode}>
                        <h1>Manage Roles</h1>
                        <SmallscreenSidebar />
                    </Container>

                    <SectionHeading $isDarkMode={isDarkMode}>User List</SectionHeading>
                    <SearchContainer $isDarkMode={isDarkMode}>
                        <IoSearchOutline />
                        <input
                            type="text"
                            placeholder="Search User..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchContainer>
                    <button
                        onClick={() => setModalState({ isOpen: true, isEditMode: false })}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginBottom: "1rem",
                        }}
                    >
                        <AddNewRoleWrapper>
                            <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                            Add New Role
                        </AddNewRoleWrapper>
                    </button>
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} $isDarkMode={isDarkMode}>
                            <UserMeta $isDarkMode={isDarkMode}>
                                <UserAvatar src={user.imageUrl} />
                                <MetaData>
                                    <CardUsername $isDarkMode={isDarkMode}>
                                        {user.username}
                                    </CardUsername>
                                    <CardEmail $isDarkMode={isDarkMode}>{user.email}</CardEmail>
                                </MetaData>
                            </UserMeta>
                            <CardContent>
                                <CardLowerWrap>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.roleName}>
                                                {role.roleName}
                                            </option>
                                        ))}
                                    </select>

                                    <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                                        <ActionIcon>
                                            <DeleteIcon />
                                            Delete
                                        </ActionIcon>
                                    </DeleteButton>
                                </CardLowerWrap>
                            </CardContent>
                        </UserCard>
                    ))}
                    <PaginationWrapper>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageButton
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PageButton>
                        ))}
                    </PaginationWrapper>

                    {modalState.isOpen && !modalState.isEditMode && (
                        <AddRoleModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSave={handleAddRole}
                        />
                    )}
                </SmallScreenCardContainer>
            </SmallScreenContainer>
        </>
    );
};

export default ManageRoles;

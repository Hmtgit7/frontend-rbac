import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiToggleLine, RiToggleFill } from "react-icons/ri";

//Importing ThemeContext
import { useTheme } from "../../Context/ThemeContext";

// Importing components
import AddUserModal from "../ManageUsers/AddUser";
import EditUserModal from "../ManageUsers/EditUser";
import Sidebar from "../../Component/Sidebar/Sidebar";
import SmallscreenSidebar from "../../Component/SmallscreenSidebar/SmallscreenSidebar";

// Importing images
import img1 from "../../assets/Avatar1.png";
import img2 from "../../assets/Avatar2.png";
import img3 from "../../assets/Avatar3.png";
import img4 from "../../assets/Avatar4.png";
import defaultImg from "../../assets/default.jpg";

// Styled Components
const ManageUsersContainer = styled.div`
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

const ActionButton = styled.button`
  background-color: #f0ad4e;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2px;
  margin-right: 10px;
  &:hover {
    background-color: #e68a00;
  }
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

const ActionIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 14px;
`;

const EditIcon = styled(FaRegEdit)`
  font-size: 15px;
`;

const DeleteIcon = styled(MdOutlineDelete)`
  font-size: 16px;
`;

const AddIcon = styled(IoMdAdd)`
  font-size: 16px;
  margin-right: 6px;
`;

const AddNewUserWrapper = styled.div`
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

const StatusToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  gap: 10px;
  ${(props) =>
        props.status &&
        `
    color: ${props.status === "Active" ? "#28a745" : "#dc3545"};
  `}
`;

const ActiveIconContainer = styled.div`
  font-size: 20px;
  color: #28a745;
`;

const InactiveIconContainer = styled.div`
  font-size: 20px;
  color: #dc3545;
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

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
`;

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

// Styled components specific to small screens

const SmallScreenCardContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    gap: 20px;
  }
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

const Status = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${(props) =>
        props.className === "active" ? "#28a745" : "#dc3545"};
  color: #fff;
`;

const ManageUsers = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "Aarav Sharma",
            email: "aravsharma@example.com",
            imageUrl: img1,
            status: "Active",
        },
        {
            id: 2,
            username: "Diya Verma",
            email: "diyaverma@example.com",
            imageUrl: img2,
            status: "Inactive",
        },
        {
            id: 3,
            username: "Ishaan Kumar",
            email: "ishaankumar@example.com",
            imageUrl: img3,
            status: "Active",
        },
        {
            id: 4,
            username: "Rohan Patel",
            email: "rohanpatel@example.com",
            imageUrl: img4,
            status: "Inactive",
        },
        {
            id: 5,
            username: "Aarav Sharma",
            email: "aravsharma@example.com",
            imageUrl: img1,
            status: "Active",
        },
        {
            id: 6,
            username: "Diya Verma",
            email: "diyaverma@example.com",
            imageUrl: img2,
            status: "Inactive",
        },
        {
            id: 7,
            username: "Ishaan Kumar",
            email: "ishaankumar@example.com",
            imageUrl: img3,
            status: "Active",
        },
        {
            id: 8,
            username: "Rohan Patel",
            email: "rohanpatel@example.com",
            imageUrl: img4,
            status: "Inactive",
        },
    ]);
    const [modalState, setModalState] = useState({
        isOpen: false,
        isEditMode: false,
        userToEdit: null,
    });

    // Filter users based on search query
    const filteredUsers = useMemo(
        () =>
            users.filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery, users]
    );

    // Add a new user
    const handleAddUser = (newUser) => {
        const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const userWithDefaultImage = {
            ...newUser,
            id: newUserId,
            imageUrl: defaultImg,
            status: "Active",
        };
        setUsers((prevUsers) => [...prevUsers, userWithDefaultImage]);
        setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
    };

    // Toggle user status
    const handleToggleStatus = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === "Active" ? "Inactive" : "Active",
                    }
                    : user
            )
        );
    };

    // Edit an existing user
    const handleEditUser = (user) => {
        setModalState({ isOpen: true, isEditMode: true, userToEdit: user });
    };

    // Update an existing user
    const handleUpdateUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
    };

    // Delete a user with confirmation
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const startId = (currentPage - 1) * usersPerPage + 1;
    const endId = currentPage * usersPerPage;

    // Filter users based on the calculated ID range
    const currentUsers = filteredUsers.filter(
        (user) => user.id >= startId && user.id <= endId
    );

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ManageUsersContainer>
                <SidebarContainer>
                    <Sidebar />
                </SidebarContainer>
                <MainContent $isDarkMode={isDarkMode}>
                    <Header>Manage Users</Header>
                    <Separator />
                    <TopBar>
                        <SectionHeading>User List</SectionHeading>
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
                                <AddNewUserWrapper>
                                    <AddIcon />
                                    Add New User
                                </AddNewUserWrapper>
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
                                        <th>Status</th>
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
                                                <StatusToggleButton
                                                    $status={user.status}
                                                    onClick={() => handleToggleStatus(user.id)}
                                                >
                                                    {user.status === "Active" ? (
                                                        <>
                                                            <ActiveIconContainer>
                                                                <RiToggleFill />
                                                            </ActiveIconContainer>
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <InactiveIconContainer>
                                                                <RiToggleLine />
                                                            </InactiveIconContainer>
                                                            Inactive
                                                        </>
                                                    )}
                                                </StatusToggleButton>
                                            </td>
                                            <td>
                                                <ActionButton onClick={() => handleEditUser(user)}>
                                                    <ActionIcon>
                                                        <EditIcon />
                                                        Edit
                                                    </ActionIcon>
                                                </ActionButton>
                                                <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                                                    <ActionIcon>
                                                        <DeleteIcon />
                                                        Delete
                                                    </ActionIcon>
                                                </DeleteButton>
                                            </td>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* Pagination Section */}
                    <PaginationWrapper>
                        {Array.from(
                            { length: Math.ceil(filteredUsers.length / usersPerPage) },
                            (_, index) => (
                                <PageButton
                                    key={index + 1}
                                    onClick={() => handlePageClick(index + 1)}
                                    style={{
                                        backgroundColor:
                                            currentPage === index + 1 ? "#1e6e99" : "#2e86c1",
                                    }}
                                >
                                    {index + 1}
                                </PageButton>
                            )
                        )}
                    </PaginationWrapper>

                    {/* Modals */}
                    {modalState.isEditMode ? (
                        <EditUserModal
                            isOpen={modalState.isOpen}
                            onClose={() =>
                                setModalState({
                                    isOpen: false,
                                    isEditMode: false,
                                    userToEdit: null,
                                })
                            }
                            userData={modalState.userToEdit}
                            onSave={handleUpdateUser}
                        />
                    ) : (
                        <AddUserModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ isOpen: false })}
                            onSave={handleAddUser}
                        />
                    )}
                </MainContent>
            </ManageUsersContainer>

            {/* Small Screen Layout(users in the form of cards) */}

            <SmallScreenContainer $isDarkMode={isDarkMode}>
                <SmallScreenCardContainer $isDarkMode={isDarkMode}>
                    <Container $isDarkMode={isDarkMode}>
                        <h1>Manage Users</h1>
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
                        <AddNewUserWrapper>
                            <AddIcon />
                            Add New User
                        </AddNewUserWrapper>
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
                                    <Status
                                        className={user.status === "Active" ? "active" : "inactive"}
                                    >
                                        {user.status}
                                    </Status>

                                    <div>
                                        <ActionButton onClick={() => handleEditUser(user)}>
                                            <ActionIcon>
                                                <EditIcon />
                                                Edit
                                            </ActionIcon>
                                        </ActionButton>
                                        <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                                            <ActionIcon>
                                                <DeleteIcon />
                                                Delete
                                            </ActionIcon>
                                        </DeleteButton>
                                    </div>
                                </CardLowerWrap>
                            </CardContent>
                        </UserCard>
                    ))}
                    {/* Pagination Section */}
                    <PaginationWrapper>
                        {Array.from(
                            { length: Math.ceil(filteredUsers.length / usersPerPage) },
                            (_, index) => (
                                <PageButton
                                    key={index + 1}
                                    onClick={() => handlePageClick(index + 1)}
                                    style={{
                                        backgroundColor:
                                            currentPage === index + 1 ? "#1e6e99" : "#2e86c1",
                                    }}
                                >
                                    {index + 1}
                                </PageButton>
                            )
                        )}
                    </PaginationWrapper>
                    {/* Modals */}
                    {modalState.isEditMode ? (
                        <EditUserModal
                            isOpen={modalState.isOpen}
                            onClose={() =>
                                setModalState({
                                    isOpen: false,
                                    isEditMode: false,
                                    userToEdit: null,
                                })
                            }
                            userData={modalState.userToEdit}
                            onSave={handleUpdateUser}
                        />
                    ) : (
                        <AddUserModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ isOpen: false })}
                            onSave={handleAddUser}
                        />
                    )}
                </SmallScreenCardContainer>
            </SmallScreenContainer>
        </>
    );
};

export default ManageUsers;

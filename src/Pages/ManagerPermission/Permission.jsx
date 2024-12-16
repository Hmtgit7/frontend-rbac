import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useTheme } from "../../Context/ThemeContext";

import AddPermissionModal from "../ManagerPermission/AddPermission";
import Sidebar from "../../Component/Sidebar/Sidebar";
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
const ManagePermissionsContainer = styled.div`
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

const DeleteIcon = styled(MdOutlineDelete)`
  font-size: 17px;
`;

const AddNewPermissionWrapper = styled.div`
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
const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.$isCurrent ? "#2e86c1" : props.$isDarkMode ? "#555" : "#ddd"};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#777" : "#bbb")};
  }
`;

// Styled components specific to small screens

const SmallScreenContainer = styled.div`
  @media (max-width: 768px) {
    min-height: 77.5vh;
    height: auto;
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

const CardRole = styled.p`
  margin-top: 0;
  font-size: 15px;
  color: ${(props) => (props.$isDarkMode ? "#f2f3f4 " : "#555")};
`;

const CardLowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Permission = () => {
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

  const [permissions, setPermissions] = useState([
    { id: 1, permission: "Read" },
    { id: 2, permission: "Write" },
    { id: 3, permission: "Delete" },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditMode: false,
    permissionToEdit: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, users]
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredUsers]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePermissionChange = (userId, permission, checked) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: checked
                ? [...(user.permissions || []), permission]
                : (user.permissions || []).filter((p) => p !== permission),
            }
          : user
      )
    );
  };

  const handleAddPermission = (newPermission) => {
    setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
    setModalState({ isOpen: false });
  };
  const handleDeletePermission = (userId, permission) => {
    if (
      window.confirm(
        `Are you sure you want to remove the permission "${permission}"?`
      )
    ) {
      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                permissions: (user.permissions || []).filter(
                  (perm) => perm !== permission
                ),
              }
            : user
        );
      });
      // Ensure the `permissions` state is updated as well if necessary
      setPermissions((prevPermissions) =>
        prevPermissions.filter((perm) => perm.permission !== permission)
      );
    }
  };

  return (
    <>
      <ManagePermissionsContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <MainContent $isDarkMode={isDarkMode}>
          <Header>Manage Permissions</Header>
          <Separator />
          <TopBar>
            <SectionHeading>Users & Permissions List</SectionHeading>
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
                onClick={() => setModalState({ isOpen: true })}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <AddNewPermissionWrapper>
                  <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                  Add New Permission
                </AddNewPermissionWrapper>
              </button>
            </TopBarRight>
          </TopBar>

          {paginatedUsers.length === 0 ? (
            <ErrorMessage>No users found</ErrorMessage>
          ) : (
            <TableContainer $isDarkMode={isDarkMode}>
              <Table>
                <TableHead>
                  <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                  </tr>
                </TableHead>
                <TableBody $isDarkMode={isDarkMode}>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <AvatarUsernameWrapper>
                          <Avatar src={user.imageUrl} />
                          <div>{user.username}</div>
                        </AvatarUsernameWrapper>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {permissions.map((perm) => (
                            <label key={perm.id}>
                              <input
                                type="checkbox"
                                checked={
                                  user.permissions?.includes(perm.permission) ||
                                  false
                                }
                                onChange={(e) =>
                                  handlePermissionChange(
                                    user.id,
                                    perm.permission,
                                    e.target.checked
                                  )
                                }
                              />
                              {perm.permission}
                              <button
                                onClick={() =>
                                  handleDeletePermission(
                                    user.id,
                                    perm.permission
                                  )
                                }
                                style={{
                                  backgroundColor: "#dc3545",
                                  color: "white",
                                  padding: "4px 8px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  marginRight: "15px",
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <PaginationControls>
            <PaginationButton
              $isDarkMode={isDarkMode}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationButton
                key={i}
                $isDarkMode={isDarkMode}
                $isCurrent={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
            <PaginationButton
              $isDarkMode={isDarkMode}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </PaginationButton>
          </PaginationControls>

          {modalState.isOpen && (
            <AddPermissionModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ isOpen: false })}
              onSave={handleAddPermission}
            />
          )}
        </MainContent>
      </ManagePermissionsContainer>

      {/* SmallScreen Layout  */}

      <SmallScreenContainer $isDarkMode={isDarkMode}>
        <SmallScreenCardContainer $isDarkMode={isDarkMode}>
          <Container $isDarkMode={isDarkMode}>
            <h1>Manage Permissions</h1>
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
            <AddNewPermissionWrapper>
              <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
              Add New Permission
            </AddNewPermissionWrapper>
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
                  <CardRole $isDarkMode={isDarkMode}>{user.role}</CardRole>
                </MetaData>
              </UserMeta>
              <CardContent>
                <CardLowerWrap>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      color: isDarkMode ? "white" : "black",
                    }}
                  >
                    {permissions.map((perm) => (
                      <label
                        key={perm.id}
                        style={{ flexBasis: "calc(33.33% - 10px)" }}
                      >
                        {" "}
                        {/* Allows 3 items per row */}
                        <input
                          type="checkbox"
                          checked={
                            user.permissions?.includes(perm.permission) || false
                          }
                          onChange={(e) =>
                            handlePermissionChange(
                              user.id,
                              perm.permission,
                              e.target.checked
                            )
                          }
                        />
                        {perm.permission}
                        <button
                          onClick={() =>
                            handleDeletePermission(user.id, perm.permission)
                          }
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            margin: "10px",
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </label>
                    ))}
                  </div>
                </CardLowerWrap>
              </CardContent>
            </UserCard>
          ))}
          <PaginationControls>
            <PaginationButton
              $isDarkMode={isDarkMode}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationButton
                key={i}
                $isDarkMode={isDarkMode}
                $isCurrent={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
            <PaginationButton
              $isDarkMode={isDarkMode}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </PaginationButton>
          </PaginationControls>

          {modalState.isOpen && (
            <AddPermissionModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ isOpen: false })}
              onSave={handleAddPermission}
            />
          )}
        </SmallScreenCardContainer>
      </SmallScreenContainer>
    </>
  );
};

export default Permission;

import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../Context/ThemeContext";

// Styled Components 
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#2b2b2b" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height:500px;
  margin:10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  color: #2e86c1;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 20px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  margin: 4px 2px;
  color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
`;

const InputField = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  width: calc(100% - 40px);
`;

const SelectField = styled.select`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  width: calc(100% - 20px);
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0;
  
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #2e86c1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: calc(100% - 40px); 
  margin: 0 auto;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    background-color: #1e6e99;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  width: calc(100% - 60px);
  margin: auto;
  text-align: center;
  padding: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#f5b7b1")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  font-size: 14px;
`;

function AddUser({ isOpen, onClose, onSave }) {
    const { isDarkMode } = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [permissions, setPermissions] = useState({
        read: false,
        write: false,
        delete: false,
    });
    const [error, setError] = useState("");

    const handlePermissionChange = (e) => {
        const { name, checked } = e.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    // Validation rules
    const validateFields = () => {
        if (!username.trim()) {
            setError("Name cannot be empty.");
            return false;
        }
        if (!/^[A-Za-z\s]+$/.test(username)) {
            setError("Name should contain only letters and spaces.");
            return false;
        }
        if (username.length < 4) {
            setError("Name should consist of 4 or more characters.");
            return false;
        }
        if (!email.trim()) {
            setError("Email cannot be empty.");
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email (e.g., janhvi23@gmail.com).");
            return false;
        }
        if (!role) {
            setError("Please select a role.");
            return false;
        }
        if (!permissions.read && !permissions.write && !permissions.delete) {
            setError("Select at least one permission.");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (validateFields()) {
            const newUser = {
                id: Date.now(),
                username,
                email,
                status: "Active", // Default status
                imageUrl: "path_to_default_avatar", // Default image URL
            };
            onSave(newUser);
            setUsername("");
            setEmail("");
            setRole("");
            setPermissions("false");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <ModalBackground>
            <ModalContainer $isDarkMode={isDarkMode}>
                <CloseButton $isDarkMode={isDarkMode} onClick={onClose}>
                    &times;
                </CloseButton>
                <ModalHeader>Add New User</ModalHeader>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <FormContainer onSubmit={handleAddUser}>
                    <FormField>
                        <Label $isDarkMode={isDarkMode}>Name:</Label>
                        <InputField
                            $isDarkMode={isDarkMode}
                            type="text"
                            placeholder="e.g. Janhvi Pandey"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label $isDarkMode={isDarkMode}>Email:</Label>
                        <InputField
                            $isDarkMode={isDarkMode}
                            type="email"
                            placeholder="e.g. shivipandey993@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label $isDarkMode={isDarkMode}>Role:</Label>
                        <SelectField
                            $isDarkMode={isDarkMode}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="User">User</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </SelectField>
                    </FormField>
                    <FormField>
                        <Label $isDarkMode={isDarkMode}>Permissions:</Label>
                        <CheckboxContainer>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="read"
                                    checked={permissions.read}
                                    onChange={handlePermissionChange}
                                />
                                Read
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="write"
                                    checked={permissions.write}
                                    onChange={handlePermissionChange}
                                />
                                Write
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="delete"
                                    checked={permissions.delete}
                                    onChange={handlePermissionChange}
                                />
                                Delete
                            </CheckboxLabel>
                        </CheckboxContainer>
                    </FormField>
                    <Button type="submit">Add User</Button>
                </FormContainer>
            </ModalContainer>
        </ModalBackground>
    );
}

export default AddUser;

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
  padding: 20px;
  margin: 10px;
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
  width: calc(100% - 30px);
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
function AddRole({ isOpen, onClose, onSave }) {
  const { isDarkMode } = useTheme();
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");

  const validateFields = () => {
    // Check if role name is empty
    if (!roleName.trim()) {
      setError("Role name cannot be empty.");
      return false;
    }

    // Check if role name contains only letters and spaces
    const roleRegex = /^[A-Za-z\s]+$/;
    if (!roleRegex.test(roleName)) {
      setError("Role name can only contain letters and spaces.");
      return false;
    }

    // Check if role name length is at least 4 characters
    if (roleName.length < 4) {
      setError("Role name should consist of 4 or more characters.");
      return false;
    }

    // If all validations pass, clear the error
    setError("");
    return true;
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (validateFields()) {
      const newRole = {
        id: Date.now(),
        roleName,
      };
      onSave(newRole);
      setRoleName("");
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
        <ModalHeader>Add New Role</ModalHeader>
        {error && <ErrorMessage $isDarkMode={isDarkMode}>{error}</ErrorMessage>}
        <FormContainer onSubmit={handleAddRole}>
          <FormField>
            <Label $isDarkMode={isDarkMode}>Role Name:</Label>
            <InputField
              $isDarkMode={isDarkMode}
              type="text"
              placeholder="e.g. Admin, User"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </FormField>
          <Button type="submit">Add Role</Button>
        </FormContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default AddRole;

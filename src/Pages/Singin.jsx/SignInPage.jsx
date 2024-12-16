import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "../../Context/ThemeContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: ${(props) => (props.isDarkMode ? "#2c2c2c" : "#fff")};
  width: 100%;
  max-width: 380px;
  margin: 10px;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "#bbb" : "#aaa")};
  &:hover {
    color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  }
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: ${(props) => (props.error ? "0.25rem" : "1rem")};
  border: 1px solid ${(props) => (props.error ? "red" : props.isDarkMode ? "#555" : "#ccc")};
  background: ${(props) => (props.isDarkMode ? "#444" : "#fff")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.isDarkMode ? "#007bff" : "#0056b3")};
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-align: left;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s;

  ${(props) =>
    props.primary
      ? `
    background-color: #007bff;
    color: #fff;
    &:hover {
      background-color: #0056b3;
    }
  `
      : `
    background-color: ${props.isDarkMode ? "#333" : "#f5f5f5"};
    color: ${props.isDarkMode ? "#fff" : "#000"};
    border: 1px solid ${props.isDarkMode ? "#555" : "#ccc"};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: ${props.isDarkMode ? "#444" : "#eaeaea"};
    }
  `}
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${(props) => (props.isDarkMode ? "#777" : "#aaa")};
`;

const Line = styled.span`
  flex: 1;
  height: 1px;
  background: ${(props) => (props.isDarkMode ? "#555" : "#ddd")};
`;

const OrText = styled.span`
  margin: 0 1rem;
  font-size: 0.9rem;
`;

const SignInPage = ({ show, closeSignInPage }) => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignIn = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      alert("Sign In Successful!");
      // can include backend api
    }
  };

  return (
    <ModalOverlay show={show}>
      <ModalContainer isDarkMode={isDarkMode}>
        <CloseButton onClick={closeSignInPage} isDarkMode={isDarkMode}>
          &times;
        </CloseButton>
        <Heading isDarkMode={isDarkMode}>Sign In</Heading>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isDarkMode={isDarkMode}
          error={emailError}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isDarkMode={isDarkMode}
          error={passwordError}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <Button primary onClick={handleSignIn}>
          Sign In
        </Button>
        <Divider isDarkMode={isDarkMode}>
          <Line isDarkMode={isDarkMode} />
          <OrText>Or sign in with</OrText>
          <Line isDarkMode={isDarkMode} />
        </Divider>
        <Button isDarkMode={isDarkMode}>
          <FcGoogle size={20} style={{ marginRight: "8px" }} />
          Sign in with Google
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SignInPage;

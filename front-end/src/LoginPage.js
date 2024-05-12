import React from 'react';
import styled from 'styled-components';
import highQualityImage from './12.png';

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <Credentials>
        <Logo>Logo</Logo>
        <Subtitle>Login to your account</Subtitle>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <ForgotPassword>Forgot password?</ForgotPassword>
        <SubmitButton>Submit</SubmitButton>
        <Or>OR</Or>
        <SignUpButton>Sign Up</SignUpButton>
      </Credentials>
      <ImageContainer>
        {/* Add your high-quality image here */}
        <img src={highQualityImage} alt="High Quality Graphics" />
      </ImageContainer>
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Credentials = styled.div`
  width: 480px; /* Set width for left side */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 5px;
`;

const ForgotPassword = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Or = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SignUpButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ImageContainer = styled.div`
  width: 1248px; /* Set width for right side */
  height: 100vh; /* Full height of the viewport */
  overflow: hidden;
  position: relative;

  /* Ensure image covers entire container */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Scale image to cover entire container */
    object-position: center; /* Center the image */
  }
`;

export default LoginPage;

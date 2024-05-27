import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #A7D7C5;
`;

const FormWrapper = styled.div`
  background-color: #F6FBF9;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #212B27;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  color: #32403B;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(100% - 24px); /* Adjusted width to accommodate padding */
  padding: 12px; /* Equal padding on top and bottom */
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000000;
  font-size: 16px;

  &::placeholder {
    color: #000000;
    padding-left: 6px; /* Adjusted padding for left side */
    padding-right: 6px; /* Adjusted padding for right side */
    opacity: 0.5; /* Reduced opacity */
    text-indent: -6.4px; /* Move the text slightly to the left */
  }
`;


const Button = styled.button`
  background-color: #A7D7C5;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 10px;

  &:hover {
    background-color: #94C2B3;
  }
`;

const Login = () => {
  return (
    <Container>
      <FormWrapper>
        <Title>Sign In</Title>
        <Paragraph>
          Sign in to continue to our service.
        </Paragraph>
        <form>
          <Input type="email" placeholder="Email Address" />
          <Input type="password" placeholder="Password" />
          <Button>Sign In</Button>
        </form>
        <Link to="/signup">Don't Have An Account? Sign Up</Link>
      </FormWrapper>
    </Container>
  );
};
export default Login;
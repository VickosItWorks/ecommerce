import React, { useState } from "react";
import "./RegisterUser.css";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import requestPost from "./UserAPostHelper";
import { useNavigate } from "react-router-dom";

const Largebutton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #164863;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Regcontainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 100px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
`;

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const registerPost = async (e) => {
    e.preventDefault();
    let payload = {};
    payload.email = email;
    payload.password = pass;
    payload.username = userName;
    const registerData = await requestPost({ pathUrl: "register", payload });
    const { user, accessToken } = registerData;
    if (user && accessToken) {
      navigate("/login");
      toast.success(`User ${user.username} registered successfully!`);
    } else {
      toast.error(registerData);
    }
  };

  return (
    <Regcontainer className="container">
      <h1>Register</h1>
      <form>
        <label name="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label name="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label name="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Largebutton
          className="registerbtn"
          onClick={registerPost}
          type="submit"
        >
          Submit
        </Largebutton>
      </form>
    </Regcontainer>
  );
};

export default RegisterUser;

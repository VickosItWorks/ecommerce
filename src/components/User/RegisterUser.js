import React, { useEffect, useState } from "react";
import "./RegisterUser.css";
import { styled } from "styled-components";
import { toast } from "react-toastify";

const Pgraph = styled.p`
  color: red;
`;

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

  const registerPost = (e) => {
    e.preventDefault();
    let payload = {};
    payload.email = email;
    payload.password = pass;
    payload.username = userName;
    fetch("http://localhost:5500/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { user, accessToken } = data;
        if (user && accessToken) {
          toast.success("algo");
        } else {
          toast.error(data);
        }
      });
  };

  return (
    <Regcontainer className="container">
      <h1>Register</h1>
      <form>
        <label for="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {/* <Pgraph>{userExists}</Pgraph> */}

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

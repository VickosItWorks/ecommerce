import React, { useEffect, useState } from "react";
import "./RegisterUser.css";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import requestPost from "./UserAPostHelper";

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
  margin-bottom: 50px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 100px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
`;

const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const loginPost = async (e) => {
        e.preventDefault();
        let payload = {};
        payload.email = email;
        payload.password = pass;

        const loginData = await requestPost({ pathUrl: 'login', payload });
        const { user, accessToken } = loginData;
        if (user && accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userData', JSON.stringify(user));
            toast.success("algo");
        } else {
            toast.error(loginData);
        }
    };

    return (
        <Regcontainer className="container">
            <h1>Login</h1>
            <form>
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
                {/* <Pgraph>{userExists}</Pgraph> */}

                <Largebutton
                    className="loginbtn"
                    onClick={loginPost}
                    type="submit"
                >
                    Submit
                </Largebutton>
                <ToastContainer />
            </form>
        </Regcontainer>

    );
};

export default LoginUser;

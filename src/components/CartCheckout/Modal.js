import React, { useState } from "react";
import { X, CircleCheck } from 'lucide-react';
import styled from 'styled-components';

const Fondito = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
`
const Content = styled.div`
    width: fit-content;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: -4px 6px 5px 2px rgba(0,0,0,0.4);
`

const Modal = ({open, setOpen}) => {
    if(!open) return null;
    return (
        <Fondito>
        <Content>
            <button onClick={() => setOpen(false) }><X/></button>
            <div>
                <h1>Shipping Address</h1>
                <p>Please update your Shipping Address</p>
                <form>
                    <input type="text" placeholder="type your address here" required/>
                    <input type="text" placeholder="city" required/>
                    <input type="text" placeholder="state/province" required/>
                    <input type="text" placeholder="zip code" required/>
                    <input type="text" placeholder="country" required/>
                    <button><CircleCheck/>Save</button>
                </form>
            </div>
        </Content>
        </Fondito>
    );
}

export default Modal;
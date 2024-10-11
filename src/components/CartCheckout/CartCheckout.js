import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import { CartContext, UserContext } from '../../App';
import { Plus } from 'lucide-react';
import Modal from './Modal';

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 0 20px;
`;

const Title = styled.h1`
    text-align: center;
`;

const DataCard = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const FieldGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const Text = styled.div`
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const CheckoutButton = styled.input`
    background-color: #164863;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background-color: #2a7ca8;
    }
`;

const CartCheckout = () => {
    const [open, setOpen] = useState(false);
    const userContext = useContext(UserContext);

    const personalData = {
        phoneNumber: "6895988766"
    };

    return (
        <Container>
            <Title>Checkout</Title>
            <DataCard>
                <h2>Personal Information</h2>
                <FieldGroup>
                    <Label>Full Name:</Label>
                    <Text>{userContext.user.username}</Text>
                </FieldGroup>
                <FieldGroup>
                    <Label>Email:</Label>
                    <Text>{userContext.user.email}</Text>
                </FieldGroup>
                <FieldGroup>
                    <Label>Phone Number:</Label>
                    <Text>{personalData.phoneNumber}</Text>
                </FieldGroup>
            </DataCard>
            <DataCard>
                <h2>Shipping Address</h2>
                <button onClick={() => setOpen(true) }><Plus/>Add Details</button>
                <Modal open={open} setOpen={setOpen}/>

            </DataCard>
            <DataCard>
                <h2>Credit Card Information</h2>
                <FieldGroup>
                    <Label htmlFor="creditCardNumber">Credit Card Number</Label>
                    <Input type="text" id="creditCardNumber" name="creditCardNumber" required />
                </FieldGroup>
                <FieldGroup>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YYYY" required />
                </FieldGroup>
                <FieldGroup>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input type="text" id="cvv" name="cvv" required />
                </FieldGroup>
            </DataCard>
            <CheckoutButton type="submit" value="Place Order" />
        </Container>
    );
};

export default CartCheckout;

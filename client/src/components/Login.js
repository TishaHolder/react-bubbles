import React, {useState} from "react";
import { axiosWithAuth } from "../axiosWithAuth.js";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled from 'styled-components';
import '../App.css';
import reactbubbles from "../reactbubbles.jpg";

const LoginContainer = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24); 
    background-image: url(${reactbubbles});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    

`;


function Login(props){

    const [credentials, setCredentials] = useState({ username: "Lambda School", password: "i<3Lambd4" });

    const loginHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/api/login", credentials)
        .then(res => {
            console.log("login", res);
            localStorage.setItem("token", res.data.payload);
            props.history.push("/bubblepage");
        })
        .catch (err => {
            console.log(err);
        })
    }    

    const handleChange = (event) => {
        setCredentials ({
            ...credentials, 
            [event.target.name]: event.target.value
        });
    }
   
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    return (
      <LoginContainer>

        <form className = "login-form" onSubmit = {loginHandler}>
            <h1>Reactive Bubbles!</h1>

            <input className = "login-form-input" type = "text"
                   name = "username"
                   value = {credentials.username}
                   placeholder ="Please enter your username"
                   onChange ={handleChange} 
                   required />

            <input className = "login-form-input" type = "password"
                   name = "password"
                   value = {credentials.password}
                   placeholder = "Please enter your password"
                   onChange = {handleChange} 
                   required />

            <button className = "login-button" type = "submit">Sign In</button>

        </form>

      </LoginContainer>
    );

}

export default Login;

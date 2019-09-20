import React, {useState} from "react";
import { axiosWithAuth } from "../axiosWithAuth.js";
import ReactDOM from 'react-dom';
import axios from "axios";
//import '../App.css';

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
        <form className = "login-form" onSubmit = {loginHandler}>
            <h1>Welcome to the Bubble App!</h1>

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

            <button type = "submit">Sign In</button>

        </form>
    );

}

export default Login;

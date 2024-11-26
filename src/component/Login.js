import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(form);
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error(error.response.data);
            alert("Login failed.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 onClick={() => navigate('/home')}>Home</h1>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/user/create')}>create a account</button>
        </>
    );
};

export default Login;

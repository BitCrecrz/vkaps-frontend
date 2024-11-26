import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert("Registration successful!");
            navigate('/user/login')
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 onClick={() => navigate('/home')}>Home</h1>
            <h2>Register</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

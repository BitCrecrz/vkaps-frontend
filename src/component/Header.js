import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    function onLoginClick() {
        token && localStorage.removeItem('token')
        navigate('/user/login')
    }
    return <header style={{ backgroundColor: 'blueviolet' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginInline: '12px' }}>
            <h1>Store Header - New Feature!</h1>
            {!token ? <h1 style={{ cursor: 'pointer' }} onClick={onLoginClick}>Login</h1> : <h1 style={{ cursor: 'pointer' }} onClick={onLoginClick}>Logout</h1>}
        </div>
    </header>;
}

export default Header;

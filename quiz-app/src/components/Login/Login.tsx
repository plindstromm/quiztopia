import './Login.scss';
import React, { useState, useEffect } from 'react';

interface ApiSignupResponse {
    success: boolean;
    message?: string;
}

interface ApiLoginResponse {
    success: boolean;
    message?: string;
    token?: string;
}

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const retrievedToken = localStorage.getItem('authToken');
        if (retrievedToken) {
            setToken(retrievedToken);
        }
    }, []);

    const handleCreateUser = async () => {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup';
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        const response = await fetch(url, settings);
        const data: ApiSignupResponse = await response.json();

        if (data.success) {
            setMessage('Användaren skapades.');
        } else {
            setMessage('Kunde inte skapa användare.');
        }
    };

    const handleLogin = async () => {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login';
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        const response = await fetch(url, settings);
        const data: ApiLoginResponse = await response.json();

        if (data.success && data.token) {
            setMessage('Du är inloggad');
            localStorage.setItem('authToken', data.token);
            setToken(data.token);
        } else {
            setMessage('Kunde inte logga in');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setToken('');
        setMessage('Du är utloggad');
    };

    return (
        <section className='login'>
            <h1 className='login-header'>Beestt quiz ever</h1>
            <input
                className='form-field'
                type='text'
                placeholder='Användarnamn'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <input
                className='form-field'
                type='password'
                placeholder='Lösenord'
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <div className='login-row'>
                <button onClick={handleCreateUser}>Skapa användare</button>
                <button onClick={handleLogin}>Logga in</button>
                <button onClick={handleLogout}>Logga ut</button>
                <p>{message}</p>
            </div>
        </section>
    );
}

export default Login;
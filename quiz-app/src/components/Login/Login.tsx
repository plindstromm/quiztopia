import './Login.scss'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ApiSignupResponse {
    success: boolean;
    message?: string;
}

interface ApiLoginResponse {
    success: boolean;
    message?: string;
    token?: string;
}

interface ApiAccountResponse {
    success: boolean;
    message?: string;
    account?: Account;
}

interface Account {
    password: string;
    userId: string;
    username: string;
}

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const retrievedToken = localStorage.getItem('authToken');
        console.log(retrievedToken)
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
                password: password
            })
        };
        const response = await fetch(url, settings);
        const data: ApiSignupResponse = await response.json();
        console.log('handleCreateUser response:', data);

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
                password: password
            })
        };
        const response = await fetch(url, settings);
        const data: ApiLoginResponse = await response.json();
        console.log('handleLogin response:', data); 

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

    const handleGetUserInfo = async () => {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/account';
        const settings = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const response = await fetch(url, settings);
        const data: ApiAccountResponse = await response.json();

        if (data.success && data.account) {
            const account: Account = data.account;
            setMessage2(`user id:  ${account.userId}`);
        } else {
            setMessage2('Kunde inte hämta användarinfo');
        }
    };

    return (
        <section className='login'>
            <input className='form-field' type="text" placeholder='Användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
            <input className='form-field' type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
            <div className='login-row'>
                <button onClick={handleCreateUser}>Skapa användare</button>
                <button onClick={handleLogin}>Logga in</button>
                <button onClick={handleLogout}>Logga ut</button>
                <p>{message}</p>
            </div>
            <section>
                <h2> När inloggad </h2>
                <p> {token ? token : 'Ingen token.'} </p>
                
                <p> {message2} </p>
            </section>
        </section>
    );
}/*<button onClick={handleGetUserInfo}> Hämta användarinfo </button>*/

export default Login;
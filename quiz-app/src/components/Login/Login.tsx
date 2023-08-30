import './Login.scss'
import { useState } from 'react'

interface ApiSignupResponse {
	success: boolean;
	message?: string;
}

function Login() {
        const [username, setUsername] = useState<string>('')
        const [password, setPassword] = useState<string>('')
        const [message, setMessage] = useState<string>('')

        const handleCreateUser = async () => {
        const url = 'https://jv4lxh2izk.execute-api.eu-north-1.amazonaws.com/auth/signup'
        const settings = {
            method: 'POST', 
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const response = await fetch(url, settings)
		const data: ApiSignupResponse = await response.json()
		console.log('handleCreateUser: ', data);
        if( data.success ) {
			setMessage('Användaren skapades.')
		} else {
			setMessage('Kunde inte skapa användare.')
		}
    }
        

    const handleLogin = async () => {
	
	}
    

    return(


        <section className='login'>
                <input type="text" placeholder='användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
                <input type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
            <div className='login-row'>

                <button onClick={handleCreateUser}>Skapa användare</button>
                <button onClick={handleLogin}>Logga in</button>

                <p>{message}</p>

            </div>
        </section>
    )
}

export default Login;
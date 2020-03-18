import React, { useState } from 'react';
import './Login.css';
import logo from '../images/logo.svg';
import api from '../services/api';

/* propriedade 'history' é herdada de 'react-router-dom', 
pois 'Login' é usado como componente de rota em 'routes.js' */
function Login({ history }){
    const [ username, setUsername] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/devs', {
            'username': username.toLowerCase(),
        });
        const {_id} = response.data;
        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="DevsCorner"/>
                <input
                    placeholder="Digite seu usuário do Github" 
                    value={username}
                    onChange={ event => setUsername(event.target.value)}
                    />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
export default Login;
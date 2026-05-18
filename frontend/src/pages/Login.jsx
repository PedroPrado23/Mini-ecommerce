import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            const response = await api.post('/api/auth/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('perfil', response.data.perfil);
            navigate('/produtos');
        } catch (error) {
            setErro('Email ou senha inválidos');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.title}>Mini E-commerce</h2>
                <form onSubmit={handleLogin}>
                    <div style={styles.field}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    {erro && <p style={styles.erro}>{erro}</p>}
                    <button type="submit" style={styles.button}>Entrar</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0'
    },
    box: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '350px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '24px',
        color: '#333'
    },
    field: {
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    erro: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default Login;
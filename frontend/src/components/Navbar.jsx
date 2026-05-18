import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const perfil = localStorage.getItem('perfil');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('perfil');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.links}>
                <Link to="/produtos" style={styles.link}>Produtos</Link>
                {perfil === 'ADMIN' && (
                    <Link to="/usuarios" style={styles.link}>Usuários</Link>
                )}
            </div>
            <div style={styles.right}>
                <span style={styles.perfil}>{perfil}</span>
                <button onClick={handleLogout} style={styles.button}>
                    Sair
                </button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px'
    },
    links: {
        display: 'flex',
        gap: '20px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px'
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    perfil: {
        color: '#aaa',
        fontSize: '14px'
    },
    button: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '4px'
    }
};

export default Navbar;
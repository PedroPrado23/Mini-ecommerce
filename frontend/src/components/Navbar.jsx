import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.links}>
                <Link to="/produtos" style={styles.link}>Produtos</Link>
                <Link to="/usuarios" style={styles.link}>Usuários</Link>
            </div>
            <button onClick={handleLogout} style={styles.button}>
                Sair
            </button>
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
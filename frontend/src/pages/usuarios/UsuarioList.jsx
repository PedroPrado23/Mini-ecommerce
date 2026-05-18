import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../../services/usuarioService';

function UsuarioList() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const response = await usuarioService.listarTodos();
            setUsuarios(response.data);
        } catch (error) {
            alert('Erro ao carregar usuários');
        }
    };

    const handleDeletar = async (id) => {
        if (window.confirm('Deseja realmente excluir este usuário?')) {
            try {
                await usuarioService.deletar(id);
                carregarUsuarios();
            } catch (error) {
                alert('Erro ao deletar usuário');
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Usuários</h2>
                <button
                    onClick={() => navigate('/usuarios/novo')}
                    style={styles.buttonNovo}
                >
                    Novo Usuário
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nome</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Perfil</th>
                        <th style={styles.th}>Ativo</th>
                        <th style={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td style={styles.td}>{usuario.id}</td>
                            <td style={styles.td}>{usuario.nome}</td>
                            <td style={styles.td}>{usuario.email}</td>
                            <td style={styles.td}>{usuario.perfil}</td>
                            <td style={styles.td}>{usuario.ativo ? 'Sim' : 'Não'}</td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                                    style={styles.buttonEditar}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeletar(usuario.id)}
                                    style={styles.buttonDeletar}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    buttonNovo: {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px',
        textAlign: 'left'
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd'
    },
    buttonEditar: {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '8px'
    },
    buttonDeletar: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default UsuarioList;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usuarioService from '../../services/usuarioService';

function UsuarioForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const editando = !!id;

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        perfil: 'USER',
        ativo: true
    });

    useEffect(() => {
        if (editando) {
            carregarUsuario();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const carregarUsuario = async () => {
        try {
            const response = await usuarioService.buscarPorId(id);
            setForm({ ...response.data, senha: '' });
        } catch (error) {
            alert('Erro ao carregar usuário');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await usuarioService.atualizar(id, form);
            } else {
                await usuarioService.criar(form);
            }
            navigate('/usuarios');
        } catch (error) {
            alert('Erro ao salvar usuário');
        }
    };

    return (
        <div style={styles.container}>
            <h2>{editando ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label>Nome</label>
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.field}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.field}>
                    <label>Senha {editando && '(deixe em branco para manter)'}</label>
                    <input
                        name="senha"
                        type="password"
                        value={form.senha}
                        onChange={handleChange}
                        style={styles.input}
                        required={!editando}
                    />
                </div>
                <div style={styles.field}>
                    <label>Perfil</label>
                    <select
                        name="perfil"
                        value={form.perfil}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div style={styles.fieldRow}>
                    <label>Ativo</label>
                    <input
                        name="ativo"
                        type="checkbox"
                        checked={form.ativo}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.buttons}>
                    <button type="submit" style={styles.buttonSalvar}>Salvar</button>
                    <button
                        type="button"
                        onClick={() => navigate('/usuarios')}
                        style={styles.buttonCancelar}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    fieldRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    buttons: {
        display: 'flex',
        gap: '10px'
    },
    buttonSalvar: {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    buttonCancelar: {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    }
};

export default UsuarioForm;
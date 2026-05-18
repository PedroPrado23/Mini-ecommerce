import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import produtoService from '../../services/produtoService';
import api from '../../services/api';

function ProdutoForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const editando = !!id;

    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        preco: '',
        qtdEstoque: '',
        categoria: '',
        ativo: true,
        imagemUrl: ''
    });
    const [arquivo, setArquivo] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (editando) {
            carregarProduto();
        }
    }, [id]);

    const carregarProduto = async () => {
        try {
            const response = await produtoService.buscarPorId(id);
            setForm(response.data);
            if (response.data.imagemUrl) {
                setPreview(`http://localhost:8080${response.data.imagemUrl}`);
            }
        } catch (error) {
            alert('Erro ao carregar produto');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleArquivo = (e) => {
        const file = e.target.files[0];
        setArquivo(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imagemUrl = form.imagemUrl;

            if (arquivo) {
                const formData = new FormData();
                formData.append('file', arquivo);
                const uploadResponse = await api.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imagemUrl = uploadResponse.data;
            }

            const produtoParaSalvar = { ...form, imagemUrl };

            if (editando) {
                await produtoService.atualizar(id, produtoParaSalvar);
            } else {
                await produtoService.criar(produtoParaSalvar);
            }
            navigate('/produtos');
        } catch (error) {
            alert('Erro ao salvar produto');
        }
    };

    return (
        <div style={styles.container}>
            <h2>{editando ? 'Editar Produto' : 'Novo Produto'}</h2>
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
                    <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        style={styles.input}
                        rows={3}
                    />
                </div>
                <div style={styles.field}>
                    <label>Preço</label>
                    <input
                        name="preco"
                        type="number"
                        step="0.01"
                        value={form.preco}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.field}>
                    <label>Quantidade em Estoque</label>
                    <input
                        name="qtdEstoque"
                        type="number"
                        value={form.qtdEstoque}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.field}>
                    <label>Categoria</label>
                    <input
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.field}>
                    <label>Imagem do Produto</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleArquivo}
                        style={styles.input}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            style={styles.preview}
                        />
                    )}
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
                        onClick={() => navigate('/produtos')}
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
    container: { padding: '20px', maxWidth: '600px' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px' },
    fieldRow: { display: 'flex', alignItems: 'center', gap: '10px' },
    input: { padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
    preview: { width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px', marginTop: '8px' },
    buttons: { display: 'flex', gap: '10px' },
    buttonSalvar: { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
    buttonCancelar: { backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }
};

export default ProdutoForm;
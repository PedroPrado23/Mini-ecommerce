import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import produtoService from '../../services/produtoService';

function ProdutoList() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 5;
    const perfil = localStorage.getItem('perfil');

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
    const inicio = (paginaAtual - 1) * produtosPorPagina;
    const produtosPaginados = produtosFiltrados.slice(inicio, inicio + produtosPorPagina);

    useEffect(() => {
        carregarProdutos();
    }, []);

    useEffect(() => {
        setPaginaAtual(1);
    }, [busca]);

    const carregarProdutos = async () => {
        try {
            const response = await produtoService.listarTodos();
            setProdutos(response.data);
        } catch (error) {
            alert('Erro ao carregar produtos');
        }
    };

    const handleDeletar = async (id) => {
        if (window.confirm('Deseja realmente excluir este produto?')) {
            try {
                await produtoService.deletar(id);
                carregarProdutos();
            } catch (error) {
                alert('Erro ao deletar produto');
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Produtos</h2>
                {perfil === 'ADMIN' && (
                    <button
                        onClick={() => navigate('/produtos/novo')}
                        style={styles.buttonNovo}
                    >
                        Novo Produto
                    </button>
                )}
            </div>
            <input
                type="text"
                placeholder="Buscar por nome ou categoria..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={styles.inputBusca}
            />
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Imagem</th>
                        <th style={styles.th}>Nome</th>
                        <th style={styles.th}>Categoria</th>
                        <th style={styles.th}>Preço</th>
                        <th style={styles.th}>Estoque</th>
                        <th style={styles.th}>Ativo</th>
                        {perfil === 'ADMIN' && <th style={styles.th}>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {produtosPaginados.map((produto) => (
                        <tr key={produto.id}>
                            <td style={styles.td}>{produto.id}</td>
                            <td style={styles.td}>
                                {produto.imagemUrl ? (
                                    <img
                                        src={`http://localhost:8080${produto.imagemUrl}`}
                                        alt={produto.nome}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                ) : (
                                    <span style={{ color: '#999', fontSize: '12px' }}>Sem imagem</span>
                                )}
                            </td>
                            <td style={styles.td}>{produto.nome}</td>
                            <td style={styles.td}>{produto.categoria}</td>
                            <td style={styles.td}>R$ {produto.preco}</td>
                            <td style={styles.td}>{produto.qtdEstoque}</td>
                            <td style={styles.td}>{produto.ativo ? 'Sim' : 'Não'}</td>
                            {perfil === 'ADMIN' && (
                                <td style={styles.td}>
                                    <button
                                        onClick={() => navigate(`/produtos/editar/${produto.id}`)}
                                        style={styles.buttonEditar}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeletar(produto.id)}
                                        style={styles.buttonDeletar}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.paginacao}>
                <button
                    onClick={() => setPaginaAtual(p => p - 1)}
                    disabled={paginaAtual === 1}
                    style={styles.buttonPagina}
                >
                    Anterior
                </button>
                <span style={styles.infoPagina}>
                    Página {paginaAtual} de {totalPaginas || 1}
                </span>
                <button
                    onClick={() => setPaginaAtual(p => p + 1)}
                    disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                    style={styles.buttonPagina}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    buttonNovo: { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'left' },
    td: { padding: '10px', borderBottom: '1px solid #ddd' },
    buttonEditar: { backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
    buttonDeletar: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
    inputBusca: { padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', width: '300px', marginBottom: '16px' },
    paginacao: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px' },
    buttonPagina: { backgroundColor: '#333', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
    infoPagina: { fontSize: '14px', color: '#333' }
};

export default ProdutoList;
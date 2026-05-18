import api from './api';

const produtoService = {
    listarTodos: () => api.get('/api/produtos'),
    buscarPorId: (id) => api.get(`/api/produtos/${id}`),
    criar: (produto) => api.post('/api/produtos', produto),
    atualizar: (id, produto) => api.put(`/api/produtos/${id}`, produto),
    deletar: (id) => api.delete(`/api/produtos/${id}`)
};

export default produtoService;
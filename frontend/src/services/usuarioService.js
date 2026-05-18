import api from './api';

const usuarioService = {
    listarTodos: () => api.get('/api/usuarios'),
    buscarPorId: (id) => api.get(`/api/usuarios/${id}`),
    criar: (usuario) => api.post('/api/usuarios', usuario),
    atualizar: (id, usuario) => api.put(`/api/usuarios/${id}`, usuario),
    deletar: (id) => api.delete(`/api/usuarios/${id}`)
};

export default usuarioService;
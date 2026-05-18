import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProdutoList from './pages/produtos/ProdutoList';
import ProdutoForm from './pages/produtos/ProdutoForm';
import UsuarioList from './pages/usuarios/UsuarioList';
import UsuarioForm from './pages/usuarios/UsuarioForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Navbar />
                        <Navigate to="/produtos" />
                    </PrivateRoute>
                } />
                <Route path="/produtos" element={
                    <PrivateRoute>
                        <Navbar />
                        <ProdutoList />
                    </PrivateRoute>
                } />
                <Route path="/produtos/novo" element={
                    <PrivateRoute>
                        <Navbar />
                        <ProdutoForm />
                    </PrivateRoute>
                } />
                <Route path="/produtos/editar/:id" element={
                    <PrivateRoute>
                        <Navbar />
                        <ProdutoForm />
                    </PrivateRoute>
                } />
                <Route path="/usuarios" element={
                    <PrivateRoute>
                        <Navbar />
                        <UsuarioList />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/novo" element={
                    <PrivateRoute>
                        <Navbar />
                        <UsuarioForm />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/editar/:id" element={
                    <PrivateRoute>
                        <Navbar />
                        <UsuarioForm />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
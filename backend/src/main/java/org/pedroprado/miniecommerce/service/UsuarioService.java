package org.pedroprado.miniecommerce.service;

import org.pedroprado.miniecommerce.dto.usuario.UsuarioCreateDTO;
import org.pedroprado.miniecommerce.dto.usuario.UsuarioResponseDTO;
import org.pedroprado.miniecommerce.dto.usuario.UsuarioUpdateDTO;
import org.pedroprado.miniecommerce.model.Usuario;
import org.pedroprado.miniecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(u -> new UsuarioResponseDTO(
                        u.getId(),
                        u.getNome(),
                        u.getEmail(),
                        u.getPerfil(),
                        u.getAtivo()
                ))
                .collect(Collectors.toList());
    }

    public Optional<UsuarioResponseDTO> buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .map(u -> new UsuarioResponseDTO(
                        u.getId(),
                        u.getNome(),
                        u.getEmail(),
                        u.getPerfil(),
                        u.getAtivo()
                ));
    }

    public UsuarioResponseDTO salvar(UsuarioCreateDTO dto) {
        Usuario usuario = new Usuario(
                dto.getNome(),
                dto.getEmail(),
                passwordEncoder.encode(dto.getSenha()),
                dto.getPerfil(),
                dto.getAtivo()
        );
        Usuario salvo = usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail(),
                salvo.getPerfil(),
                salvo.getAtivo()
        );
    }

    public UsuarioResponseDTO atualizar(Long id, UsuarioUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuario.setPerfil(dto.getPerfil());
        usuario.setAtivo(dto.getAtivo());

        Usuario atualizado = usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(
                atualizado.getId(),
                atualizado.getNome(),
                atualizado.getEmail(),
                atualizado.getPerfil(),
                atualizado.getAtivo()
        );
    }

    public void deletar(Long id) {
        usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuarioRepository.deleteById(id);
    }
}
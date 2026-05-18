package org.pedroprado.miniecommerce.controller;

import jakarta.validation.Valid;
import org.pedroprado.miniecommerce.config.JwtUtil;
import org.pedroprado.miniecommerce.dto.auth.LoginRequestDTO;
import org.pedroprado.miniecommerce.dto.auth.LoginResponseDTO;
import org.pedroprado.miniecommerce.model.Usuario;
import org.pedroprado.miniecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha())
        );

        String email = authentication.getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String token = jwtUtil.gerarToken(email);

        return ResponseEntity.ok(new LoginResponseDTO(
                token,
                email,
                usuario.getPerfil().name()
        ));
    }
}
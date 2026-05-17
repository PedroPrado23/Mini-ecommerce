package org.pedroprado.miniecommerce.dto.usuario;

import org.pedroprado.miniecommerce.model.Usuario;

public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private Usuario.Perfil perfil;
    private Boolean ativo;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Long id, String nome, String email, Usuario.Perfil perfil, Boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.perfil = perfil;
        this.ativo = ativo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Usuario.Perfil getPerfil() { return perfil; }
    public void setPerfil(Usuario.Perfil perfil) { this.perfil = perfil; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}
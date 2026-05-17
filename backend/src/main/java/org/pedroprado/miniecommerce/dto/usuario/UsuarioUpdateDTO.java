package org.pedroprado.miniecommerce.dto.usuario;

import jakarta.validation.constraints.*;
import org.pedroprado.miniecommerce.model.Usuario;

public class UsuarioUpdateDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotNull(message = "Perfil é obrigatório")
    private Usuario.Perfil perfil;

    @NotNull(message = "Ativo é obrigatório")
    private Boolean ativo;

    public UsuarioUpdateDTO() {
    }

    public UsuarioUpdateDTO(String nome, String email, String senha, @NotNull(message = "Perfil é obrigatório") Usuario.Perfil perfil, Boolean ativo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
        this.ativo = ativo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Usuario.Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Usuario.Perfil perfil) {
        this.perfil = perfil;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
package org.pedroprado.miniecommerce.service;

import org.pedroprado.miniecommerce.dto.produto.ProdutoCreateDTO;
import org.pedroprado.miniecommerce.dto.produto.ProdutoResponseDTO;
import org.pedroprado.miniecommerce.dto.produto.ProdutoUpdateDTO;
import org.pedroprado.miniecommerce.model.Produto;
import org.pedroprado.miniecommerce.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(p -> new ProdutoResponseDTO(
                        p.getId(),
                        p.getNome(),
                        p.getDescricao(),
                        p.getPreco(),
                        p.getQtdEstoque(),
                        p.getCategoria(),
                        p.getAtivo(),
                        p.getImagemUrl()
                ))
                .collect(Collectors.toList());
    }

    public Optional<ProdutoResponseDTO> buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .map(p -> new ProdutoResponseDTO(
                        p.getId(),
                        p.getNome(),
                        p.getDescricao(),
                        p.getPreco(),
                        p.getQtdEstoque(),
                        p.getCategoria(),
                        p.getAtivo(),
                        p.getImagemUrl()
                ));
    }

    public ProdutoResponseDTO salvar(ProdutoCreateDTO dto) {
        Produto produto = new Produto(
                dto.getNome(),
                dto.getDescricao(),
                dto.getPreco(),
                dto.getQtdEstoque(),
                dto.getCategoria(),
                dto.getAtivo()
        );
        produto.setImagemUrl(dto.getImagemUrl());
        Produto salvo = produtoRepository.save(produto);
        return new ProdutoResponseDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getDescricao(),
                salvo.getPreco(),
                salvo.getQtdEstoque(),
                salvo.getCategoria(),
                salvo.getAtivo(),
                salvo.getImagemUrl()
        );
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoUpdateDTO dto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setQtdEstoque(dto.getQtdEstoque());
        produto.setCategoria(dto.getCategoria());
        produto.setAtivo(dto.getAtivo());
        produto.setImagemUrl(dto.getImagemUrl());

        Produto atualizado = produtoRepository.save(produto);
        return new ProdutoResponseDTO(
                atualizado.getId(),
                atualizado.getNome(),
                atualizado.getDescricao(),
                atualizado.getPreco(),
                atualizado.getQtdEstoque(),
                atualizado.getCategoria(),
                atualizado.getAtivo(),
                atualizado.getImagemUrl()
        );
    }

    public void deletar(Long id) {
        produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produtoRepository.deleteById(id);
    }
}
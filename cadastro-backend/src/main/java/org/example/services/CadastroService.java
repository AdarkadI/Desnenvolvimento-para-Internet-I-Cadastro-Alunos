package org.example.services;

import org.example.models.Cadastro;
import org.example.repositories.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CadastroService {
    @Autowired
    private CadastroRepository cadastroRepository;
    public Cadastro save(Cadastro biblioteca){
        cadastroRepository.save(biblioteca);
        return biblioteca;
    }
    public List<Cadastro> findAll(){
        return cadastroRepository.findAll();
    }
}
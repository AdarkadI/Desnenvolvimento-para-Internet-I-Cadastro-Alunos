package org.example.controllers;

import org.example.constant.Constant;
import org.example.models.Aluno;
import org.example.models.Cadastro;
import org.example.services.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CadastroController {
    @Autowired
    private CadastroService cadastroService;

    @Autowired
    private org.example.services.AlunoService AlunoService;

    @PostMapping(Constant.API_CADASTRO)
    public ResponseEntity<Cadastro> createCustomer(@RequestBody Cadastro cadastro) {
        Aluno aluno = AlunoService.save(cadastro.getAluno());
        cadastro.setAluno(aluno);
        Cadastro savedAluno = cadastroService.save(cadastro);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAluno);
    }

    @PutMapping(Constant.API_CADASTRO)
    public ResponseEntity<Cadastro>  update(@RequestBody Cadastro cadastro){
        Cadastro savedBook = cadastroService.save(cadastro);
        return ResponseEntity.ok(savedBook);

    }

    @GetMapping(Constant.API_FIND_ALL)
    public ResponseEntity<List<Cadastro>> findAll(){
        return ResponseEntity.ok(cadastroService.findAll());
    }
}

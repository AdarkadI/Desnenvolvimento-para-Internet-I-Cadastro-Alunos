package org.example.repositories;

import org.example.models.Cadastro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CadastroRepository extends MongoRepository<Cadastro, String> {
}

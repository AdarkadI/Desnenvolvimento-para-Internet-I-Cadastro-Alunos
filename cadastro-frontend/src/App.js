import React, { useState, useEffect } from "react";

function App() {
  //useState para armazenar a lista de alunos recebida da API
  const [alunos, setAlunos] = useState([]);

  //useState para armazenar os valores digitados no formulário
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  //useEffect é executado uma vez quando o componente é montado
  //Ele realiza uma requisição GET para buscar os alunos já cadastrados
  useEffect(() => {
    fetch("http://localhost:8081/consultar/alunos")
      .then((res) => res.json())
      .then((data) => setAlunos(data))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoCadastro = {
      aluno: form,
      dataCadastro: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:8081/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCadastro),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro no cadastro");
        return res.json();
      })
      .then(() => {
        window.location.reload(); // <- força o reload após o cadastro
      })
      .catch((err) => console.error("Erro ao cadastrar aluno:", err));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cadastrar
        </button>
      </form>

      <h3 style={{ marginTop: "40px" }}>Alunos Cadastrados</h3>
      <table
        border="1"
        cellPadding="5"
        style={{
          width: "100%",
          backgroundColor: "#E0F0FF", // azul claro
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((alunoWrapper) => (
            <tr key={alunoWrapper.id}>
              <td>{alunoWrapper.aluno?.nome}</td>
              <td>{alunoWrapper.aluno?.telefone}</td>
              <td>{alunoWrapper.aluno?.email}</td>
              <td>{alunoWrapper.aluno?.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;

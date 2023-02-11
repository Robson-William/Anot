// Importando módulos
import express from "express";
import * as Rota from "../controllers/anotacaoController.mjs";
import * as middleware from '../middleware/middleware.mjs';

// Configurações
const router = express.Router();

// Rotas
	// Rotas backend
	router.get("/readAll", Rota.list); // Lista todas as anotações
	router.get("/search", Rota.search); // Busca anotação por texto
	router.post("/create", Rota.add); // Adiciona uma nova anotação
	router.post("/update", Rota.update); // Atualiza o conteúdo de uma anotação
	router.post("/delete", Rota.deletar); // Deleta uma anotação

	// Rotas frontend
	router.get("/", (req, res) => res.redirect("/index")); // Redireciona a página principal
	router.get('/index', Rota.index); // Página principal
	router.get('/cadastro', middleware.authenticated, Rota.addForm); // Formulário de cadastro de anotação
	router.get('/update/:id', middleware.authenticated, Rota.getUpdateForm); // Formulário de atualização de anotação
	router.get('/delete/:id', middleware.authenticated, Rota.getDeleteForm); // Confirmação se deseja deletar anotação
	router.get("/anotacao/:id", Rota.getNote); // Busca anotação por texto

// Exportar módulo
export {router};

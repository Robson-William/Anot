// Importando módulos
import express from "express";
import * as Rota from "../controllers/anotacaoController.mjs";
import {authenticated} from '../middleware/middleware.mjs';

// Configurações
const router = express.Router();

// Rotas
	// Rotas backend
	router.get("/notes/readAll", Rota.list); // Lista todas as anotações
	router.get("/notes/search", Rota.search); // Busca anotação por texto
	router.post("/notes/create", Rota.add); // Adiciona uma nova anotação
	router.post("/notes/update", Rota.update); // Atualiza o conteúdo de uma anotação
	router.post("/notes/delete", Rota.deletar); // Deleta uma anotação

	// Rotas frontend
	router.get("/", (req, res) => res.redirect("/notes/index")); // Redireciona a página principal
	router.get('/notes/index', Rota.index); // Página principal
	router.get('/notes/cadastro', authenticated, Rota.addForm); // Formulário de cadastro de anotação
	router.get('/notes/update/:id', authenticated, Rota.getUpdateForm); // Formulário de atualização de anotação
	router.get('/notes/delete/:id', authenticated, Rota.getDeleteForm); // Confirmação se deseja deletar anotação
	router.get("/notes/anotacao/:id", Rota.getNote); // Busca anotação por texto

// Exportar módulo
export default router;

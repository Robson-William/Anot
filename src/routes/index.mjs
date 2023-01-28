// Importando módulos
import express from "express";
import * as Rota from "../controllers/anotacaoController.mjs";

// Configurações
const router = express.Router();

// Rotas
	// Rotas backend
	router.get("/notes/readAll", Rota.list);
	router.get("/notes/search", Rota.search);
	router.post("/notes/create", Rota.add);
	router.post("/notes/update", Rota.update);
	router.post("/notes/delete", Rota.deletar);

	// Rotas frontend
	router.get("/", (req, res) => res.redirect("/notes/index"));
	router.get('/notes/index', Rota.index);
	router.get('/notes/cadastro', Rota.addForm);
	router.get('/notes/update/:id', Rota.getUpdateForm);
	router.get('/notes/delete/:id', Rota.getDeleteForm);

// Exportar módulo
export default router;

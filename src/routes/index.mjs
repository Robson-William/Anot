// Importando módulos
import express from "express";
import {add, list, busca, update, deletar} from "../controllers/anotacaoController.mjs";

// Configurações
const router = express.Router();

// Rotas
	// Rota principal
	router.get("/", list);

	// Rota para requisitar notas
	router.get("/busca", busca);

	// Rota para adicionar notas
	router.post("/add", add);

	//Rota para atualizar notas
	router.put("/update", update);

	// Rota para deletar notas
	router.delete("/delete", deletar);

// Exportar módulo
export default router;

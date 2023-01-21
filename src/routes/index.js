// Importando módulos
import express from "express";
import {add, list, busca} from "../controllers/anotacaoController.js";

// Configurações
const router = express.Router();

// Rotas
	// Rota principal
	router.get('/', list);

	// Rota para requisitar notas
	router.get('/busca', busca);

	// Rota para adicionar notas
	router.post('/add', add);

// Exportar módulo
export default router;

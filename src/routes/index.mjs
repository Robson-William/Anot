// Importando módulos
import express from "express";
import * as Rota from "../controllers/anotacaoController.mjs";

// Configurações
const router = express.Router();

// Rotas
	// Rotas backend
	router.get("/readAll", Rota.list);
	router.get("/readOne", Rota.busca);
	router.post("/create", Rota.add);
	router.put("/update", Rota.update);
	router.delete("/delete", Rota.deletar);

	// Rotas frontend
	router.get('/', Rota.index);
	router.get('/add', Rota.addForm);

// Exportar módulo
export default router;

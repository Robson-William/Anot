// Importando módulos
import express from "express";
import * as Rota from "../controllers/anotacaoController.mjs";
import * as middleware from '../middleware/middleware.mjs';
import {router as usersRouter} from './users.mjs';
import {router as notesRouter} from './notes.mjs';

// Configurações
const router = express.Router();

// Rotas
	router.use(middleware.locals);
	router.use(usersRouter);
	router.use('/notes', notesRouter);

// Exportar módulo
export default router;

// Importando módulos
import express from 'express';
import * as Rota from '../controllers/userController.mjs';

// Configurando
const router = express.Router();

// Rotas
	// Backend | API Rest
	router.post('/signout', Rota.add); // Cria novo usuário
	router.post('/signin', Rota.authenticate); // Verifica se o usuário existe
	router.get('/signout', Rota.signout);  // Sai da sessão

	// Frontend
	router.get('/cadastro', Rota.create); // Mostra formulário de cadastro
	router.get('/login', Rota.signin); // Mostra formulário de login

export {router};

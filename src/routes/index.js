// Importando módulos
import express from 'express';

// Configurações
const router = express.Router();

// Rotas
	// Rota principal
	router.get('/', (req, res) => {
		res.send('OLá Mundo!');
	})

	// Rota para requisitar notas
	router.get('/adicionar', (req, res) => {
		res.send('Adicionar notas');
	})

	// Rota para adicionar notas
	router.post('/adicionar', (req, res) => {
		
	})

// Exportar módulo
export default router;

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('OLá Mundo!');
})

router.get('/adicionar', (req, res) => {
	res.send('Adicionar notas');
})

router.post('/adicionar', (req, res) => {
	
})

export default router;

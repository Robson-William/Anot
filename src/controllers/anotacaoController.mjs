// Importando módulos
import * as dotenv from 'dotenv';
import * as Anotacao from '../models/Anotacao.mjs';

// Configurações
dotenv.config();

// Rotas
// Front
	// Página inicial
	const index = async (req, res) => {
		const notes = await Anotacao.readAll();

		res.render('anotacoes/index.html', {notes});
	}

	// Página de cadastro
	const addForm = async (req, res) => {
		res.locals.mode = 'create';

		res.render('anotacoes/form.html');
	}

	// Página para atualizar
	const getUpdateForm = async (req, res) => {
		const {id} = req.params;

		const note = await Anotacao.readOne(id);

		res.locals.mode = 'update';
		res.render('anotacoes/form.html', {note});
	}

	// Página para deletar
	const getDeleteForm = async (req, res) => {
		const {id} = req.params;

		const note = await Anotacao.readOne(id);
		
		res.render('anotacoes/delete.html', {note});
	}

	// Página da anotação
	const getNote = async (req, res) => {
		const {id} = req.params;

		const note = await Anotacao.readOne(id);

		res.render('anotacoes/note.html', {note});
	}

// CRUD
	// Adicionar anotação
	const add = async (req, res) => {
		// Dados
		const {titulo, conteudo} = req.body;
		const anotacao = {titulo, conteudo};
		
		const userId = req.session.user._id;

		const dados = await Anotacao.create(anotacao, userId);

		res.redirect('/');
	}

	// Buscar todas
	const list = async (req, res) => {
		const lista = await Anotacao.readAll();

		res.json(lista);
	}

	// Busca
	const search = async (req, res) => {
		const {pesquisa} = req.query;
		
		const notes = await Anotacao.search(pesquisa);
		
		res.render('anotacoes/index.html', {notes});
	}

	// Atualizar
	const update = async (req, res) => {
		const {id, titulo, conteudo} = req.body;
		const note = {id, titulo, conteudo};

		const updated = await Anotacao.update(note);

		res.redirect('/')
	}

	// Deletar
	const deletar = async (req, res) => {
		const {id} = req.body;

		const deletado = await Anotacao.deletar(id);

		res.redirect('/');
	}


export {add, list, search, update, deletar, index, addForm, getUpdateForm, getDeleteForm, getNote};

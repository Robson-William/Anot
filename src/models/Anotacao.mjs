// Importando módulos
import {client} from '../db/mongo.mjs';
import {driver} from '../db/neo4j.mjs';
import * as dotenv from 'dotenv';

// Variáveis
let criado = false;

const Schema = client.Schema;
const ObjectId = Schema.ObjectId;

// Model
const AnotSchema = new Schema({
	titulo: String,
	conteudo: String
}).index({titulo: "text", conteudo: "text"}, {weights: {titulo: 2, conteudo: 1}});

const Anot = client.model('Note', AnotSchema);

// CRUD
	// Adicionar anotação
	async function create(dados, userId){
		try {
			// Inserir
			const novo = Anot({
				titulo: dados.titulo,
				conteudo: dados.conteudo
			})

			const inserirResultado = await novo.save();

			// Neo4j
			const session = driver.session();

			const note = await session.run(
			'CREATE (n:Anotacao{noteId: $id, titulo: $titulo, conteudo: $conteudo})',
			{id: `${inserirResultado._id}`, titulo: inserirResultado.titulo, conteudo: inserirResultado.conteudo}
			);
			
			const relacao = await session.run(
			'MATCH (u:Usuario{userId: $idUser})' +
			'OPTIONAL MATCH (n:Anotacao{noteId: $idNote})' +
			'CREATE (u)-[:CRIOU]->(n)',
			{idUser: userId, idNote: `${inserirResultado._id}`}
			)

			return inserirResultado;
		}catch(err) {
			console.log(err);
		}
	}

	// Buscar todos
	async function readAll(){
		try {
			// Função
			const buscarTodos = await Anot.find({});
			return buscarTodos;
		}catch(err) {
			console.log(err);
		}
	}

	// Buscar todas as anotações do usuário
	async function readByUser(userId){
		try {
			// Função
			const session = driver.session();

			const notes = await session.run(
				'MATCH (u:Usuario{userId: $id})-[:CRIOU]->(a:Anotacao) RETURN a',
				{id: userId}
			)
			
			let buscarTodos = [];

			notes.records.forEach((note) => {
				buscarTodos.push(note._fields[0].properties);
			})

			return buscarTodos;
		}catch(err) {
			console.log(err);
		}
	}

	// Busca específica
	async function readOne(id){
		try {
			// Função
			const filtro = await Anot.find({_id: id});
			return filtro;
		}catch(err) {
			console.log(err);
		}
	}

	// Busca
	async function search(pesquisa){
		try {
			// Função
			const filtro = await Anot.find({$text: {$search: pesquisa}}, {score: {$meta: 'textScore'}});
			return filtro;
		}catch(err) {
			console.log(err);
		}
	}

	// Atualizar
	async function update(note){
		try{
			// Função
			const filtro = await Anot.updateOne({_id: note.id}, {$set: {titulo: note.titulo, conteudo: note.conteudo}});

			// Neo4j
			const session = driver.session();

			const notaAtualizada = await session.run(
				'MATCH (a:Anotacao{noteId: $id})' +
				'SET a += {titulo: $titulo, conteudo: $conteudo}' +
				'RETURN a',
				{id: note.id, titulo: note.titulo, conteudo: note.conteudo}
			)

			return filtro;
		}catch(err) {
			console.log(err);
		}
	}

	// Deletar
	async function deletar(id){
		try{
			// Função
			const filtro = await Anot.deleteOne({_id: id});

			// Neo4j
			const session = driver.session();

			const deleteNeo4j = session.run(
				'MATCH (a:Anotacao{noteId: $noteId})' +
				'DETACH DELETE a',
				{noteId: id}
			)

			return 'Deletado!';
		}catch(err) {
			console.log(err);
		}
	}

export {create, readAll, readByUser, readOne, search, update, deletar};

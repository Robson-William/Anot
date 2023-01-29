// Importando módulos
import {client} from '../db/mongo.mjs';
import * as dotenv from 'dotenv';
import {ObjectId} from 'mongodb';

// Variáveis
let criado = false;


// CRUD
	// Criar index
	async function index(){
		if(!criado){
			await client.connect();
			const db = await client.db(process.env.DBNAME);
			const collection = await db.collection(process.env.DBCOLLECTION);
			
			const index = await collection.createIndex({titulo: "text", conteudo: "text"}, {weights: {titulo: 2, conteudo: 1}});
			criado = true;
			return index;
		} else {
			return 'Index já foi criado.';
		}
	}

	// Adicionar anotação
	async function create(dados){
		try {
			// Configuração
			await client.connect();
			const db = await client.db(process.env.DBNAME);
			const collection = await db.collection(process.env.DBCOLLECTION);
			index();

			// Inserir
			const inserirResultado = await collection.insertOne({titulo: dados.titulo, conteudo: dados.conteudo});
			return inserirResultado;
		}catch(err) {
			console.log(err);
		}finally {
			client.close();
		}
	}

	// Buscar todos
	async function readAll(){
		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);
			index();

			// Função
			const buscarTodos = await collection.find({}).toArray();
			return buscarTodos;
		}catch(err) {
			console.log(err);
		}finally {
			client.close();
		}
	}

	// Busca específica
	async function readOne(id){
		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);
			index();

			// Função
			const filtro = await collection.find({_id: ObjectId(id)}).toArray();
			return filtro;
		}catch(err) {
			console.log(err);
		}finally {
			client.close();
		}

	}

	// Busca
	async function search(pesquisa){
		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);
			index();

			// Função
			const filtro = await collection.find({$text: {$search: pesquisa}}).toArray();
			return filtro;
		}catch(err) {
			console.log(err);
		}finally {
			client.close();
		}
	}

	// Atualizar
	async function update(note){
		try{
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);
			index();

			// Função
			const filtro = await collection.updateOne({_id: ObjectId(note.id)}, {$set: {titulo: note.titulo, conteudo: note.conteudo}});
			return filtro;
		}catch(err) {
			console.log(err);
		}finally{
			client.close();
		}
	}

	// Deletar
	async function deletar(id){
		try{
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);
			index();

			// Função
			const filtro = await collection.deleteMany({_id: ObjectId(id)});
			return 'Deletado!';
		}catch(err) {
			console.log(err);
		}finally{
			client.close();
		}
	}

export {create, readAll, readOne, search, update, deletar};

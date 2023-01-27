// Importando módulos
import {client} from '../db/mongo.mjs';
import * as dotenv from 'dotenv';
import {ObjectId} from 'mongodb';


// CRUD
	// Adicionar anotação
	async function create(dados){
		try {
			// Configuração
			await client.connect();
			const db = await client.db(process.env.DBNAME);
			const collection = await db.collection(process.env.DBCOLLECTION);

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
	async function readOne(pesquisa){
		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);

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
	async function update(pesquisa, atualizado){
		try{
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);

			// Função
			const filtro = await collection.updateOne({titulo: pesquisa}, {$set: {titulo: atualizado}});
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

			// Função
			const filtro = await collection.deleteMany({_id: ObjectId(id)});
			return 'Deletado!';
		}catch(err) {
			console.log(err);
		}finally{
			client.close();
		}
	}

export {create, readAll, readOne, update, deletar};

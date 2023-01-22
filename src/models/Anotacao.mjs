// Importando módulos
import {client} from '../db/mongo.mjs';
import * as dotenv from 'dotenv';


// CRUD
	// Adicionar anotação
	async function create(dados){
		try {
			// Configuração
			await client.connect();
			const db = await client.db(process.env.DBNAME);
			const collection = await db.collection(process.env.DBCOLLECTION);

			// Inserir
			const inserirResultado = await collection.insertOne([{dados}]);
			return inserirResultado;
		}catch {
			console.log("Falha ao salvar!");
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
		}catch {
			console.log("Falha ao buscar!");
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
		}catch(e) {
			console.log("Falha ao buscar!");
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
		}catch {
			console.log("Erro ao atualizar");
		}finally{
			client.close();
		}
	}

	// Deletar
	async function deletar(pesquisa){
		try{
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);

			// Função
			const filtro = await collection.deleteMany({titulo: pesquisa});
			return 'Deletado!'
		}catch {
			console.log("Erro ao deletar!");
		}finally{
			client.close();
		}
	}

export {create, readAll, readOne, update, deletar};

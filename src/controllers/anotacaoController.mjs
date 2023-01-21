// Importando módulos
import {client} from "../db/mongo.mjs";
import * as dotenv from "dotenv";

// Configurações
dotenv.config();

// CRUD
	// Adicionar anotação
	const add = async (req, res) => {
		// Dados
		const {anotTitulo, anotConteudo} = req.body;

		try {
			// Configuração
			await client.connect();
			const db = await client.db(process.env.DBNAME);
			const collection = await db.collection(process.env.DBCOLLECTION);

			// Inserir
			const inserirResultado = await collection.insertMany([{titulo: anotTitulo, conteudo: anotConteudo}]);
			res.status(200).json(inserirResultado);
		}catch {
			res.status(400).send("Falha ao salvar!");
		}finally {
			client.close();
		}
	}

	// Buscar todas
	const list = async (req, res) => {
		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);

			// Função
			const buscarTodos = await collection.find({}).toArray();
			res.status(200).json(buscarTodos);
		}catch {
			res.status(400).send("Falha ao buscar!");
		}finally {
			client.close();
		}
	}

	// Busca específica
	const busca = async (req, res) => {
		const {pesquisa} = req.body;

		try {
			// Configurações
			await client.connect();
			const db = client.db(process.env.DBNAME);
			const collection = db.collection(process.env.DBCOLLECTION);

			// Função
			const filtro = await collection.find({$text: {$search: pesquisa}}).toArray();
			res.status(200).json(filtro);
		}catch(e) {
			console.log(e.message, e.code);
			res.status(400).send("Falha ao buscar!");
		}finally {
			client.close();
		}

	}

export {add, list, busca};

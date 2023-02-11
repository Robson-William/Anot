// Importando módulos
import {client} from '../db/mongo.mjs';
import * as dotenv from 'dotenv';

// Configurando
dotenv.config();

const Schema = client.Schema;
const ObjectId = Schema.ObjectId;

// Model
const UserSchema = new Schema ({
	nome: String,
	usuario: String,
	senha: String
});

const User = UserSchema.model('Usuario', UserSchema);

// CRUD
	// Adicionar usuário
	async function create(dados){
		try {
			const novo = User({
				nome: dados.nome,
				usuario: dados.usuario,
				senha: dados.passwd
			})

			const inserirResultado = await novo.save();
			return inserirResultado;
		} catch(err){
			console.log(err);
		}
	}

	// Buscar todos os usuários
	async function readAll(){
		try {
			const resultadoBusca = await User.find({});

			return resultadoBusca;
		} catch(err){
			console.log(err);
		}
	}

	// Buscar um usuário específico
	async function readOne(id){
		try {
			const resultadoBusca = await User.find({_id: id});

			return resultadoBusca;
		} catch(err){
			console.log(err);
		}
	}

	// Buscar por usuário
	async function readByUser(user){
		try {
			const resultadoBusca = await User.find(usuario: user.usuario);

			return resultadoBusca;
		} catch(err){
			console.log(err);
		}
	}

	// Buscar usuário por texto
	async function search(pesquisa){
		try {
			const resultadoBusca = await User.find({$text: {$search: pesquisa}}, {score: {$meta: 'textScore'}});

			return resultadoBusca;
		} catch (err){
			console.log(err);
		}
	}

	// Atualizar dados do usuário
	async function update(user){
		try{
			const resultadoUpdate = await User.update({_id: user.id}, {$set: {nome: user.nome, usuario: user.usuario, senha: user.password}});

			return resultadoUpdate;
		} catch (err){
			console.log(err);
		}
	}

	// Excluir todos os usuários
	async function deleteAll(id){
		try{
			const resultadoDelete = await User.delele({});

			return resultadoDelete;
		} catch (err){
			console.log(err);
		}
	}

	// Excluir um usuário específico
	async function deleteOne(id){
		try{
			const resultadoDelete = await User.delete({_id: id});

			return resultadoDelete;
		} catch(err) {
			console.log(err);
		}
	}

export {create, readOne, readAll, readByUser, search, update, deleteAll, deleteOne};

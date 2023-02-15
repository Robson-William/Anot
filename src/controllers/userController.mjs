// Importando módulos
import * as User from '../models/Usuarios.mjs';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Configurando
dotenv.config();

// Frontend
	// Página de cadastro
	const create = (req, res) => {
		res.render('users/signup');
	}

	// Página de login
	const signin = (req, res) => {
		res.render('users/signin');
	}

	// Signout
	const signout = (req, res) => {
		req.session.destroy();

		res.clearCookie('access_token');
		res.redirect('/');
	}

// Backend
 // Adicionar usuário
 const add = async (req, res) => {
 	const {nome, usuario, senha} = req.body;
		
	try {
		const encrypt = await bcrypt.hash(senha, Number(process.env.BCRYPT_ROUNDS));

		const novoUser = {nome, usuario, senha: encrypt};

		const user = await User.create(novoUser);

		res.redirect('/login');
	} catch(err){
		console.log(err);
	}
 }

 // Autenticar
 const authenticate = async (req, res) => {
	try {
		const {usuario, senha} = req.body;

		const user = await User.readByUser(usuario);

		const match = await bcrypt.compare(senha, user.senha);

		if(match){
			const token = await jwt.sign(
				{userId: user._id},
				process.env.SECRET,
				{ expiresIn: 3600 }
			)

			const tokenBearer = `Bearer ${token}`;

			req.session.user = user;

			res.cookie('access_token', tokenBearer, {maxAge: 3600000});
			res.set('Authorization', tokenBearer);
			res.redirect('/');
		} else {
			console.log('Senha inválida!');
			res.redirect('/login');
		}
	} catch(err){
		console.log(err);
	}
 }

export {create, signin, signout, add, authenticate};

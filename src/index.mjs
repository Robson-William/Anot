// Importando módulos
import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/index.mjs';
import nunjucks from 'nunjucks';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// Configurações
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(logger('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'html');

app.use(session({
		secret: process.env.SECRET,
		name: 'session',
		resave: false,
		saveUninitialized: true,
		cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
	}
))

nunjucks.configure('src/views', {
	autoescape: true,
	express: app
})

app.use(router);

// Executar api
app.listen(process.env.PORT, console.log('O aplicativo está rodando.'));

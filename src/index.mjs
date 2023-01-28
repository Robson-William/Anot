// Importando módulos
import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/index.mjs';
import nunjucks from 'nunjucks';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

// Configurações
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(logger('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(router);
app.set('view engine', 'html');

nunjucks.configure('src/views', {
	autoescape: true,
	express: app
})

// Executar api
app.listen(process.env.PORT, console.log('O aplicativo está rodando.'));

// Importando módulos
import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/index.js';

// Configurações
dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(express.JSON());
app.use(router);

// Executar api
app.listen(process.env.PORT, console.log('O aplicativo está rodando.'));

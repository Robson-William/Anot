// Importando módulos
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

// Configurações
dotenv.config();

// Conectar ao MongoDB
const client = new MongoClient(process.env.MONGO);

// Exportar módulo
export {client};

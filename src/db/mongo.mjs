// Importando módulos
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Configurações
dotenv.config();

// Conectar ao MongoDB
const client = await mongoose.connect(process.env.MONGO_HOST + process.env.MONGODB_NAME);

// Exportar módulo
export {client};

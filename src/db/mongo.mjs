// Importando módulos
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Configurações
dotenv.config();

// Conectar ao MongoDB
const client = await mongoose.connect(process.env.MONGO + process.env.ANOT);

// Exportar módulo
export {client};

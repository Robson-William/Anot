// Importando módulos
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

// Configurando
dotenv.config();

let driver = neo4j.driver(
	process.env.NEO4J_HOST,
	neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

export {driver};

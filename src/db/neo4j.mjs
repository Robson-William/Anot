// Importando módulos
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

// Configurando
dotenv.config();

let driver = neo4j.driver(
	process.env.NEO4JHOST,
	neo4j.auth.basic(process.env.NEO4JUSER, process.env.NEO4JPASSWORD)
)

export {driver};

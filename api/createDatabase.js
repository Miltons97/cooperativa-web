const { Client } = require('pg');

// Conexión temporal para crear la base de datos
const client = new Client({
    user: 'postgres',         // tu usuario de PostgreSQL
    host: 'localhost',
    password: 'sosa123',  // tu contraseña
    port: 5432
});

async function createDB() {
    try {
        await client.connect();
        await client.query(`CREATE DATABASE institucion_db`);
        console.log('✅ Base de datos creada correctamente');
    } catch (error) {
        console.error('❌ Error creando la base de datos:', error);
    } finally {
        await client.end();
    }
}

createDB();

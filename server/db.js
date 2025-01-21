// config/db.js
const mariadb = require('mariadb');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos
const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: 'u163464070_taskmanager_db',
    connectionLimit: 20
});

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("MariaDB is connected");
        connection.release(); // Libera la conexión cuando termines de usarla
    } catch (err) {
        console.error("Error de conexión:", err.message);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
};

// Exporta la función de conexión
module.exports = connectDB;

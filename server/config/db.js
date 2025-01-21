const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD, 
    database: 'u163464070_taskmanager_db'
});

const connectDB = () => {
    db.connect((err) => {
        if (err) {
            console.error("Error de conexión:", err.message);
            process.exit(1);
        }
        console.log("MySQL is connected");
    });
};

module.exports = { connectDB, db };


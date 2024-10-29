import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// Give the correpondente path for the config to the env file
dotenv.config({path: 'credentials.env'});

// Function to connect to the MySQL database.
export async function connectDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,  // The host of your database
        user: process.env.DB_USER, // Your database user
        password: process.env.DB_PASSWORD, // Your database password
        database: process.env.DB_NAME // Your database name
    });

    return connection;
}

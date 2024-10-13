import mysql from 'mysql2/promise';

// Função para conectar ao banco de dados MySQL
export async function connectDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',  // O host do seu banco de dados
        user: 'seu_usuario', // Seu usuário do banco de dados
        password: 'sua_senha', // Sua senha do banco de dados
        database: 'seu_banco_de_dados' // Nome do seu banco de dados
    });

    return connection;
}

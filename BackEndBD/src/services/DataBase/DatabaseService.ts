import { Connection, RowDataPacket } from 'mysql2/promise';

export class DatabaseService {
    private db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    async callProcedure<T extends RowDataPacket[]>(procedureName: string, params: object): Promise<T> {
        const paramValues = Object.values(params);
        const placeholders = paramValues.map(() => '?').join(', ');
        const sql = `CALL ${procedureName}(${placeholders})`;

        const [result] = await this.db.execute<T>(sql, params);

        return result;
    }
    
    async beginTransaction(): Promise<void> {
        await this.db.beginTransaction();
    }

    async commit(): Promise<void> {
        await this.db.commit();
    }

    async rollback(): Promise<void> {
        await this.db.rollback();
    }
}
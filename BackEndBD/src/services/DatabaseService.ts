import { Connection, RowDataPacket } from 'mysql2/promise';

export class DatabaseService {
    private db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    async callProcedure<T extends RowDataPacket[]>(procedureName: string, params: any[] = []): Promise<T> {
        const placeholders = params.map(() => '?').join(', ');
        const sql = `CALL ${procedureName}(${placeholders})`;

        const [result] = await this.db.execute<T>(sql, params);

        return result;
    }

    async getModelParams<T>(model: T){
        //TODO Transform Model o params
    }
}
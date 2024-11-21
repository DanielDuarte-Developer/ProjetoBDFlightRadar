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
        const [result] = await this.db.execute<T>(sql, paramValues);

        return result;
    }

    async getProcedureParams(procedureName: string): Promise<any[]> {
        const sql = `
            SELECT PARAMETER_NAME, DATA_TYPE
            FROM information_schema.parameters
            WHERE SPECIFIC_NAME = ?
        `;
    
        const [result] = await this.db.execute(sql, [procedureName]);
        return result as [any];
    }

    constructParams(procedureParams, values?: Record<string, any>){
        const paramValues = procedureParams.map(paramValue => paramValue.PARAMETER_NAME);
        const defaultParams = paramValues.reduce((acc, paramName) => {
            acc[paramName] = null;
            return acc;
        }, {} as Record<string, any>);
        
        if (values) {
            for (const paramName in values) {
                if (defaultParams.hasOwnProperty(paramName)) {
                    defaultParams[paramName] = values[paramName]; // Atualiza valores existentes
                }
            }   
        }
        return defaultParams;
    }

}
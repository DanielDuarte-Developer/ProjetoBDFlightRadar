import { Connection, RowDataPacket } from 'mysql2/promise';

export class DatabaseService {
    private db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    async callProcedure<T extends RowDataPacket[]>(procedureName: string, params: object): Promise<T> {
        var result
        try{
            const paramValues = Object.values(params);
            const placeholders = paramValues.map(() => '?').join(', ');

            const sql = `CALL ${procedureName}(${placeholders})`;
           
            [result] = await this.db.execute<T>(sql, paramValues);
        }
        catch(error){
            console.log(error)
            throw new Error("Error Trying to call procedure " + procedureName);
        }
        return result;
    }

    async getValuesConstructPlane(flightIdInput){
        try{
            const sql = `CALL getMapPlaneValues(?,?,?,?,?)`;
            const [rows, fields] = await this.db.execute<any>(sql,
                [
                flightIdInput,
                null,
                null,
                null,
                null]
            )
            return rows[0];
        }catch(error){
            //console.log(error)
            throw new Error("Error trying to get values to construct airplane",error)
        }
    }
    async getFlightCardInfo(flightId){
        try{
            const sql = `CALL getFlightCardInfo(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const result = await this.db.execute<any>(sql, [
                flightId,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ])
            return result[0][0]
        }catch(error){
            console.log(error)
            throw new Error("Error trying to get flight card information",error)
        }
    }
    // Auxiliar Fuctions
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

    async mapItemToParams(commandStoredProcedure, item){
        //item {Id: "C1", CountryName: "Ns"}
        const procedureParams = await this.getProcedureParams(commandStoredProcedure);

        const mappedParams = {};
        // Itera sobre os parâmetros da stored procedure e mapeia os valores do item
        for (let param of procedureParams) {
            const paramNameWithoutPrefix = param.PARAMETER_NAME.slice(2)
            // Verifica se o item tem a chave correspondente ao parâmetro
            if (item.hasOwnProperty(paramNameWithoutPrefix)) {
                mappedParams[param.PARAMETER_NAME] = item[paramNameWithoutPrefix];
            } else {
                // Se o campo não existe no item, pode definir como null ou outro valor padrão
                mappedParams[param.PARAMETER_NAME] = null;
            }
        }
        return mappedParams
    }

}
import { DatabaseService } from "../../services/DataBase/DatabaseService";
import { IBaseSqlRepository } from "../interfaces/sql/ibase.sql.repository";

export class BaseSqlRepository<T> implements IBaseSqlRepository<T>{
    protected dbService: DatabaseService;
    protected commandStoredProcedure: string;
    protected getDataProcedure: string;

    constructor(dbService: DatabaseService, commandStoredProcedure: string, getDataProcedure: string) {
        this.dbService = dbService;
        this.commandStoredProcedure = commandStoredProcedure;
        this.getDataProcedure = getDataProcedure;
    }

    async AddAsync(item:T, userId: string){
        try{
            const params = await this.dbService.mapItemToParams(this.commandStoredProcedure, item)
            params['p_UserId'] = userId
            params['p_SysStatus'] = "A"

            return await this.dbService.callProcedure(this.commandStoredProcedure, params)

        }catch(error){
            throw new Error(error.message || 'Error trying to add an new record')
        }
        
    }

    async UpdateAsync(item:T, userId: string) {
        try{
            const params = await this.dbService.mapItemToParams(this.commandStoredProcedure, item)
            params['p_UserId'] = userId
            params['p_SysStatus'] = "A"

            const result = await this.dbService.callProcedure(this.commandStoredProcedure, params)

            // Verifique o retorno de `p_Id` após a execução, especialmente em caso de `INSERT`
            if (!result || !result[0] || result[0].p_Id === null) {
                throw new Error('Error trying to update the record: No records modified or error during insertion');
            }
        }catch(error){
            throw new Error(error.message || 'Error trying to update the record')
        }
        
    }

    async DeleteAsync(id: string, userId: string){
        try{
            const params = await this.dbService.mapItemToParams(this.commandStoredProcedure, "")
            params['p_Id'] = id;
            params['p_UserId'] = userId;
            params['p_SysStatus'] = 'X';
            
            await this.dbService.callProcedure(this.commandStoredProcedure, params)
        }catch(error){
            throw new Error(error.message || 'Error trying to delete the record')
        }
    }

    async GetAsync(id): Promise<T> {
        try{
            const procedureParams = await this.dbService.getProcedureParams(this.getDataProcedure);
            const params = await this.dbService.constructParams(procedureParams)
            
            params['p_Id'] = id
            
            const result = await this.dbService.callProcedure(this.getDataProcedure, params)

            if (!result || result.length === 0) {
                throw new Error('No record found with the specified ID.');
            }

            // Returns the id if result as anything if not will send null
            return result[0] as T;
        }catch(error){
            throw new Error(error.message || 'Error trying to get the record by id.')
        }
    }

}
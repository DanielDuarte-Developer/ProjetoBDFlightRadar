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

    async AddAsync(item:T, userId: string): Promise<T> {
        const params =  {
            ...item,
            P_userId : userId
        }

        const result = await this.dbService.callProcedure(this.commandStoredProcedure, params)
        
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }

    async UpdateAsync(item:T, userId: string): Promise<T> {
        const params = {
            ...item,
            P_userId : userId
        }
        const result = await this.dbService.callProcedure(this.commandStoredProcedure, params)
        
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }

    async DeleteAsync(id: string, userId: string): Promise<T> {
        const params = {
            p_Id : id,
            p_Status : 'X',
            p_UserId : userId,
            p_RowVersion : ''
        }
        const result = await this.dbService.callProcedure(this.commandStoredProcedure, params)
        
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }

    async GetAsync(id): Promise<T> {
        const params = {
            P_Id : id
        }
        const result = await this.dbService.callProcedure(this.getDataProcedure, params)
        // Returns the id if result as anything if not will send null
        return result[0] as T;
    }
}
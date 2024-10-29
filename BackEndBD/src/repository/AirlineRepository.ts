import { Airline } from "../model/airline.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirlineRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirlines(params:Airline[]): Promise<Airline[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Airline[]>('spGetAirlines', params);
    }

    async insertUpdateOrDeleteAirline(params:Airline[]): Promise<string> {
        const result = await this.dbService.callProcedure('spInsertUpdateDeleteAirline', params)
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }
}
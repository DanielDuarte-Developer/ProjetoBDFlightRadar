import { Airport } from "../model/airport.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirportRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Airport[]): Promise<Airport[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Airport[]>('spGetAiports', params);
    }

    async insertUpdateOrDeleteAirport(params:Airport[]): Promise<void> {
        const result = await this.dbService.callProcedure('spInsertUpdateDeleteAirport', params);
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }
}
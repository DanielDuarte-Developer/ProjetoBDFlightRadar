import { Airplane } from "../model/airplane.model";
import { Airport } from "../model/airport.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirplaneRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Airplane[]): Promise<Airplane[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Airplane[]>('spGetAirplanes', params);
    }

    async insertUpdateOrDeleteAirport(params:Airplane[]): Promise<string> {
        const result = await this.dbService.callProcedure('spInsertUpdateDeleteAirplane', params);
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }
}
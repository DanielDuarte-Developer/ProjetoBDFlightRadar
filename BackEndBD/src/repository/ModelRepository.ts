import { Airport } from "../model/airport.model";
import { DatabaseService } from "../services/DatabaseService";

export class ModelRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Airport[]): Promise<Airport[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Airport[]>('spGetAiports', params);
    }

}
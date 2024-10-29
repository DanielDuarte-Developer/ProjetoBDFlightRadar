import { AirportAirplaneFlight } from "../model/airportairplaneflight.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirportAirplaneFlightRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:AirportAirplaneFlight[]): Promise<AirportAirplaneFlight[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<AirportAirplaneFlight[]>('spGetAirportAirplaneFlights', params);
    }

    async insertUpdateOrDeleteAirport(params:AirportAirplaneFlight[]): Promise<string> {
        const result = await this.dbService.callProcedure('spInsertUpdateDeleteAirportAirplaneFlight', params);
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }
}
import { Flight } from "../model/flight.model";
import { DatabaseService } from "../services/DatabaseService";

export class FlightRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Flight[]): Promise<Flight[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Flight[]>('spGetFlights', params);
    }

    async insertUpdateOrDeleteAirport(params:Flight[]): Promise<void> {
        const result = await this.dbService.callProcedure('spInsertUpdateDeleteFlight',params);
        // Returns the id if result as anything if not will send null
        return result.length > 0 ? result[0].p_Id : null;
    }
}
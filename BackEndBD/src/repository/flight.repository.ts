import { Flight } from "../model/flight.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IFlightRepository } from "./interfaces/repositories/iflight.repository";

export class FlightRepository extends BaseSqlRepository<Flight> implements IFlightRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteFlight', 'spGetFlights')
        this.dbService = dbService;
    }

    ListFlights(
        idFlight: string,
        flightCode: string,
        stateFlight: string,
        passengers: number,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Flight[]> {
        const filters = {
            p_Id : idFlight,
            p_FlightCode : flightCode,
            p_Passengers : passengers,
            p_State : stateFlight,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Flight[]>('spGetFlights', filters);
    }
}
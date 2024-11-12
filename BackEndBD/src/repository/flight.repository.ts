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
        idFlight: string = '',
        idObservation : string = '',
        idAirplane: string = '',
        flightCode: string = '',
        passengers: number = 0,
        sortField: string = '',
        sortAscending: boolean = false): Promise<Flight[]> {
        const filters = {
            p_Id : idFlight || null,
            p_IdObservations : idObservation || null,
            p_IdAirplane : idAirplane || null,
            p_FlightCode : flightCode || null,
            p_Passengers : passengers || null,
            p_sortField: sortField || null,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Flight[]>('spGetFlights', filters);
    }
}
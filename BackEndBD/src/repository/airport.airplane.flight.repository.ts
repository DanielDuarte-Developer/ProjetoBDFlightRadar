import { AirportAirplaneFlight } from "../model/airportairplaneflight.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IAirportAirplaneFlightRepository } from "./interfaces/repositories/iairport.airplane.flight.repository";

export class AirportAirplaneFlightRepository extends BaseSqlRepository<AirportAirplaneFlight> implements IAirportAirplaneFlightRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirportAirplaneFlight', 'spGetAirportAirplaneFlights')
        this.dbService = dbService;
    }

    ListAirportAirplaneFlights(
        idAirport: string,
        idFlight: string,
        idPlane: string,
        departure: string,
        arrival: string,
        status: string,
        sortField: string,
        sortAscending: boolean) {
        const filters = {
            p_IdAirport : idAirport,
            p_IdFlight : idFlight,
            p_IdAirplane : idPlane,
            p_Departure : departure,
            p_Arrival : arrival,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<AirportAirplaneFlight[]>('spGetAirportAirplaneFlights', filters);
    }
}
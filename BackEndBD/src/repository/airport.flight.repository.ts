import { AirportFlight } from "../model/airportflight.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IAirportFlightRepository } from "./interfaces/repositories/iairport.flight.repository";

export class AirportFlightRepository extends BaseSqlRepository<AirportFlight> implements IAirportFlightRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirportFlight', 'spGetAirportFlights')
        this.dbService = dbService;
    }

    async ListAirportFlights(
        idAirport: string = '',
        idFlight: string = '',
        timeMarker: string = '',
        sortField: string = '',
        sortAscending: boolean = false) {
            try{
                const procedureParams = await this.dbService.getProcedureParams('spGetAirportFlights');
        
                const filters = this.dbService.constructParams(procedureParams, {
                    p_IdAirport: idAirport || null,
                    p_IdFlight: idFlight || null,
                    p_TimeMarker: timeMarker || null,
                    p_sortField: sortField || null,
                    p_sortAscending: sortAscending ? 'ASC' : 'DESC',
                })
                //Give the procedure name and the parameters
                return this.dbService.callProcedure<AirportFlight[]>('spGetAirportFlights', filters);
            }catch(error){
                throw new Error("Error trying to list AirportFlights",error)
            }
    }

    async GetValuesConstructPlane(flightId){
        try{
            return await this.dbService.getValuesConstructPlane(flightId);
        }catch(error){
            console.log(error)
            throw new Error("Error trying to get values to construct airplane",error)
        }
    }
    async GetFlightCardInfo(flightId){
        try{
            return await this.dbService.getFlightCardInfo(flightId);
        }catch(error){
            console.log(error)
            throw new Error("Error trying to get flight card information",error)
        }
    }
}
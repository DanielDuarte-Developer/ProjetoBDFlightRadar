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

    async ListFlights(
        idFlight: string = '',
        idObservation : string = '',
        idAirplane: string = '',
        flightCode: string = '',
        passengers: number = 0,
        sortField: string = '',
        sortAscending: boolean = false): Promise<Flight[]> {
            try{
                const procedureParams = await this.dbService.getProcedureParams('spGetFlights');
        
                const filters = this.dbService.constructParams(procedureParams,{
                    p_Id : idFlight || null,
                    p_IdObservations : idObservation || null,
                    p_IdAirplane : idAirplane || null,
                    p_FlightCode : flightCode || null,
                    p_Passengers : passengers || null,
                    p_sortField : sortField || null,
                    p_sortAscending: sortAscending ? 'ASC': 'DESC',
                })
                //Give the procedure name and the parameters
                return this.dbService.callProcedure<Flight[]>('spGetFlights', filters);
            }catch(error){
                throw new Error("Error trying to list Flights",error)
            }
    }
}
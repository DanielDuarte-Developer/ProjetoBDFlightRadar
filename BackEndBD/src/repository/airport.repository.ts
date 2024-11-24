import { Airport } from "../model/airport.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IAirportRepository } from "./interfaces/repositories/iairport.repository";

export class AirportRepository extends BaseSqlRepository<Airport> implements IAirportRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirport', 'spGetAiports')
        this.dbService = dbService;
    }
    async ListAirports(
        idAirport: string = '',
        idCountry: string = '',
        airportName: string = '',
        airportCode: string = '',
        airportLocationName: string = '',
        sortField:string = '', 
        sortAscending: boolean = false): Promise<Airport[]> {
            try{
                const procedureParams = await this.dbService.getProcedureParams('spGetAiports');
                
                const filters = this.dbService.constructParams(procedureParams, { 
                    p_Id: idAirport || null,
                    p_IdCountry: idCountry || null,
                    p_AirportName: airportName || null,
                    p_AirportCode : airportCode || null,
                    p_LocationName : airportLocationName || null,
                    p_sortField : sortField || null,
                    p_sortAscending: sortAscending ? 'ASC': 'DESC',
                });
                //Give the procedure name and the parameters
                return this.dbService.callProcedure<Airport[]>('spGetAiports', filters);
            }catch(error){
                throw new Error("Error trying to list Airports",error)
            }
        
    }
}
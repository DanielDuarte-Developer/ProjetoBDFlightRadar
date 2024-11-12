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
    ListAirports(
        idAirport: string,
        idCountry: string,
        airportName: string,
        airportCode: string,
        airportLocationName: string,
        status: string, 
        sortField:string, 
        sortAscending: boolean): Promise<Airport[]> {
        const filters = {
            p_Id: idAirport,
            p_IdCountry: idCountry,
            p_AirportName: airportName,
            p_AirportCode : airportCode,
            p_LocationName : airportLocationName,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Airport[]>('spGetAiports', filters);
    }
}
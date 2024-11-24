import { Airline } from "../model/airline.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IArlineRepository } from "./interfaces/repositories/iarline.repository";

export class AirlineRepository extends BaseSqlRepository<Airline> implements IArlineRepository{
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirline', 'spGetAirlines');
        this.dbService = dbService;
    }

    async ListArlines(
        idAirline: string = '', 
        idCountry: string = '', 
        airlineName: string = '',
        airlineCode: string = '',
        sortField: string = 'id_airline',
        sortAscending: boolean = false): Promise<Airline[]> {
            try{
                const procedureParams = await this.dbService.getProcedureParams('spGetAirlines');
                
                const filters = this.dbService.constructParams(procedureParams, { 
                    p_Id :idAirline || null,
                    p_IdCountry : idCountry || null,
                    p_arlineName : airlineName || null,
                    p_arlineCode : airlineCode || null,
                    p_sortField : sortField || null,
                    p_sortAscending: sortAscending ? 'ASC': 'DESC',
                });
                
                //Give the procedure name and the parameters
                return this.dbService.callProcedure<Airline[]>('spGetAirlines', filters);
            }catch(error){
                throw new Error("Error trying to list Arlines",error)
            }
        
    }
}
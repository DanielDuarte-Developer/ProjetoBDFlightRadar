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
        const filters = {
            p_Id :idAirline || null,
            p_IdCountry : idCountry || null,
            p_arlineName : airlineName || null,
            p_arlineCode : airlineCode || null,
            p_sortField : sortField || null,
            p_sortAscending: sortAscending
        } 
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Airline[]>('spGetAirlines', filters);
    }
}
import { Airline } from "../model/airline.model";
import { DatabaseService } from "../services/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IArlineRepository } from "./interfaces/repositories/iarline.repository";

export class AirlineRepository extends BaseSqlRepository<Airline> implements IArlineRepository{
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirline', 'spGetAirlines');
        this.dbService = dbService;
    }

    async ListArlines(
        idAirline: string, 
        idCountry: string, 
        arlineName: string,
        arlineCode: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Airline[]> {
        const filters = {
            p_Id :idAirline,
            p_IdCountry : idCountry,
            p_arlineName : arlineName,
            p_arlineCode : arlineCode,
            p_Status : status,
            p_sortField : sortField,
            p_sortAscending: sortAscending
        } 
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Airline[]>('spGetAirlines', filters);
    }
}
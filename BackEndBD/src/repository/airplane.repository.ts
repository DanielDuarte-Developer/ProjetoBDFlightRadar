import { Airplane } from "../model/airplane.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IAirplaneRepository } from "./interfaces/repositories/iairplane.repository";

export class AirplaneRepository  extends BaseSqlRepository<Airplane> implements IAirplaneRepository{
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteAirplane', 'spGetAirplanes')
        this.dbService = dbService;
    }

    ListAirplanes(
        idAirplane: string, 
        idModel: string, 
        idArline: string, 
        status: string, 
        sortField: string, 
        sortAscending: boolean): Promise<Airplane[]> {
        const filters = {
            p_Id : idAirplane ,
            p_IdModel : idModel,
            p_IdAirline : idArline,
            p_Status : status,
            p_sortField : sortField,
            p_sortAscending: sortAscending
        } 
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Airplane[]>('spGetAirplanes', filters);
    }
}
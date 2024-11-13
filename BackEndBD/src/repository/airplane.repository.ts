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

    async ListAirplanes(
        idAirplane: string = '', 
        idModel: string = '', 
        idArline: string = '', 
        sortField: string = 'id_airplane', 
        sortAscending: boolean = false): Promise<Airplane[]> {
        const filters = {
            p_Id : idAirplane || null,
            p_IdModel : idModel || null,
            p_IdAirline : idArline || null,
            p_sortField : sortField || null,
            p_sortAscending: sortAscending
        } 
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Airplane[]>('spGetAirplanes', filters);
    }
}
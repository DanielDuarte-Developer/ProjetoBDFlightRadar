import { Observation } from "../model/observation.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IObservationRepository } from "./interfaces/repositories/iobservation.repository";

export class ObservationRepository extends BaseSqlRepository<Observation> implements IObservationRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteObservation', 'spGetObservations')
        this.dbService = dbService;
    }

    async ListObservations(
        idObservation: string = '', 
        observationText: string = '',
        sortField: string = '', 
        sortAscending: boolean = false): Promise<Observation[]> {
        const filters = {
            p_Id : idObservation || null,
            p_ObservationText : observationText || null,
            p_sortField: sortField || null,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Observation[]>('spGetObservations', filters);
    }
}
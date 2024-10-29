import { Model } from "../model/model.model";
import { DatabaseService } from "../services/DatabaseService";

export class ModelRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Model[]): Promise<Model[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Model[]>('spGetModels', params);
    }

}
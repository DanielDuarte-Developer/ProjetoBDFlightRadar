import { Model } from "../model/model.model";
import { DatabaseService } from "../services/DatabaseService";

export class ModelRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository

}
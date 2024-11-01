import { Brand } from "../model/brand.model";
import { DatabaseService } from "../services/DatabaseService";

export class BrandRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository

}
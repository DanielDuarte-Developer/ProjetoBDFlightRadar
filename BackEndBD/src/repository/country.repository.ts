import { Country } from "../model/country.model";
import { DatabaseService } from "../services/DatabaseService";

export class CountryRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository

}
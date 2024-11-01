import { Airplane } from "../model/airplane.model";
import { Airport } from "../model/airport.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirplaneRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository
}
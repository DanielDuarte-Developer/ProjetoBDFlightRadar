import { Flight } from "../model/flight.model";
import { DatabaseService } from "../services/DatabaseService";

export class FlightRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository
}
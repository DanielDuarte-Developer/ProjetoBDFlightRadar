import { AirportAirplaneFlight } from "../model/airportairplaneflight.model";
import { DatabaseService } from "../services/DatabaseService";

export class AirportAirplaneFlightRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    //TODO Base Ariline Repository
}
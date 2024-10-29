import { Country } from "../model/country.model";
import { DatabaseService } from "../services/DatabaseService";

export class CountryRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params: Country[]): Promise<Country[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Country[]>('spGetCountries', params);
    }

}
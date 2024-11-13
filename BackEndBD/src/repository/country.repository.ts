import { Country } from "../model/country.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { ICountryRepository } from "./interfaces/repositories/icountry.repository";

export class CountryRepository extends BaseSqlRepository<Country> implements ICountryRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, '', 'spGetCountries')
        this.dbService = dbService;
    }

    async ListCountries(
        idCountry: string = '',
        countryName: string = '',
        sortField: string = '',
        sortAscending: boolean = false): Promise<Country[]> {
        const filters = {
            p_Id: idCountry || null,
            p_CountryName: countryName || null,
            p_sortField: sortField || null,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Country[]>('spGetCountries', filters);
    }

}
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

    ListCountries(
        idCountry: string,
        countryName: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Country[]> {
        const filters = {
            p_Id: idCountry,
            p_CountryName: countryName,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Country[]>('spGetCountries', filters);
    }

}
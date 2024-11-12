import { Country } from "../../../model/country.model";

export interface ICountryRepository {
    /**
     * List the countries records
     * 
     * @param idCountry The identifier
     * @param countryName Country name
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListCountries(
        idCountry: string,
        countryName: string,
        status: string,
        sortField: string,
        sortAscending: boolean) : Promise<Country[]>
}
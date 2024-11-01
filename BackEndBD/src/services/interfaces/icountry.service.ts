import { Country } from "../../model/country.model";

export interface ICountryService {
    /**
     * Adds a new country
     * 
     * @param country The object
     * @param userId The user identifier
     * 
     * @returns The add country
     */
    AddAsync(country: Country, userId: string): Promise<Country>

    /**
     * Updates a existent country
     * 
     * @param country The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated country
     */
    UpdateAsync(country: Country, id: string, userId: string): Promise<Country>

    /**
     * Delete a existent country
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if country was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string): Promise<boolean>

    /**
     * Get the country by id
     * 
     * @param id The identifier
     * 
     * @returns The country
     */
    GetByIdAsync(id: string): Promise<Country>

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
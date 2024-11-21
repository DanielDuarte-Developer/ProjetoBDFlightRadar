import { Country } from "../../model/country.model"
import { CountryDTO } from "../../model/dto/country.model.dto"

export interface ICountryService {
    /**
     * Adds a new country
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item: Country, userId: string)

    /**
     * Updates existent country
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item: Country, userId: string)

    /**
     * Delete an existent country
     * 
     * @param id The country identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)

    /**
     * Get country by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of country
     */
    GetByIdAsync(id: string): Promise<CountryDTO>

    /**
    * List the Country records
    * 
    * @param idCountry The identifier
    * @param countryName The country name
    * @param sortField Organize the data by sortField
    * @param sortAscending Organize ASC or DESC
    * 
    * @returns The DTO of airline
    */
    ListAsync(
        idCountry: string,
        countryName: string,
        sortField: string,
        sortAscending: boolean): Promise<CountryDTO[]>
}
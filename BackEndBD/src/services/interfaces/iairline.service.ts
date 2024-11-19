import { Airline } from "../../model/airline.model"
import { AirlineDTO } from "../../model/dto/airline.model.dto"

export interface IAirlineService {
    /**
     * Adds a new airline
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item:Airline, userId: string)

    /**
     * Updates a existent airline
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item:Airline, userId: string)

    /**
     * Deletes a existent airline
     * 
     * @param id The airline identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)

    /**
     * Get airline by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of airline
     */
    GetByIdAsync(id: String): Promise<AirlineDTO>

     /**
     * List the Arlines records
     * 
     * @param idAirline The identifier
     * @param idCountry Country identifier
     * @param airlineName Arline Name
     * @param airlineCode Arline Code
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns The DTO of airline
     */
    ListAsync(
        idAirline: string, 
        idCountry: string, 
        airlineName: string,
        airlineCode: string,
        sortField: string,
        sortAscending: boolean): Promise<AirlineDTO[]>
}
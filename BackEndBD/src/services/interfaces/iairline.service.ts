import { Airline } from "../../model/airline.model";

export interface IArlineService {
    /**
     * Adds a new airline
     * 
     * @param airline The object
     * @param userId The user identifier
     * 
     * @returns The add airline
     */
    AddAsync(airline: Airline, userId: string) : Promise<Airline>

    /**
     * Updates a existent airline
     * 
     * @param airline The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated airline
     */
    UpdateAsync(airline: Airline, id: string, userId: string): Promise<Airline>

    /**
     * Delete a existent airline
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if airline was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string) : Promise<boolean>

    /**
     * Get the airline by id
     * 
     * @param id The identifier
     * 
     * @returns The airline
     */
    GetByIdAsync(id: string): Promise<Airline>

    /**
     * List the Arlines records
     * 
     * @param idAirline The identifier
     * @param idCountry Country identifier
     * @param arlineName Arline Name
     * @param arlineCode Arline Code
     * @param status Registry Status 
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAsync(
        idAirline: string, 
        idCountry: string, 
        arlineName: string,
        arlineCode: string,
        status: string,
        sortField: string,
        sortAscending: boolean) : Promise<Airline[]>
}
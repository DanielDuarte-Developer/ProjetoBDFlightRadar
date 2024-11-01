import { Airport } from "../../model/airport.model";

export interface IAirportService {
    /**
     * Adds a new airport
     * 
     * @param airport The object
     * @param userId The user identifier
     * 
     * @returns The add airport
     */
    AddAsync(airport: Airport, userId: string): Promise<Airport>

    /**
     * Updates a existent airport
     * 
     * @param airport The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated airport
     */
    UpdateAsync(airport: Airport, id: string, userId: string): Promise<Airport>

    /**
     * Delete a existent airport
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if airport was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string): Promise<boolean>

    /**
     * Get the airport by id
     * 
     * @param id The identifier
     * 
     * @returns The airport
     */
    GetByIdAsync(id: string): Promise<Airport>

    /**
     * List the Airport records
     * 
     * @param idAirport The identifier
     * @param idCountry Country identifier
     * @param airportName Airport name
     * @param airportCode Airport Code
     * @param airportLocationName Aiport location name
     * @param locationLatitude Airport location latitude
     * @param locationLongitude Airport location longitude
     * @param status Registry Status 
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirports(
        idAirport: string, 
        idCountry: string, 
        airportName: string,
        airportCode: string,
        airportLocationName: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Airport[]>
}
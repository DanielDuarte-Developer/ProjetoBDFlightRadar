import { Flight } from "../../model/flight.model";

export interface IFlightService {
    /**
     * Adds a new flight
     * 
     * @param flight The object
     * @param userId The user identifier
     * 
     * @returns The add flight
     */
    AddAsync(flight: Flight, userId: string): Promise<Flight>

    /**
     * Updates a existent flight
     * 
     * @param flight The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated flight
     */
    UpdateAsync(flight: Flight, id: string, userId: string): Promise<Flight>

    /**
     * Delete a existent flight
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if flight was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string): Promise<boolean>

    /**
     * Get the flight by id
     * 
     * @param id The identifier
     * 
     * @returns The flight
     */
    GetByIdAsync(id: string): Promise<Flight>

    /**
     * List the flights records
     * 
     * @param idFlight The identifier
     * @param flightCode Flight code
     * @param stateFlight Flight state
     * @param passengers Flight passengers
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListFlights(
        idFlight: string,
        flightCode: string,
        stateFlight: string,
        passengers: number,
        status: string,
        sortField: string,
        sortAscending: boolean) : Promise<Flight[]>
}
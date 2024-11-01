import { AirportAirplaneFlight } from "../../model/airportairplaneflight.model";

export interface IAirportAirplaneFlightService {
    /**
     * Adds a new Airport_Airplane_Flight
     * 
     * @param airportAirplaneFlight The object
     * @param userId The user identifier
     * 
     * @returns The add Airport_Airplane_Flight
     */
    AddAsync(airportAirplaneFlight: AirportAirplaneFlight, userId: string): Promise<AirportAirplaneFlight>

    /**
     * Updates a existent Airport_Airplane_Flight
     * 
     * @param airportAirplaneFlight The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated Airport_Airplane_Flight
     */
    UpdateAsync(airportAirplaneFlight: AirportAirplaneFlight, id: string, userId: string): Promise<AirportAirplaneFlight>

    /**
     * Delete a existent Airport_Airplane_Flight
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if Airport_Airplane_Flight was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string): Promise<boolean>

    /**
     * Get the Airport_Airplane_Flight by id
     * 
     * @param id The identifier
     * 
     * @returns The Airport_Airplane_Flight
     */
    GetByIdAsync(id: string): Promise<AirportAirplaneFlight>

    /**
     * List the Airport_Airplane_Flight records
     * 
     * @param idAirport The identifier
     * @param idFlight Flight identifier
     * @param idPlane Plane identifier
     * @param departure Departure time
     * @param arrival Arrival time
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirportAirplaneFlights(
        idAirport: string,
        idFlight: string,
        idPlane: string,
        departure: string,
        arrival: string,
        status: string,
        sortField: string,
        sortAscending: boolean)
}
import { FlightDTO } from "../../model/dto/flight.model.dto"
import { Flight } from "../../model/flight.model"

export interface IFlightService {
    /**
     * Adds new flight
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item:Flight, userId: string)

    /**
     * Updates an existent flight
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item:Flight, userId: string)

    /**
     * Delete an existent flight
     * 
     * @param id The flight identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)
    
    /**
     * Get brand by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of flight
     */
    GetByIdAsync(id: string): Promise<FlightDTO>

    /**
     * List the flights records
     * 
     * @param idFlight The identifier
     * @param idObservation The observation identifier
     * @param idAirplane The Airplane identifier
     * @param flightCode Flight code
     * @param passengers Flight passengers
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns The DTO of flight
     */
    ListAsync(
        idFlight: string,
        idObservation : string,
        idAirplane : string,
        flightCode: string,
        passengers: number,
        sortField: string,
        sortAscending: boolean) : Promise<FlightDTO[]>
}
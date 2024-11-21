import { AirportFlight } from "../../model/airportflight.model"
import { AirportFlightDTO } from "../../model/dto/airport.flight.dto"

export interface IAirportFlightService {
    /**
     * Adds a new airport flight
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
     AddAsync(item:AirportFlight, userId: string)
 
     /**
      * Updates existent airport flight
      * 
      * @param item The item to update
      * @param userId The user identifier
      */
     UpdateAsync(item:AirportFlight, userId: string)
 
     /**
      * Delete an existent airport flight
      * 
      * @param id The airport flight identifier
      * @param userId The user identifier
      */
     DeleteAsync(id: string, userId: string)
     
     /**
      * Get airplane by id
      * 
      * @param id The identifier
      * 
      * @returns The DTO of airline
      */
     GetByIdAsync(id: string): Promise<AirportFlightDTO>

      /**
       * List the airport associated with the flights 
       * 
       * @param idAirport Airport identifier
       * @param idFlight Flight identifier
       * @param timeMarker Time of the departeur and destiny
       * @param sortField Organize the data by sortField
       * @param sortAscending Organize ASC or DESC
       * 
       * @returns The DTO airportFlight 
       */
     ListAsync(
        idAirport: string,
        idFlight: string,
        timeMarker: string,
        sortField: string,
        sortAscending: boolean): Promise<AirportFlightDTO[]>
 }
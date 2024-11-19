import { Airport } from "../../model/airport.model"
import { AirportDTO } from "../../model/dto/airport.model.dto"

export interface IAirportService {

  /**
   * Adds a new airport
   * 
   * @param item The item to add
   * @param userId The user identifier
   */
  AddAsync(item: Airport, userId: string)

  /**
   * Updates a existent airport
   * 
   * @param item The item to update
   * @param userId The user identifier
   */
  UpdateAsync(item: Airport, userId: string)

  /**
   * Deletes an existent airport 
   * 
   * @param id The airport identifier
   * @param userId The user identifier
   */
  DeleteAsync(id: string, userId: string)
  
  /**
   * Get airport by id
   * 
   * @param id The identifier
   * 
   * @returns The DTO of airport
   */
  GetByIdAsync(id: string): Promise<AirportDTO>

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
    * @param sortField Organize the data by sortField
    * @param sortAscending Organize ASC or DESC
    * 
    * @returns The DTO of airport
    */
  ListAsync(
    idAirport: string,
    idCountry: string,
    airportName: string,
    airportCode: string,
    airportLocationName: string,
    sortField: string,
    sortAscending: boolean): Promise<AirportDTO[]>
}
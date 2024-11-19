import { Airplane } from "../../model/airplane.model"
import { AirplaneDTO } from "../../model/dto/airplane.model.dto"

export interface IAirplaneService {
   /**
    * Adds a new airplane
    * 
    * @param item The item to add
    * @param userId The user identifier
    */
    AddAsync(item:Airplane, userId: string)

    /**
     * Updates existent airplane
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item:Airplane, userId: string)

    /**
     * Delete an existent airplane
     * 
     * @param id The airplane identifier
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
    GetByIdAsync(id: string): Promise<AirplaneDTO>

     /**
     * List the Airplane records
     * 
     * @param idAirplane The identifier
     * @param idModel Model identifier
     * @param idArline Arline identifier
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns The DTO of airline
     */
    ListAsync(
        idAirplane: string, 
        idModel: string, 
        idArline: string,
        sortField: string,
        sortAscending: boolean): Promise<AirplaneDTO[]>
}
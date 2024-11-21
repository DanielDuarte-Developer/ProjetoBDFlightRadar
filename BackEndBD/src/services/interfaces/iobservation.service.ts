import { ObservationDTO } from "../../model/dto/observation.model.dto"
import { Observation } from "../../model/observation.model"

export interface IObservationService {
    /**
     * Adds a new observation
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item: Observation, userId: string)

    /**
     * Updates existent observation
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item: Observation, userId: string)

    /**
     * Delete an existent observation
     * 
     * @param id The observation identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)

    /**
     * Get observation by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of observation
     */
    GetByIdAsync(id: string): Promise<ObservationDTO>

    /**
    * List the observation records
    * 
    * @param idObservation The identifier
    * @param observationText The observation
    * @param sortField Organize the data by sortField
    * @param sortAscending Organize ASC or DESC
    * 
    * @returns The DTO of airline
    */
    ListAsync(
        idObservation: string, 
        observationText: string,
        sortField: string, 
        sortAscending: boolean): Promise<ObservationDTO[]>
}
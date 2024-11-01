import { Airplane } from "../../model/airplane.model";

export interface IAirplaneService {
    /**
     * Adds a new airplane
     * 
     * @param airplane The object
     * @param userId The user identifier
     * 
     * @returns The add airplane
     */
    AddAsync(airplane: Airplane, userId: string) : Promise<Airplane>

    /**
     * Updates a existent airplane
     * 
     * @param airplane The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated airplane
     */
    UpdateAsync(airplane: Airplane, id: string, userId: string): Promise<Airplane>

    /**
     * Delete a existent airplane
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if airplane was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string) : Promise<boolean>

    /**
     * Get the airplane by id
     * 
     * @param id The identifier
     * 
     * @returns The airplane
     */
    GetByIdAsync(id: string): Promise<Airplane>

     /**
     * List the Airplane records
     * 
     * @param idAirplane The identifier
     * @param idModel Model identifier
     * @param idArline Arline identifier
     * @param status Registry Status 
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
     ListAirplanes ( 
        idAirplane: string, 
        idModel: string, 
        idArline: string,
        status: string,
        sortField: string,
        sortAscending: boolean) : Promise<Airplane[]>
}
import { Model } from "../../model/model.model";

export interface IModelService {
    /**
     * Adds a new model
     * 
     * @param model The object
     * @param userId The user identifier
     * 
     * @returns The add model
     */
    AddAsync(model: Model, userId: string) : Promise<Model>

    /**
     * Updates a existent model
     * 
     * @param model The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated model
     */
    UpdateAsync(model: Model, id: string, userId: string): Promise<Model>

    /**
     * Delete a existent model
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if model was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string) : Promise<boolean>

    /**
     * Get the model by id
     * 
     * @param id The identifier
     * 
     * @returns The model
     */
    GetByIdAsync(id: string): Promise<Model>

    /**
     * List all models
     * 
     * @param idModel The identifier
     * @param idBrand  The brand identifier
     * @param sitsNumber The model sits number
     * @param tare The model tare
     * @param grossWeight The model gross weight
     * @param payload The model payload
     * @param flightCrewMembers The model flight crew members
     * @param fuelQuantity The model fuel quantity
     * @param modelYear The model year
     * @param status Registry status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns models by filters
     */
    ListAsync(
        idModel: string, 
        idBrand: string, 
        sitsNumber: string, 
        tare: string, 
        grossWeight: string, 
        payload: number,
        flightCrewMembers: number, 
        fuelQuantity: number, 
        modelYear: number, 
        status: string, 
        sortField: string, 
        sortAscending: boolean) : Promise<Model[]>
}
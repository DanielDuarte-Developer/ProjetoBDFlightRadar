import { ModelDTO } from "../../model/dto/model.model.dto"
import { Model } from "../../model/model.model"

export interface IModelService {
    /**
     * Adds a new model
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item:Model, userId: string)

    /**
     * Updates a existent model
     * 
     * @param item The item to update
     * @param userId The user identifier
     */
    UpdateAsync(item:Model, userId: string)

    /**
     * Deletes and existent model
     * 
     * @param id The model identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)
    
    /**
     * Get brand by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of model
     */
    GetByIdAsync(id: string): Promise<ModelDTO>

    /**
     * List the models records
     * 
     * @param idModel The identifier
     * @param idBrand Brand identifier
     * @param sitsNumber Plane sits number 
     * @param tare Plane tare
     * @param grossWeight Plane gross weight 
     * @param payload Plane payload
     * @param flightCrewMembers Flight crew members
     * @param fuelQuantity Max plane fuel quantity 
     * @param modelYear Plane year
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns The DTO of model
     */
    ListAsync(
        idModel: string,
        idBrand : string,
        sitsNumber: string,
        tare: string,
        grossWeight: string,
        payload : number,
        flightCrewMembers : number,
        fuelQuantity : number,
        modelYear : number,
        sortField: string,
        sortAscending: boolean) : Promise<ModelDTO[]>
}
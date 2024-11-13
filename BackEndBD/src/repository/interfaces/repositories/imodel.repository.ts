import { Model } from "../../../model/model.model";

export interface IModelRepository {
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
     */
    ListModels(
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
        sortAscending: boolean) : Promise<Model[]>
}
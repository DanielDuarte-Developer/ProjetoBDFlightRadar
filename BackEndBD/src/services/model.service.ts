import { Model } from "../model/model.model";
import { ModelRepository } from "../repository/model.repository";
import { IModelService } from "./interfaces/imodel.service";

export class ModelService implements IModelService{
    protected modelRepository : ModelRepository
    
    constructor(modelRepository: ModelRepository){
        this.modelRepository = modelRepository;
    }

    AddAsync(model: Model, userId: string): Promise<Model> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(model: Model, id: string, userId: string): Promise<Model> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Model> {
        //TODO
        throw new Error("Method not implemented.");
    }

    ListAsync(idModel: string, idBrand: string, sitsNumber: string, tare: string, grossWeight: string, payload: number, flightCrewMembers: number, fuelQuantity: number, modelYear: number, status: string, sortField: string, sortAscending: boolean): Promise<Model[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}
import { Brand } from "../model/brand.model";
import { ModelDTO } from "../model/dto/model.model.dto";
import { Model } from "../model/model.model";
import { BrandRepository } from "../repository/brand.repository";
import { ModelRepository } from "../repository/model.repository";
import { IModelService } from "./interfaces/imodel.service";

export class ModelService implements IModelService{
    protected modelRepository: ModelRepository;
    protected brandRepository: BrandRepository;

    constructor(modelRepository: ModelRepository, brandRepository: BrandRepository) {
        this.modelRepository = modelRepository;
        this.brandRepository = brandRepository;
    }

    async AddAsync(item: Model, userId: string) {
        await this.modelRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Model, userId: string) {
        await this.modelRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.modelRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<ModelDTO> {
        const model: Model = await this.modelRepository.GetAsync(id);
        const brand: Brand = await this.brandRepository.GetAsync(model.IdBrand);

        return{
            Id: model.Id,
            BrandObj: brand,
            SitsNumber: model.SitsNumber,
            Tare: model.Tare,
            GrossWeight: model.GrossWeight,
            Payload: model.Payload,
            FlightCrewMembers: model.FlightCrewMembers,
            FuelQuantity: model.FuelQuantity,
            ModelYear: model.ModelYear
        }
    }

    async ListAsync(
        idModel: string = '', 
        idBrand: string = '', 
        sitsNumber: string = '', 
        tare: string = '', 
        grossWeight: string = '', 
        payload: number = 0, 
        flightCrewMembers: number = 0, 
        fuelQuantity: number = 0,
        modelYear: number = 0, 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<ModelDTO[]> {
        const models: Model[] = await this.modelRepository.ListModels(idModel,idBrand,sitsNumber,tare,grossWeight,payload,flightCrewMembers,fuelQuantity,modelYear,sortField,sortAscending)

        const modelDTOs = await Promise.all(
            models.map(async (model) => {
                const brand: Brand = await this.brandRepository.GetAsync(model.IdBrand);
                return{
                    Id: model.Id,
                    BrandObj: brand,
                    SitsNumber: model.SitsNumber,
                    Tare: model.Tare,
                    GrossWeight: model.GrossWeight,
                    Payload: model.Payload,
                    FlightCrewMembers: model.FlightCrewMembers,
                    FuelQuantity: model.FuelQuantity,
                    ModelYear: model.ModelYear
                }
            })
        );

        return modelDTOs
    }
}
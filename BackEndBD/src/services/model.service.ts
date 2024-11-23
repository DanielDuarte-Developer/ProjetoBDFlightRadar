import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { ModelDTO } from "../model/dto/model.model.dto";
import { Model } from "../model/model.model";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { ModelRepository } from "../repository/model.repository";
import { IModelService } from "./interfaces/imodel.service";

export class ModelService implements IModelService{
    protected modelRepository: ModelRepository;
    protected brandRepository: BrandRepository;
    protected countryRepository: CountryRepository;

    constructor(modelRepository: ModelRepository, brandRepository: BrandRepository, countryRepository: CountryRepository) {
        this.modelRepository = modelRepository;
        this.brandRepository = brandRepository;
        this.countryRepository = countryRepository;
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
        const brand: Brand = await this.brandRepository.GetAsync(model[0].IdBrand);
        const country: Country = await this.countryRepository.GetAsync(brand[0].IdCountry)

        return{ 
            Id: model[0].Id,
            BrandObj : {Id: brand[0].Id, CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName}, BrandName: brand.BrandName},
            ModelName: model[0].ModelName,
            SitsNumber: model[0].SitsNumber,
            Tare: model[0].Tare,
            GrossWeight: model[0].GrossWeight,
            Payload : model.Payload,
            FlightCrewNumber : model[0].FlightCrewNumber,
            FuelQuantity : model[0].FuelQuantity,
            ModelYear : model[0].ModelYear,
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
            models[0].map(async (model) => {
                const brand: Brand = await this.brandRepository.GetAsync(model.IdBrand);
                const country: Country = await this.countryRepository.GetAsync(brand[0].IdCountry)

                return{ 
                    Id: model.Id,
                    BrandObj : {Id: brand[0].Id, CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName}, BrandName: brand[0].BrandName},
                    ModelName: model.ModelName,
                    SitsNumber: model.SitsNumber,
                    Tare: model.Tare,
                    GrossWeight: model.GrossWeight,
                    Payload : model.Payload,
                    FlightCrewNumber : model.FlightCrewNumber,
                    FuelQuantity : model.FuelQuantity,
                    ModelYear : model.ModelYear,
                }
            })
        );

        return modelDTOs
    }
}
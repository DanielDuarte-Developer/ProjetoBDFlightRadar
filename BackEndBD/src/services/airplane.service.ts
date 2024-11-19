import { Airline } from "../model/airline.model";
import { Airplane } from "../model/airplane.model";
import { AirplaneDTO } from "../model/dto/airplane.model.dto";
import { Model } from "../model/model.model";
import { AirlineRepository } from "../repository/airline.repository";
import { AirplaneRepository } from "../repository/airplane.repository";
import { ModelRepository } from "../repository/model.repository";
import { IAirplaneService } from "./interfaces/iairplane.service";

export class AirplaneService implements IAirplaneService{
    protected airplaneRepository: AirplaneRepository;
    protected modelRepository: ModelRepository;
    protected airlineRepository: AirlineRepository;

    constructor(airplaneRepository: AirplaneRepository, modelRepository: ModelRepository, airlineRepository: AirlineRepository) {
        this.airplaneRepository = airplaneRepository;
        this.modelRepository = modelRepository;
        this.airlineRepository = airlineRepository;
    }

    async AddAsync(item: Airplane, userId: string) {
        await this.airplaneRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Airplane, userId: string) {
        await this.airplaneRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.airlineRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<AirplaneDTO> {
        const airplane: Airplane = await this.airplaneRepository.GetAsync(id);
        const model: Model = await this.modelRepository.GetAsync(airplane.IdModel);
        const airline: Airline = await this.airlineRepository.GetAsync(airplane.IdAirline);
        
        return {
            Id : airplane.Id,
            ModelObj : model,
            AirlineObj: airline
        }
    }

    async ListAsync(
        idAirplane: string = '', 
        idModel: string = '', 
        idArline: string = '', 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<AirplaneDTO[]> {
        const airplanes: Airplane[] = await this.airplaneRepository.ListAirplanes(idAirplane,idModel,idArline,sortField,sortAscending)
        
        const airplaneDTOs = await Promise.all(
            airplanes.map(async (airplane) => {
                const model: Model = await this.modelRepository.GetAsync(airplane.IdModel);
                const airline: Airline = await this.airlineRepository.GetAsync(airplane.IdAirline);
                return {
                    Id: airplane.Id,
                    ModelObj : model,
                    AirlineObj: airline
                };
            })
        );

        return airplaneDTOs
    }

}
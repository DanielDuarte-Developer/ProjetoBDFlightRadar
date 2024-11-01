import { Airplane } from "../model/airplane.model";
import { AirplaneRepository } from "../repository/airplane.repository";
import { IAirplaneService } from "./interfaces/iairplane.service";

export class AirplaneService implements IAirplaneService {
    protected airplaneRepository : AirplaneRepository
    
    constructor(airplaneRepository: AirplaneRepository){
        this.airplaneRepository = airplaneRepository;
    }

    AddAsync(airplane: Airplane, userId: string): Promise<Airplane> {
        //TODO
        throw new Error("Method not implemented.");
    }
    UpdateAsync(airplane: Airplane, id: string, userId: string): Promise<Airplane> {
        //TODO
        throw new Error("Method not implemented.");
    }
    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }
    GetByIdAsync(id: string): Promise<Airplane> {
        //TODO
        throw new Error("Method not implemented.");
    }
    ListAirplanes(idAirplane: string, idModel: string, idArline: string, status: string, sortField: string, sortAscending: boolean): Promise<Airplane[]> {
        //TODO
        throw new Error("Method not implemented.");
    }

}
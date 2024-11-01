import { Airline } from "../model/airline.model";
import { AirlineRepository } from "../repository/airline.repository";
import { IArlineService } from "./interfaces/Iairline.service";

export class ArlineService implements IArlineService{
    protected airlineRepository : AirlineRepository
    
    constructor(airlineRepository: AirlineRepository){
        this.airlineRepository  = airlineRepository ;
    }

    AddAsync(airline: Airline, userId: string): Promise<Airline> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(airline: Airline, id: string, userId: string): Promise<Airline> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Airline> {
        //TODO
        throw new Error("Method not implemented.");
    }

    ListAsync(idAirline: string, idCountry: string, arlineName: string, arlineCode: string, status: string, sortField: string, sortAscending: boolean): Promise<Airline[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}
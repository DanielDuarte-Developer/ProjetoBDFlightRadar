import { Airport } from "../model/airport.model";
import { AirportAirplaneFlight } from "../model/airportairplaneflight.model";
import { AirportRepository } from "../repository/airport.repository";
import { IAirportService } from "./interfaces/iairport.service";

export class AirportService implements IAirportService{
    protected airportRepository : AirportRepository
    
    constructor(airportRepository: AirportRepository){
        this.airportRepository = airportRepository;
    }

    AddAsync(airport: Airport, userId: string): Promise<Airport> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(airport: Airport, id: string, userId: string): Promise<Airport> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Airport> {
        //TODO
        throw new Error("Method not implemented.");
    }

    ListAirports(idAirport: string, idCountry: string, airportName: string, airportCode: string, airportLocationName: string, status: string, sortField: string, sortAscending: boolean): Promise<Airport[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}
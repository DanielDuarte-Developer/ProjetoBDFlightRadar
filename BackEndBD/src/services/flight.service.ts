import { Flight } from "../model/flight.model";
import { FlightRepository } from "../repository/flight.repository";
import { DatabaseService } from "./DataBase/DatabaseService";
import { IFlightService } from "./interfaces/iflight.service";

export class FlightService implements IFlightService{
    protected flightRepository : FlightRepository
    protected dbService: DatabaseService

    constructor(flightRepository: FlightRepository, dbService: DatabaseService){
        this.flightRepository = flightRepository;
        this.dbService = dbService;
    }

    AddAsync(flight: Flight, userId: string): Promise<Flight> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(flight: Flight, id: string, userId: string): Promise<Flight> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Flight> {
        //TODO
        throw new Error("Method not implemented.");
    }
    
    ListFlights(idFlight: string, flightCode: string, stateFlight: string, passengers: number, status: string, sortField: string, sortAscending: boolean): Promise<Flight[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}
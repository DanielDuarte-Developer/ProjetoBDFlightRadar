import { AirportAirplaneFlight } from "../model/airportairplaneflight.model";
import { AirportAirplaneFlightRepository } from "../repository/airport.airplane.flight.repository";
import { IAirportAirplaneFlightService } from "./interfaces/iairport.airplane.flight.service";

export class AirportAirplaneFlightService implements IAirportAirplaneFlightService{
    protected airportAirplaneFlightRepository : AirportAirplaneFlightRepository
    
    constructor(airportAirplaneFlightRepository: AirportAirplaneFlightRepository){
        this.airportAirplaneFlightRepository = airportAirplaneFlightRepository;
    }

    AddAsync(airportAirplaneFlight: AirportAirplaneFlight, userId: string): Promise<AirportAirplaneFlight> {
        //TODO
        throw new Error("Method not implemented.");
    }
    UpdateAsync(airportAirplaneFlight: AirportAirplaneFlight, id: string, userId: string): Promise<AirportAirplaneFlight> {
        //TODO
        throw new Error("Method not implemented.");
    }
    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }
    GetByIdAsync(id: string): Promise<AirportAirplaneFlight> {
        //TODO
        throw new Error("Method not implemented.");
    }
    ListAirportAirplaneFlights(idAirport: string, idFlight: string, idPlane: string, departure: string, arrival: string, status: string, sortField: string, sortAscending: boolean) {
        //TODO
        throw new Error("Method not implemented.");
    }
    
}
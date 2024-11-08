import { AirportAirplaneFlightRepository } from "../repository/airport.airplane.flight.repository";

export class AirportAirplaneFlightController {
    private airportAirplaneFlightRepository: AirportAirplaneFlightRepository;

    constructor(airportAirplaneFlightRepository: AirportAirplaneFlightRepository) {
        this.airportAirplaneFlightRepository = airportAirplaneFlightRepository;
    }
   
}
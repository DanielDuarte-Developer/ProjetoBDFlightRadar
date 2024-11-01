import { Handler, Request, Response } from "express";
import { FlightRepository } from "../repository/flight.repository";
import { AirportAirplaneFlightRepository } from "../repository/airport.airplane.flight.repository";

export class FlightController {
    private flightRepository: FlightRepository;
    private airportAirplaneFlightRepository: AirportAirplaneFlightRepository

    constructor(flightRepository: FlightRepository, airportAirplaneFlightRepository: AirportAirplaneFlightRepository) {
        this.flightRepository = flightRepository;
        this.airportAirplaneFlightRepository = airportAirplaneFlightRepository;
    }
    
    getFlights(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteFlight(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
    
}
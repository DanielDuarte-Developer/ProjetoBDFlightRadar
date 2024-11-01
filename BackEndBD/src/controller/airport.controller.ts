import { Handler, Request, Response } from "express";
import { AirportRepository } from "../repository/airport.repository";

export class AirportController {
    private airportRepository: AirportRepository;

    constructor(airportRepository: AirportRepository) {
        this.airportRepository = airportRepository;
    }

    getAirports(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteAirport(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
}
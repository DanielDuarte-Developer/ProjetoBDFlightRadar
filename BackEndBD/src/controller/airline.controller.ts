import { Handler, Request, Response } from "express";
import { AirlineRepository } from "../repository/airline.repository";
import { Airline } from "../model/airline.model";

export class AirlineController {
    private airlineRepository: AirlineRepository;

    constructor(airlineRepository: AirlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    getAirlines(): Handler {
        return async (req: Request, res: Response) => {
            const filters = req.body
            
            
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteAirline(): Handler {
        return async (req: Request, res: Response) => {
            const data = req.body
            //TODO
            //res.status(201).json()
        }
    }
}
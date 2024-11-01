import { Handler, Request, Response } from "express";
import {AirplaneRepository} from "../repository/airplane.repository"

export class AirplaneController {
    private airplaneRepository: AirplaneRepository;

    constructor(airplaneRepository: AirplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    getAirplanes(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteAirplane(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
}
import { Handler, Request, Response } from "express";
import { CountryRepository } from "../repository/country.repository";

export class CountryController {
    private countryRepository: CountryRepository;

    constructor(countryRepository: CountryRepository) {
        this.countryRepository = countryRepository;
    }

    getCountries(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteCountry(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
}
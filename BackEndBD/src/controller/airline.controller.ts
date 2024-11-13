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
            const filters: Airline = req.body
            try {
                // Get the airlines by the filters given
                const airlines = await this.airlineRepository.ListArlines(
                    filters.Id,
                    filters.IdCountry,
                    filters.AirlineName,
                    filters.AirlineCode)

                // If there is no error, returns a success response
                res.status(200).json(airlines)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airline data.'
                });
            }
        }
    }

    getAirline(): Handler {
        return async (req: Request, res: Response) => {
            const id_airline = req.body
            try {
                // Get airline by id
                const airline = await this.airlineRepository.GetAsync(id_airline)

                // If there is no error, returns a success response
                res.status(200).json(airline)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airline data.'
                });
            }
        }
    }

    addAirline(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airline = req.body
            try {
                // Adds a new airline
                await this.airlineRepository.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Airline added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new airline.'
                });
            }
        }
    }

    updateAirline(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airline = req.body

            try {
                // Updates the Airline
                await this.airlineRepository.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airline updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the airline.'
                });
            }
        }
    }
    deleteAirline(): Handler {
        return async (req: Request, res: Response) => {
            const id_airline = req.body
            try {
                // Deletes the airline
                await this.airlineRepository.DeleteAsync(id_airline, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airline deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the airline.'
                });
            }
        }
    }
}
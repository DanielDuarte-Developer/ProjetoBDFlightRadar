import { Handler, Request, Response } from "express";
import { AirportRepository } from "../repository/airport.repository";
import { Airport } from "../model/airport.model";

export class AirportController {
    private airportRepository: AirportRepository;

    constructor(airportRepository: AirportRepository) {
        this.airportRepository = airportRepository;
    }

    getAirports(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Airport = req.body
            try {
                // Get the airports by the filters given
                const airports = await this.airportRepository.ListAirports(
                    filters.Id,
                    filters.IdCountry,
                    filters.AirportName,
                    filters.AirportCode,
                    filters.LocationName)

                // If there is no error, returns a success response
                res.status(200).json(airports)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airport data.'
                });
            }
        }
    }

    getAirport(): Handler {
        return async (req: Request, res: Response) => {
            const id_airport = req.body
            try {
                // Get airport by id
                const airport = await this.airportRepository.GetAsync(id_airport)

                // If there is no error, returns a success response
                res.status(200).json(airport)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airport data.'
                });
            }
        }
    }

    addAirport(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airport = req.body
            try {
                // Adds a new airport
                await this.airportRepository.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Airport added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new airport.'
                });
            }
        }
    }

    updateAirport(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airport = req.body

            try {
                // Updates the airport
                await this.airportRepository.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airport updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the airport.'
                });
            }
        }
    }
    deleteAirport(): Handler {
        return async (req: Request, res: Response) => {
            const id_airport = req.body
            try {
                // Deletes the airport
                await this.airportRepository.DeleteAsync(id_airport, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airport deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the airport.'
                });
            }
        }
    }
}
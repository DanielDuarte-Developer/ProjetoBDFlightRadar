import { Handler, Request, Response } from "express";
import { Airport } from "../model/airport.model";
import { AirportService } from "../services/airport.service";

export class AirportController {
    private airportService: AirportService;

    constructor(airportService: AirportService) {
        this.airportService = airportService;
    }

    getAirports(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id: req.query.Id as string,
                IdCountry: req.query.IdCountry as string,
                AirportName: req.query.AirportName as string,
                AirportCode: req.query.AirportCode as string,
                LocationName: req.query.LocationName as string
            }
            try {
                // Get the airports by the filters given
                const airports = await this.airportService.ListAsync(
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
            const id_airport = req.params.airportId as string
            try {
                // Get airport by id
                const airport = await this.airportService.GetByIdAsync(id_airport)

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
                await this.airportService.AddAsync(object, 'daniel')

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
                await this.airportService.UpdateAsync(object, 'daniel')

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
                await this.airportService.DeleteAsync(id_airport, 'daniel')

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
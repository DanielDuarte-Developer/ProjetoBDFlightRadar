import { Handler, Request, Response } from "express";
import { Airline } from "../model/airline.model";
import { AirlineService } from "../services/airline.service";

export class AirlineController {
    private airlineService: AirlineService;

    constructor(airlineService: AirlineService) {
        this.airlineService = airlineService;
    }

    getAirlines(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id: req.query.Id as string,
                IdCountry: req.query.IdCountry as string,
                AirlineName: req.query.AirlineName as string,
                AirlineCode: req.query.AirlineCode as string
            }
            
            try {
                // Get the airlines by the filters given
                const airlines = await this.airlineService.ListAsync(
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
            const IdAirline = req.params.airlineId as string
            try {
                // Get airline by id
                const airline = await this.airlineService.GetByIdAsync(IdAirline)

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
                await this.airlineService.AddAsync(object, 'daniel')

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
                await this.airlineService.UpdateAsync(object, 'daniel')

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
            const id_airline = req.params.airlineId as string
            
            try {
                // Deletes the airline
                await this.airlineService.DeleteAsync(id_airline, 'daniel')

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
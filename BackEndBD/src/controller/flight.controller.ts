import { Handler, Request, Response } from "express";
import { Flight } from "../model/flight.model";
import { FlightService } from "../services/flight.service";

export class FlightController {
    private flightService: FlightService;

    constructor(flightService: FlightService) {
        this.flightService = flightService;
    }
    
    getFlights(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id : req.query.Id as string,
                IdObservation: req.query.IdObservation as string,
                IdAirplane : req.query.IdAirplane as string,
                FlightCode : req.query.FlightCode as string,
                Passengers : req.query.Passengers as string
            }
            try {
                // Get the flights by the filters given
                const flights = await this.flightService.ListAsync(
                    filters.Id,
                    filters.IdObservation,
                    filters.IdAirplane,
                    filters.FlightCode,
                    parseInt(filters.Passengers))

                // If there is no error, returns a success response
                res.status(200).json(flights)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve fligth data.'
                });
            }
        }
    }

    getFlight(): Handler {
        return async (req: Request, res: Response) => {
            const id_flight = req.params.flightId as string
            try {
                // Get flight by id
                const flight = await this.flightService.GetByIdAsync(id_flight)

                // If there is no error, returns a success response
                res.status(200).json(flight)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve flight data.'
                });
            }
        }
    }

    addFlight(): Handler {
        return async (req: Request, res: Response) => {
            const object: Flight = req.body
            try {
                // Adds a new flight
                await this.flightService.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Flight added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new flight.'
                });
            }
        }
    }

    updateFlight(): Handler {
        return async (req: Request, res: Response) => {
            const object: Flight = req.body

            try {
                // Updates the flight
                await this.flightService.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Flight updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the flight.'
                });
            }
        }
    }
    deleteFlight(): Handler {
        return async (req: Request, res: Response) => {
            const id_flight = req.body
            try {
                // Deletes the flight
                await this.flightService.DeleteAsync(id_flight, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Flight deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the flight.'
                });
            }
        }
    }
}
import { Handler, Request, Response } from "express";
import { FlightRepository } from "../repository/flight.repository";
import { Flight } from "../model/flight.model";

export class FlightController {
    private flightRepository: FlightRepository;

    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository;
    }
    
    getFlights(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Flight = req.body
            try {
                // Get the flights by the filters given
                const flights = await this.flightRepository.ListFlights(
                    filters.Id,
                    filters.IdObservation,
                    filters.IdAirplane,
                    filters.FlightCode,
                    filters.Passengers)

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
            const id_flight = req.body
            try {
                // Get flight by id
                const flight = await this.flightRepository.GetAsync(id_flight)

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
                await this.flightRepository.AddAsync(object, 'daniel')

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
                await this.flightRepository.UpdateAsync(object, 'daniel')

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
                await this.flightRepository.DeleteAsync(id_flight, 'daniel')

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
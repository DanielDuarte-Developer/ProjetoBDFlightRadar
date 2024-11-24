import { Handler, Request, Response } from "express";
import { AirportFlightRepository } from "../repository/airport.flight.repository";
import { AirportFlight } from "../model/airportflight.model";
import { AirportFlightService } from "../services/airport.flight.service";

export class AirportFlightController {
    private airportFlightService: AirportFlightService;

    constructor(airportFlightService: AirportFlightService) {
        this.airportFlightService = airportFlightService;
    }

    getAirportFlights(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id : req.query.Id as string,
                IdFlight: req.query.IdFlight as string,
                TimeMarker: req.query.TimeMarker as string
            }
            try {
                // Get the airportFlights by the filters given
                const airportFlights = await this.airportFlightService.ListAsync(
                    filters.Id,
                    filters.IdFlight,
                    filters.TimeMarker)

                // If there is no error, returns a success response
                res.status(200).json(airportFlights)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airport data.'
                });
            }
        }
    }

    getAirportFlight(): Handler {
        return async (req: Request, res: Response) => {
            const id_airportFlights = req.params.airportFlightId as string
            try {
                // Get airportFlight by id
                const airportFlight = await this.airportFlightService.GetByIdAsync(id_airportFlights)

                // If there is no error, returns a success response
                res.status(200).json(airportFlight)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airportFlights data.'
                });
            }
        }
    }

    addAirportFlight(): Handler {
        return async (req: Request, res: Response) => {
            const object: AirportFlight = req.body
            try {
                // Adds a new airportFlight
                await this.airportFlightService.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Airport_Flights added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new airportFlights.'
                });
            }
        }
    }

    updateAirportFlight(): Handler {
        return async (req: Request, res: Response) => {
            const object: AirportFlight = req.body

            try {
                // Updates the airportFlights
                await this.airportFlightService.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'AirportFlights updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the airportFlights.'
                });
            }
        }
    }


    getValuesConstructPlane(): Handler {
        return async (req: Request, res: Response) => {
            const flighId = req.params.flightId as string
            
            try {
                // Get the airportFlights by the filters given
                const airportFlights = await this.airportFlightService.GetValuesConstructPlane(flighId)
                // If there is no error, returns a success response
                res.status(200).json(airportFlights)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airport data.'
                });
            }
        }
    }

    getFlightCardInfo(): Handler {
        return async (req: Request, res: Response) => {
            const id_flight = req.params.flightId as string
            try {
                // Get airportFlight by id
                const airportFlight = await this.airportFlightService.GetFlightCardInfo(id_flight)

                // If there is no error, returns a success response
                res.status(200).json(airportFlight)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airportFlights data.'
                });
            }
        }
    }
}
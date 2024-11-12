import { Handler, Request, Response } from "express";
import { AirportFlightRepository } from "../repository/airport.flight.repository";
import { AirportFlight } from "../model/airportflight.model";

export class AirportFlightController {
    private airportFlightRepository: AirportFlightRepository;

    constructor(airportFlightRepository: AirportFlightRepository) {
        this.airportFlightRepository = airportFlightRepository;
    }

    getAirportFlights(): Handler {
        return async (req: Request, res: Response) => {
            const filters: AirportFlight = req.body
            try {
                // Get the airportFlights by the filters given
                const airportFlights = this.airportFlightRepository.ListAirportFlights(
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

    // TODO See the get by id because we have a compound key
    // * See in the sp and model too
    getAirportFlight(): Handler {
        return async (req: Request, res: Response) => {
            const id_airportFlights = req.body
            try {
                // Get airportFlight by id
                const airportFlights = this.airportFlightRepository.GetAsync(id_airportFlights)

                // If there is no error, returns a success response
                res.status(200).json(airportFlights)
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
                await this.airportFlightRepository.AddAsync(object, 'daniel')

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

    /*
    TODO Analise the method if will be necessary
    updateAirport(): Handler {
        return async (req: Request, res: Response) => {
            const object: AirportFlight = req.body

            try {
                // Updates the airportFlights
                await this.airportFlightRepository.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'airportFlights updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the airportFlights.'
                });
            }
        }
    }
    */
}
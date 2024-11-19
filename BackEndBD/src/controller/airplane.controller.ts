import { Handler, Request, Response } from "express";
import { Airplane } from "../model/airplane.model";
import { AirplaneService } from "../services/airplane.service";

export class AirplaneController {
    private airplaneService: AirplaneService;

    constructor(airplaneService: AirplaneService) {
        this.airplaneService = airplaneService;
    }

    getAirplanes(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Airplane = req.body
            try {
                // Get the airplanes by the filters given
                const airplanes = await this.airplaneService.ListAsync(
                    filters.Id,
                    filters.IdModel,
                    filters.IdAirline)

                // If there is no error, returns a success response
                res.status(200).json(airplanes)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airplane data.'
                });
            }
        }
    }

    getAirplane(): Handler {
        return async (req: Request, res: Response) => {
            const id_airplane = req.body
            try {
                // Get airplane by id
                const airplane = await this.airplaneService.GetByIdAsync(id_airplane)

                // If there is no error, returns a success response
                res.status(200).json(airplane)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve airplane data.'
                });
            }
        }
    }

    addAirplane(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airplane = req.body
            try {
                // Adds a new airplane
                await this.airplaneService.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Airplane added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new airplane.'
                });
            }
        }
    }

    updateAirplane(): Handler {
        return async (req: Request, res: Response) => {
            const object: Airplane = req.body

            try {
                // Updates the airplane
                await this.airplaneService.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airplane updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the airplane.'
                });
            }
        }
    }
    deleteAirplane(): Handler {
        return async (req: Request, res: Response) => {
            const id_airplane = req.body
            try {
                // Deletes the airplane
                await this.airplaneService.DeleteAsync(id_airplane, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Airplane deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the airplane.'
                });
            }
        }
    }
}
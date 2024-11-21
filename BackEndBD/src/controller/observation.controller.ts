import { Handler, Request, Response } from "express";
import { Observation } from "../model/observation.model";
import { ObservationService } from "../services/observation.service";

export class ObservationController {
    private observationService: ObservationService;

    constructor(observationRepository: ObservationService) {
        this.observationService = observationRepository;
    }

    getObservations(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id : req.query.Id as string,
                ObservationText: req.query.ObservationText as string
            }
            try {
                // Get the models by the filters given
                const observations = await this.observationService.ListAsync(
                    filters.Id,
                    filters.ObservationText)

                // If there is no error, returns a success response
                res.status(200).json(observations)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve observation data.'
                });
            }
        }
    }

    getObservation(): Handler {
        return async (req: Request, res: Response) => {
            const id_observation = req.params.observationId as string
            try {
                // Get observation by id
                const observation = await this.observationService.GetByIdAsync(id_observation)

                // If there is no error, returns a success response
                res.status(200).json(observation)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve observation data.'
                });
            }
        }
    }

    addObservation(): Handler {
        return async (req: Request, res: Response) => {
            const object: Observation = req.body
            try {
                // Adds a new observation
                await this.observationService.AddAsync(object, 'jonas')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Observation added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new observation.'
                });
            }
        }
    }

    updateObservation(): Handler {
        return async (req: Request, res: Response) => {
            const object: Observation = req.body

            try {
                // Updates the observation
                await this.observationService.UpdateAsync(object, 'jonas')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Observation updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the observation.'
                });
            }
        }
    }
    deleteObservation(): Handler {
        return async (req: Request, res: Response) => {
            const id_observation = req.body
            try {
                // Deletes the observation
                await this.observationService.DeleteAsync(id_observation, 'jonas')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'observation deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the observation.'
                });
            }
        }
    }
}